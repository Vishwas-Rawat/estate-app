import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

function DeleteProduct({ show, property, handleClose, handlePropertyDelete }) {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("Estate");

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Deleting property:", property);

    if (!property || !property.product_id) {
      console.error("Error: Property ID is undefined!");
      toast.error("Property ID is missing.");
      setLoading(false);
      return;
    }

    try {
      console.log("Deleting property with ID:", property.product_id);

      const response = await axios.delete(
        `http://localhost:7000/api/v1/property/deleteProperty?property_id=${property.product_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        handlePropertyDelete(property.product_id);
      } else {
        toast.error("Failed to delete property.");
      }
    } catch (error) {
      console.error("Delete request failed:", error);
      toast.error("Error deleting property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this property? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProduct;
