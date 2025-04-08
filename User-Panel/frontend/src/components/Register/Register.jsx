import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Mobile_Number: "",
    Email: "",
    Password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/v1/user/register", formData);
      toast.success("Thank you for registration", { position: "top-right" });
      setFormData({
        First_Name: "",
        Last_Name: "",
        Email: "",
        Password: "",
        Mobile_Number: ""
      })
    } catch (error) {
      toast.error("Enter valid values", { position: "top-right" });
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
                  autoComplete="true"
                  type="text"
                  className="form-control"
                  id="exampleInputFirstName"
                  onChange={(e) => setFormData({...formData, First_Name: e.target.value})}
                  value={formData.First_Name}
                />
                <div id="emailHelp" className="form-text"></div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputLastName" className="form-label">
                  Last Name
                </label>
                <input
                  autoComplete="true"
                  type="text"
                  className="form-control"
                  id="exampleInputLastName"
                  onChange={(e) => setFormData({...formData, Last_Name: e.target.value})}
                  value={formData.Last_Name}
                />
                <div id="emailHelp" className="form-text"></div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleInputMobileNumber"
                  className="form-label"
                >
                  Mobile Number
                </label>
                <input
                  autoComplete="true"
                  type="number"
                  className="form-control"
                  id="exampleInputMobileNumber"
                  onChange={(e)=>setFormData({...formData, Mobile_Number: e.target.value})}
                  value={formData.Mobile_Number}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">
                  Email address
                </label>
                <input
                  autoComplete="true"
                  type="email"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  onChange={(e)=>setFormData({...formData, Email: e.target.value})}
                  value={formData.Email}
                  required
                />
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword" className="form-label">
                  Password
                </label>
                <input
                  autoComplete="true"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword"
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

export default Register;
