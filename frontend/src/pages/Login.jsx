import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await axios.post('https://bioqr-backend-api.onrender.com/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/bio-form');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
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
          style={{ cursor: "pointer" ,background: "transparent", border: "none"}}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup">Sign up here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
