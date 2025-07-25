import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email: form.email,
        password: form.password
      });
      setSuccess(res.data.message);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                     <label className="form-label">Password</label>
                     <div className="input-group">
                       <input
                         name="password"
                         type={showPassword ? "text" : "password"}
                         className="form-control"
                         onChange={handleChange}
                         required
                       />
                       <span
                         className="input-group-text"
                         onClick={togglePassword}
                         style={{ cursor: "pointer" ,background: "transparent", border: "none", border:""}}
                       >
                         {showPassword ? <FaEyeSlash /> : <FaEye />}
                       </span>
                     </div>
                   </div>
               <div className="mb-3 position-relative">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <input
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      <span
                        className="input-group-text"
                        onClick={togglePassword}
                        style={{ cursor: "pointer" ,background: "transparent", border: "none", border:""}}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
