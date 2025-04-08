import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
function EditCategory({ category, handleCategoryUpdate, show, handleClose }) {
  const [categoryName, setCategoryName] = useState(
    category?.category_name || ""
  );
  const [categoryImage, setCategoryImage] = useState(
    category?.category_image || null
  );
  // const [loading, setLoading] = useState(false);

  async function updateCategory(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("category_image", categoryImage);
    try {
      const token = localStorage.getItem("Estate");
      const response = await axios.put(
        `http://localhost:7000/api/v1/category/updateCategory/${category.category_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.msg);
      handleCategoryUpdate(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateCategory}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCategoryImage(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit">Save changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditCategory;
