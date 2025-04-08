import React, { useState } from "react";
import "../../Register/Register.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AddBrand() {
  const [brand_name, setBrandName] = useState("");
  const [brand_image, setBrandImage] = useState(null);

  async function handleSubmit(e) {
    const token = localStorage.getItem("Estate");
    const formData = new FormData();
    formData.append("brand_name", brand_name);
    formData.append("brand_image", brand_image);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/brand/addBrand",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      console.log("Here");

      toast.success(response.data.msg);
    } catch (error) {
      toast.error("Enter valid values");
      console.log(error);
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="customRegisterMainDiv">
        <form onSubmit={handleSubmit}>
          <div className="customRegisterInnerDiv">
            <div className="head">Add Brand</div>
            <div className="inputFielsDiv">
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Brand Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  onChange={(e) => setBrandName(e.target.value)}
                  value={brand_name}
                  required
                />

                <label htmlFor="exampleInputImage" className="form-label mt-2">
                  Brand Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputImage"
                  onChange={(e) => setBrandImage(e.target.files[0])}
                  required
                />

                <button
                  style={{ width: "fit-content" }}
                  type="submit"
                  className="mt-2 btn btn-primary mt-1 customSubmitBtn"
                >
                  Add your brand
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBrand;
