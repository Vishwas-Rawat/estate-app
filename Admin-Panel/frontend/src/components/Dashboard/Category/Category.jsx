import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteCategory from "./DeleteCategory";
import { ToastContainer, toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";
import EditCategory from "./EditCategory";

function Category() {
  const [categories, setCategories] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/category/allCategories"
        );
        setCategories(response.data.result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, []);


  const handleCategoryUpdate = (category) => {
    categories.map((c) =>
      c.category_id === category.category_id ? category : c
    );
    setOpenEditModal(false);
  };

  const handleCategoryDelete = (categoryId) => {
    setCategories(categories.filter((c) => c.category_id !== categoryId));
    setOpenDeleteModal(false);
  };

  const handleClose = () => {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
  };
  return (
    <>
      {categories.length > 0 ? (
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c) => (
              <tr key={c.category_id}>
                <td>{c.category_name}</td>
                <td>
                  <img
                    width={200}
                    src={`http://localhost:7000/uploads/${c.category_image}`}
                    alt={c.category_name}
                  />
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setOpenEditModal(true);
                      setSelectedCategory(c);
                    }}
                    className="m-2"
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button onClick={()=>{
                    setOpenDeleteModal(true)
                    setSelectedCategory(c)
                  }} variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h1 className="text-center">No category found</h1>
      )}

      {selectedCategory && (
        <EditCategory
          category={selectedCategory}
          show={openEditModal}
          handleCategoryUpdate={handleCategoryUpdate}
          handleClose={handleClose}
        />
      )}

      {selectedCategory && openDeleteModal && (
        <DeleteCategory
          category={selectedCategory}
          show={openDeleteModal}
          handleCategoryDelete={handleCategoryDelete}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default Category;
