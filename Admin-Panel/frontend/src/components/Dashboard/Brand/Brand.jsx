import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EditBrand from "./EditBrand";
import DeleteBrand from "./DeleteBrand";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [selectBrand, setSelectBrand] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function getAllBrands() {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/brand/getAllBrands"
        );
        setBrands(response.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBrands();
  }, []);

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectBrand(null);
    setShowDeleteModal(false);
  };

  const handleBrandUpdate = (updatedBrand) => {
    setBrands(
      brands.map((br) =>
        br.brand_id === updatedBrand.brand_id ? updatedBrand : br
      )
    );
    setShowEditModal(false);
  };

  const handleBrandDelete = (deletedBrandId) => {
    setBrands(brands.filter((e) => e.brand_id !== deletedBrandId));
    setShowDeleteModal(false);
  };

  const handleEditClick = (brand) => {
    setSelectBrand(brand);
    setShowEditModal(true);
  };

  return (
    <>
      {brands.length > 0 ? (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Brand Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.brand_id}>
                <td>{b.brand_name}</td>
                <td>
                  <img
                    src={`http://localhost:7000/uploads/${b.brand_image}`}
                    alt={b.brand_name}
                    width="100"
                  />
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setSelectBrand(b);
                      setShowEditModal(true);
                    }}
                    variant="warning"
                    className="m-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDeleteModal(true)
                      setSelectBrand(b)
                    }}
                    variant="danger"
                    className="m-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No Brand Available</div>
      )}

<>
  {selectBrand && (
    <EditBrand
      show={showEditModal}
      brand={selectBrand}
      handleClose={handleCloseModal}
      handleBrandUpdate={handleBrandUpdate}
    />
  )}

  {showDeleteModal && selectBrand && (
    <DeleteBrand
      show={showDeleteModal}
      brand={selectBrand}
      handleClose={() => setShowDeleteModal(false)}
      handleBrandDelete={handleBrandDelete}
    />
  )}
</>

    </>
  );
};

export default BrandList;
