import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
function DeleteBrand({ show, brand, handleClose, handleBrandDelete }) {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("Estate");
  const handleDelete = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:7000/api/v1/brand/deleteBrand/${brand.brand_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleBrandDelete(brand.brand_id);
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error);
    } finally{
        setLoading(false)
    }
  };
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this brand? This action cannot be
            undone.
          </p>
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
export default DeleteBrand;