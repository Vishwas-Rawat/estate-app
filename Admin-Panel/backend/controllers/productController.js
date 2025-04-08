import express from "express";
import db from "../config/db.js";
function addProduct(req, res) {
  const addProductQuery =
    "INSERT into product (product_name, product_image, product_address, product_lookingFor, product_location, product_propertySize, product_bathroom, product_bedroom, product_budget, category_id, brand_id) values (?,?,?,?,?,?,?,?,?,?,?)";
    const productImage = req.file ? req.file.filename : null;
  const values = [
    req.body.product_name,
    productImage,
    req.body.product_address,
    req.body.product_lookingFor,
    req.body.product_location,
    req.body.product_propertySize,
    req.body.product_bathroom,
    req.body.product_bedroom,
    req.body.product_budget,
    req.body.category_id,
    req.body.brand_id,
  ];

  try {
    db.query(addProductQuery, values, (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res
          .status(200)
          .send({ msg: "Property added successfully", success: true });
      } else {
        res.status(400).send({ msg: "Property not added ", success: false });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

function allProducts(req, res) {
  const allProductsQuery = "select  * from product";

  try {
    db.query(allProductsQuery, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res
          .status(200)
          .send({ msg: "All property", result: result, success: true });
      } else {
        res.status(400).send({ msg: "No property found ", success: false });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

function editProduct(req, res) {
  const editProductQuery =
    "update product set product_name = ?, product_image = ?, product_address = ?, product_lookingFor = ?, product_location = ?, product_propertySize = ?, product_budget = ? where product_id = ?";
    const productImage = req.file ? req.file.filename : req.body.existing_image;
  const values = [
    req.body.product_name,
    productImage,
    req.body.product_address,
    req.body.product_lookingFor,
    req.body.product_location,
    req.body.product_propertySize,
    req.body.product_budget,
    req.params.product_id,
  ];

  db.query(editProductQuery, values, (err, result) => {
    try {
        console.log(result);
      if (err) throw err;
      if (result.affectedRows > 0) {
        res
          .status(200)
          .send({ msg: "Property updated successfully", success: true });
      } else {
        res.status(400).send({ msg: "Property not updated", success: false });
      }
    } catch (error) {
      res.status(500).send({ msg: "Server error", success: false });
    }
  });
}


function deleteProduct(req, res){
    const deleteProductQuery = 'Delete from product where product_id = ?';
    const values = [req.query.product_id];

    db.query(deleteProductQuery, values, (err, result) => {
        try {
            console.log(result);
          if (err) throw err;
          if (result.affectedRows > 0) {
            res
              .status(200)
              .send({ msg: "Property deleted successfully", success: true });
          } else {
            res.status(400).send({ msg: "Property not deleted", success: false });
          }
        } catch (error) {
          res.status(500).send({ msg: "Server error", success: false });
        }
      });
}


function toggleLike(req, res) {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ success: false, msg: "User ID and Product ID are required." });
  }

  const checkLikeQuery = "SELECT * FROM likes WHERE user_id = ? AND product_id = ?";
  db.query(checkLikeQuery, [user_id, product_id], (err, result) => {
    if (err) return res.status(500).json({ success: false, msg: "Database error", error: err });

    if (result.length > 0) {
      // Unlike the property
      const deleteLikeQuery = "DELETE FROM likes WHERE user_id = ? AND product_id = ?";
      db.query(deleteLikeQuery, [user_id, product_id], (err) => {
        if (err) return res.status(500).json({ success: false, msg: "Error unliking the property", error: err });
        res.json({ success: true, liked: false, msg: "Property unliked." });
      });
    } else {
      // Like the property
      const insertLikeQuery = "INSERT INTO likes (user_id, product_id) VALUES (?, ?)";
      db.query(insertLikeQuery, [user_id, product_id], (err) => {
        if (err) return res.status(500).json({ success: false, msg: "Error liking the property", error: err });
        res.json({ success: true, liked: true, msg: "Property liked." });
      });
    }
  });
}



// Get liked properties for a user
function getLikedProperties(req, res) {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ success: false, msg: "User ID is required." });
  }

  const likedQuery = "SELECT product_id FROM likes WHERE user_id = ?";
  db.query(likedQuery, [user_id], (err, result) => {
    if (err) return res.status(500).json({ success: false, msg: "Database error", error: err });

    res.json({ success: true, likedProducts: result.map((row) => row.product_id) });
  });
}

export default { addProduct, allProducts, editProduct, deleteProduct, toggleLike, getLikedProperties };

