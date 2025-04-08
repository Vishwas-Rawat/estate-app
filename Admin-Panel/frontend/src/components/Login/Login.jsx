import React, { useState } from "react";
import "../Register/Register.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import auth from "../service/auth.jsx";

function Login() {
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
    })

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const token = await auth.login(formData.Email, formData.Password);
        if(token){
            toast.success("Login successful!", { position: "top-right" });
            setTimeout(() => {
                navigate('/');
                location.reload();
            }, 2000);
        }else {
            toast.error("User not registered or invalid credentials!", { position: "top-right" });
        }
    }

  return (
    <>
    <ToastContainer/>
      <div className="customRegisterMainDiv">
        <form onSubmit={handleSubmit}>
          <div className="customRegisterInnerDiv">
            <div className="head">Login</div>
            <div className="inputFielsDiv">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail2" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  onChange={(e)=>setFormData({...formData, Email: e.target.value})}
                  value={formData.Email}
                  required
                />
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">
                  Password
                </label>
                <input
                  autoComplete="true"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  onChange={(e)=>setFormData({...formData, Password: e.target.value})}
                  value={formData.Password}
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
