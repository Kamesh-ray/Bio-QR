// Enhanced BioForm.jsx using Formik, Yup and QR save/download options

import React, { useState } from "react";
import axios from "axios";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import FileSaver from "file-saver";
import "../style/BioForm.css";
import Footer from "./Footer";

const validationSchema = Yup.object({
  name: Yup.string().matches(/^[a-zA-Z ]+$/, "Only letters allowed").required("Required"),
  age: Yup.number().min(18).max(99).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().matches(/^[6-9]\d{9}$/, "Invalid phone").required("Required"),
  qualification: Yup.string().required("Required"),
  education: Yup.array().of(Yup.string().required("Required"))
});

function BioForm() {
  const [qrCode, setQrCode] = useState("");
  const [submittedBio, setSubmittedBio] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      phone: "",
      role: "",
      address: "",
      qualification: "",
      skills: "",
      tools: "",
      description: "",
      others: "",
      projects: [""],
      experience: [""],
      education: [""],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:5000/api/generate-qrcode", values);
        setQrCode(res.data.qrCode);
        setSubmittedBio(res.data.bio);
      } catch (error) {
        console.error("QR generation failed:", error);
      }
    },
  });


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bio Data QR Generator</h1>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input name="name" className="form-control" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input name="email" className="form-control" type="email" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input name="phone" className="form-control" type="tel" {...formik.getFieldProps("phone")} />
              {formik.touched.phone && formik.errors.phone && <div className="text-danger">{formik.errors.phone}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Age</label>
              <input name="age" className="form-control" type="number" {...formik.getFieldProps("age")} />
              {formik.touched.age && formik.errors.age && <div className="text-danger">{formik.errors.age}</div>}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <input name="role" className="form-control" {...formik.getFieldProps("role")} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Qualification</label>
              <input name="qualification" className="form-control" {...formik.getFieldProps("qualification")} />
              {formik.touched.qualification && formik.errors.qualification && <div className="text-danger">{formik.errors.qualification}</div>}
            </div>
          </div>

          {/* Row: Address and Skills side-by-side */}
<div className="row mb-3">
  <div className="col-md-6">
    <label className="form-label">Address</label>
    <textarea
      name="address"
      className="form-control"
      rows="2"
      {...formik.getFieldProps("address")}
    />
    {formik.touched.address && formik.errors.address && (
      <div className="text-danger">{formik.errors.address}</div>
    )}
  </div>
  <div className="col-md-6">
    <label className="form-label">Skills</label>
    <textarea
      name="skills"
      className="form-control"
      rows="2"
      {...formik.getFieldProps("skills")}
    />
    {formik.touched.skills && formik.errors.skills && (
      <div className="text-danger">{formik.errors.skills}</div>
    )}
  </div>
</div>

{/* Row: Tools and Description side-by-side */}
<div className="row mb-3">
  <div className="col-md-6">
    <label className="form-label">Tools</label>
    <textarea
      name="tools"
      className="form-control"
      rows="2"
      {...formik.getFieldProps("tools")}
    />
    {formik.touched.tools && formik.errors.tools && (
      <div className="text-danger">{formik.errors.tools}</div>
    )}
  </div>
  <div className="col-md-6">
    <label className="form-label">Description</label>
    <textarea
      name="description"
      className="form-control"
      rows="2"
      {...formik.getFieldProps("description")}
    />
    {formik.touched.description && formik.errors.description && (
      <div className="text-danger">{formik.errors.description}</div>
    )}
  </div>
</div>

{/* Full-width: Others */}
<div className="mb-3">
  <label className="form-label">Others</label>
  <textarea
    name="others"
    className="form-control"
    rows="2"
    {...formik.getFieldProps("others")}
  />
  {formik.touched.others && formik.errors.others && (
    <div className="text-danger">{formik.errors.others}</div>
  )}
</div>


          {["projects", "experience", "education"].map((section) => (
            <FieldArray name={section} key={section}>
              {({ push, remove }) => (
                <div className="mb-4">
                  <label className="form-label text-capitalize">{section}</label>
                  {formik.values[section].map((item, index) => (
                    <div className="input-group mb-2" key={index}>
                      <input
                        className="form-control"
                        value={item}
                        onChange={(e) => formik.setFieldValue(`${section}[${index}]`, e.target.value)}
                      />
                      {formik.values[section].length > 1 && (
                        <button type="button" className="btn btn-outline-danger" onClick={() => remove(index)}>
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => push("")}>+ Add {section}</button>
                </div>
              )}
            </FieldArray>
          ))}

          <button type="submit" className="btn btn-success">Generate QR</button>
        </form>
      </FormikProvider>

      {qrCode && (
        <div className="mt-4 text-center">
          <h4>QR Code:</h4>
          <img src={qrCode} alt="QR Code" className="img-fluid" />
          <div className="mt-2">
            <div className="d-flex justify-content-center gap-2">
  <a href={qrCode} download="bio-qr.png" className="btn btn-outline-primary">
    Download QR
  </a>
  <button
    type="button"
    className="btn btn-outline-info"
    onClick={() => {
      navigator.clipboard.writeText(qrCode);
      alert("QR code link copied to clipboard!");
    }}
  >
    📋 Copy QR Link
  </button>
</div>

          </div>

        </div>
      )}
      {submittedBio && (
        <div className="mt-4">
          <h4>Submitted Bio Data:</h4>
          <pre>{JSON.stringify(submittedBio, null, 2)}</pre>
        </div>
      )}

      <Footer/>
    </div>
  );
}

export default BioForm;
