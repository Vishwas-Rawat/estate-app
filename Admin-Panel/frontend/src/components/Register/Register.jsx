import axios from "axios";
import React, { useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'

function Register() {
    const [formData, setFormData] = useState({
        First_Name: "",
        Last_Name: "",
        Mobile_Number: "",
        Email: "",
        Password: "",
    });
    const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("here");
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/register",
        formData
      );
      console.log("after here");
      toast.success(response.data.msg || 'Registration Successful', {position:"top-right"})
      console.log(response);
      setTimeout(()=>{
          navigate('/login')
      },2000)
    } catch (error) {
      console.log(error);
      toast.error('User already registered', {position:"top-right"})
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="customRegisterMainDiv">
        <form onSubmit={handleSubmit}>
          <div className="customRegisterInnerDiv">
            <div className="head">Register</div>
            <div className="inputFielsDiv">
              <div className="mb-3">
                <label htmlFor="exampleInputFirstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputFirstName"
                  onChange={(e) =>
                    setFormData({ ...formData, First_Name: e.target.value })
                  }
                  value={formData.First_Name}
                />
                <div id="emailHelp" className="form-text"></div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputLastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputLastName"
                  onChange={(e) =>
                    setFormData({ ...formData, Last_Name: e.target.value })
                  }
                  value={formData.Last_Name}
                />
                <div id="emailHelp" className="form-text"></div>
              </div>

              
              <div className="mb-3">
                <label htmlFor="exampleInputNumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputNumber"
                  onChange={(e) =>
                    setFormData({ ...formData, Mobile_Number: e.target.value })
                  }
                  value={formData.Mobile_Number}
                />
                <div id="emailHelp" className="form-text"></div>
              </div>

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
                    setFormData({ ...formData, Email: e.target.value })
                  }
                  value={formData.Email}
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
                    setFormData({ ...formData, Password: e.target.value })
                  }
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

export default Register;
