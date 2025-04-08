import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Cards.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Cards({ filters = {} }) {
  const [allProperty, setAllProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localLikes, setLocalLikes] = useState({});

  const user_id = localStorage.getItem("eState-userId");

  // Fetch properties on mount
  useEffect(() => {
    async function propertyDetails() {
      try {
        const response = await axios.get("http://localhost:7000/api/v1/property/allProperty");
        if (response.data.success) {
          setAllProperty(response.data.result);
          // Initialize all likes as false
          const initialLikes = {};
          response.data.result.forEach(property => {
            initialLikes[property.product_id] = false;
          });
          setLocalLikes(initialLikes);
        }
      } catch (error) {
        toast.error("Failed to fetch properties.");
      }
    }
    propertyDetails();
  }, []);

  const toggleLike = async (product_id) => {
    const token = localStorage.getItem('eStateToken');
    if (!user_id) {
      toast.error("Please login to like properties");
      return;
    }

    setLoading(true);
    try {
      // Optimistic UI update
      const isCurrentlyLiked = localLikes[product_id];
      setLocalLikes(prev => ({
        ...prev,
        [product_id]: !isCurrentlyLiked
      }));

      const response = await axios.post(
        "http://localhost:7000/api/v1/property/toggleLike", 
        { user_id, product_id }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.data.success) {
        // Revert if API fails
        setLocalLikes(prev => ({
          ...prev,
          [product_id]: isCurrentlyLiked
        }));
        toast.error(response.data.msg || "Failed to update like status");
      }
    } catch (error) {
      toast.error("Failed to update like status.");
      console.error("Like error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = allProperty.filter((property) => {
    return (
      (filters.lookingFor === "" || property.product_lookingFor === filters.lookingFor) &&
      (filters.location === "" || property.product_location === filters.location) &&
      (filters.propertySize === "" || property.product_propertySize === filters.propertySize) &&
      (filters.budget === "" || property.product_budget <= filters.budget)
    );
  });

  return (
    <>
      <ToastContainer />
      <div className="mainCardDiv container-fluid d-flex justify-content-between flex-wrap">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((prod) => (
            <NavLink
              style={{ textDecoration: "none" }}
              className="text-dark"
              key={prod.product_id}
              to={`/propertyDetails/${prod.product_id}`}
            >
              <div className="card">
                <div className="imageDiv">
                  <button className="cardBtn badge bg-success text-light">
                    {prod.product_lookingFor}
                  </button>
                  <div className="imageContainer">
                    <img 
                      src={`http://localhost:7000/uploads/${prod.product_image}`} 
                      alt={prod.product_name}
                      className="property-image"
                    />
                    <div className="bottomDiv">
                      <p>Bedroom {prod.product_bedroom}</p>
                      <p className="bottomBathroomPara">Bathroom {prod.product_bathroom}</p>
                      <p>Area {prod.product_propertySize} m²</p>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p>
                    <b>Name:</b> {prod.product_name}
                  </p>
                  <p>
                    <b>Address:</b> {prod.product_address}
                  </p>
                  <p style={{ width: "fit-content" }} className="badge p-2 m-2 bg-warning text-dark">
                    {prod.product_location}
                  </p>
                  <p className="price">
                    <b>Price:</b> ${prod.product_budget.toLocaleString()}
                  </p>
                </div>
                <button
                  className="like-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!loading) {
                      toggleLike(prod.product_id);
                    }
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: loading ? "not-allowed" : "pointer",
                    color: localLikes[prod.product_id] ? "red" : "#ccc",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1
                  }}
                  disabled={loading}
                  aria-label={localLikes[prod.product_id] ? "Unlike property" : "Like property"}
                >
                  {localLikes[prod.product_id] ? "❤️" : "♡"}
                </button>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No properties found matching your criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;