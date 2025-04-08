import React, { useState } from "react";
import "../Register/Register.css";
import authService from "../../service/auth.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("here");
      await authService.login(formData.email, formData.password);
      toast.success("Login successful", { position: "top-right" });
      setFormData({
        email: "",
        password: "",
      });
      
      setTimeout(()=>{
        navigate('/');
      }, 2000)
      console.log("Here2");
    } catch (error) {
      console.log("Here3");
      toast.error(error.response?.data?.msg || "Invalid credentials", {
        position: "top-right",
      });
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="customRegisterMainDiv">
        <form onSubmit={handleSubmit}>
          <div className="customRegisterInnerDiv">
            <div className="head">Login</div>
            <div className="inputFielsDiv">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                  required
                />
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  autoComplete="true"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-1 customSubmitBtn"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
