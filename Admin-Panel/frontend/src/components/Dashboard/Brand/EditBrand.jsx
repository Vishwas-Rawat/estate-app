import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function EditBrand({ show, handleClose, brand, handleBrandUpdate }) {

  const [brandName, setBrandName] = useState(brand?.name || "");

  const [brandImage, setBrandImage] = useState(null);


  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("Estate");

  if (!token) {
    alert("User is not authenticated");
  }

  function handleImageChange(e) {
    const file = e.target.files[0]; 
    setBrandImage(file); 
  }

  async function handleSubmit(e) {
    e.preventDefault(); 
    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("brand_name", brandName); 
      if (brandImage) {
        formData.append("brand_image", brandImage); 
      }


      const response = await axios.put(
        `http://localhost:7000/api/v1/brand/editBrand?brand_id=${brand.brand_id}`,
        formData, // Send formData instead of JSON
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      console.log(response.data);
      handleBrandUpdate(response.data); 
      handleClose(); 
    } catch (error) {
      console.error("Error updating brand:", error);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
   
            <Form.Group controlId="formBrandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </Form.Group>


            <Form.Group controlId="formBrandImage">
              <Form.Label>Brand Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>

  
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditBrand;
