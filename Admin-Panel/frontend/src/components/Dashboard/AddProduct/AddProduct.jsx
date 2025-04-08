import axios from "axios";
import "../../Register/Register.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function AddProduct() {
  const [propertyName, setPropertyName] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyLookingFor, setPropertyLookingFor] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [propertyBedroom, setPropertyBedroom] = useState("")
  const [propertyBathroom, setPropertyBathroom] = useState("")
  const [propertyBudget, setPropertyBudget] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("Estate");

    if (!token) {
      toast.warning("Please login to add your product!");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", propertyName);
    formData.append("product_image", propertyImage);
    formData.append("product_address", propertyAddress);
    formData.append("product_lookingFor", propertyLookingFor);
    formData.append("product_location", propertyLocation);
    formData.append("product_propertySize", propertySize);
    formData.append("product_bathroom", propertyBathroom)
    formData.append("product_bedroom", propertyBedroom)
    formData.append("product_budget", propertyBudget);
    formData.append("brand_id", selectedBrand);
    formData.append("category_id", selectedCategory);


    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/property/addProperty",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchBrands(){
    try{
      const response = await axios.get('http://localhost:7000/api/v1/brand/getAllBrands');
      console.log(response);
      if(response.data && response.data.result){
        setBrands(response.data.result);
      }else{
        console.error("Unexpected API response structure:", response);
      }
    }catch(error){
      console.log(error);
    }
  }

  async function fetchCategories(){
    try{
      const response = await axios.get('http://localhost:7000/api/v1/category/allCategories')
      setCategories(response.data.result)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchBrands();
    fetchCategories();
  },[])

  return (
    <>
      <ToastContainer />
      <div className="customRegisterMainDiv">
        <div className="customRegisterInnerDiv">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="brands" value={brands} />
            <input type="hidden" name="categories" value={categories} />
            <div className="head">Add Your Property</div>

            <div className="inputFielsDiv">
              <div className="mb-3">
                <label className="form-label">Property Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPropertyName(e.target.value)}
                  value={propertyName}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPropertyImage(e.target.files[0])}
                />
              </div>


              <div className="mb-3">
                <label className="form-label" htmlFor="brands">
                  Brands
                </label>
                <select
                  name="brands"
                  id="brands"
                  className="form-control"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="Buy">Select brand</option>
                  {brands.map((brand)=>(
                    <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                  ))}
                  
                </select>
              </div>


              <div className="mb-3">
                <label className="form-label" htmlFor="brands">
                  Categories
                </label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="Buy">Select category</option>
                  {categories.map((cat)=>(
                    <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                  ))}
                  
                </select>
              </div>


              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  value={propertyAddress}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="lookingFor">
                  Looking For
                </label>
                <select
                  name="lookingFor"
                  id="lookingFor"
                  className="form-control"
                  onChange={(e) => setPropertyLookingFor(e.target.value)}
                  value={propertyLookingFor}
                >
                  <option value="select">Select</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                  <option value="Sell">Sell</option>
                  <option value="PG (Paying Guest)">PG (Paying Guest)</option>
                  <option value="Commercial Space">Commercial Space</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Resort">Resort</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="location">
                  Location
                </label>
                <select
                  name="location"
                  id="location"
                  className="form-control"
                  onChange={(e) => setPropertyLocation(e.target.value)}
                  value={propertyLocation}
                >
                  <option value="select">Select</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Property Size in (m sq)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPropertySize(e.target.value)}
                  value={propertySize}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Number of bedroom</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setPropertyBedroom(e.target.value)}
                  value={propertyBedroom}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Number of bathroom</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPropertyBathroom(e.target.value)}
                  value={propertyBathroom}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Property budget</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPropertyBudget(e.target.value)}
                  value={propertyBudget}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="customSubmitBtn">
                  Add Property
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
