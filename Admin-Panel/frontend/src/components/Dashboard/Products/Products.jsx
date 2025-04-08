import axios from "axios";
import "./Products.css";
import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import DeleteProduct from "../Delete product/DeleteProduct";
import { ToastContainer, toast } from "react-toastify";

function Products() {
  const [allProperty, setAllProperty] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function propertyDetails() {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/v1/property/allProperty"
      );
      if (response.data.success) {
        setAllProperty(response.data.result);
      }
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  }

  useEffect(() => {
    propertyDetails();
  }, []);

  function closeModal() {
    setShowDeleteModal(false);
    setShowEditModal(false);
  }

  function updateProperty(updatedProperty) {
    setAllProperty((prevProperties) =>
      prevProperties.map((property) =>
        property.product_id === updatedProperty.product_id
          ? updatedProperty
          : property
      )
    );
    setShowEditModal(false);
  }

  function handlePropertyDelete(deletedPropertyId) {
    setAllProperty((prevProperties) =>
      prevProperties.filter((property) => property.product_id !== deletedPropertyId)
    );
    setShowDeleteModal(false);
    toast.success("Property deleted successfully");
  }

  return (
    <>
      <ToastContainer />
      <div className="mainCardDiv container-fluid d-flex flex-wrap">
        {allProperty.length > 0 ? (
          allProperty.map((prod) => (
            <div key={prod.product_id} className="card">
              <div className="imageDiv">
                <button className="cardBtn badge bg-success text-light">
                  {prod.product_lookingFor}
                </button>
                <div className="imageContainer">
                  <img src={`http://localhost:7000/uploads/${prod.product_image}`} alt="" />
                  <div className="bottomDiv">
                    <p>Bedroom {prod.product_bedroom}</p>
                    <p className="bottomBathroomPara">Bathroom {prod.product_bathroom}</p>
                    <p>Area {prod.product_propertySize} m2</p>
                  </div>
                </div>
              </div>
              <p>{prod.product_name}</p>
              <p>{prod.product_address}</p>
              <p><b>{prod.product_location}</b></p> 
              <div>
                <button className="bg-primary customEditBtn" onClick={() => {
                  setSelectedProperty(prod);
                  setShowEditModal(true);
                }}>
                  Edit
                </button>
                <button className="bg-danger customDeleteBtn" onClick={() => {
                  setSelectedProperty(prod);
                  setShowDeleteModal(true);
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center">No property found</h1>
        )}
      </div>

      {selectedProperty && (
        <>
          <EditProduct
            show={showEditModal}
            handleUpdate={updateProperty}
            closeModal={closeModal}
            property={selectedProperty}
          />
          <DeleteProduct
            show={showDeleteModal}
            property={selectedProperty}
            handleClose={closeModal}
            handlePropertyDelete={handlePropertyDelete}
          />
        </>
      )}
    </>
  );
}

export default Products;
