import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../Register/Register.css"; 

function AddCategory() {

  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  async function handleSubmit(e){
    e.preventDefault();
    
    try{
      const formData = new FormData();
      formData.append('category_name',categoryName);
      formData.append('category_image',categoryImage)
      
      const token = localStorage.getItem('Estate');
      
      const response = await axios.post('http://localhost:7000/api/v1/category/addCategory', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(response.data.success == true){
        toast.success(response.data.msg, {position: "top-right"});
      }
    }catch(error){
      console.log(error);
    }
    
  }
    return (
    <>
    <ToastContainer/>
    <div className="customRegisterMainDiv">
      <div className="customRegisterInnerDiv">
        <div className="head">Add Category</div>
        <div className="inputFielsDiv">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                onChange={(e)=>setCategoryName(e.target.value)}
                value={categoryName}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productImage" className="form-label">
                Category Image
              </label>
              <input type="file" className="form-control" id="productImage" onChange={(e)=>setCategoryImage(e.target.files[0])}/>
            </div>
            <button type="submit" className="btn customSubmitBtn mt-3">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddCategory;
