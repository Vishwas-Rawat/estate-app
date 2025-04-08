import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function LikedProperties() {
  const [likedProperties, setLikedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [propertyLikers, setPropertyLikers] = useState({});
  const user_id = localStorage.getItem("Estate-user_id");

  // Fetch users who liked each property
  const fetchPropertyLikers = async (product_id) => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/v1/user/likes/${product_id}`
      );
      if (response.data.success) {
        setPropertyLikers(prev => ({
          ...prev,
          [product_id]: response.data.user_ids
        }));
      }
    } catch (error) {
      console.error("Error fetching likers:", error);
    }
  };

  // Fetch liked properties from API
  useEffect(() => {
    const fetchLikedProperties = async () => {
      if (!user_id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First get the list of liked property IDs
        const likesResponse = await axios.get(
          "http://localhost:7000/api/v1/property/likedProperty",
          { params: { user_id } }
        );

        if (likesResponse.data.success && likesResponse.data.likedProducts.length > 0) {
          // Then fetch details for each liked property
          const propertiesResponse = await axios.get(
            "http://localhost:7000/api/v1/property/allProperty"
          );

          if (propertiesResponse.data.success) {
            // Filter only the liked properties
            const liked = propertiesResponse.data.result.filter(property => 
              likesResponse.data.likedProducts.includes(property.product_id)
            );
            setLikedProperties(liked);
            
            // Fetch users who liked each property
            liked.forEach(property => {
              fetchPropertyLikers(property.product_id);
            });
          }
        }
      } catch (error) {
        toast.error("Failed to fetch liked properties");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProperties();
  }, [user_id]);

  if (!user_id) {
    return (
      <div className="container text-center py-5">
        <h4>Please login to view your liked properties</h4>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <ToastContainer />
      <h3 className="mb-4">Your Liked Properties</h3>
      
      <div className="mainCardDiv row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {likedProperties.length > 0 ? (
          likedProperties.map((prod) => (
            <div className="col" key={prod.product_id}>
              <NavLink
                style={{ textDecoration: "none" }}
                className="text-dark"
                to={`/propertyDetails/${prod.product_id}`}
              >
                <div className="card h-100">
                  <div className="imageDiv position-relative">
                    <span className="position-absolute top-0 start-0 m-2 badge bg-success">
                      {prod.product_lookingFor}
                    </span>
                    <img 
                      src={`http://localhost:7000/uploads/${prod.product_image}`} 
                      className="card-img-top property-image"
                      alt={prod.product_name}
                    />
                    <div className="bottomDiv d-flex justify-content-between p-2 bg-light">
                      <span>Bed: {prod.product_bedroom}</span>
                      <span>Bath: {prod.product_bathroom}</span>
                      <span>{prod.product_propertySize} m²</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{prod.product_name}</h5>
                    <p className="card-text text-muted">
                      <i className="bi bi-geo-alt"></i> {prod.product_address}
                    </p>
                    <span className="badge bg-warning text-dark">
                      {prod.product_location}
                    </span>
                    <p className="mt-2 text-primary fw-bold">
                      ${prod.product_budget.toLocaleString()}
                    </p>
                    
                    {/* Added Liked By section */}
                    <div className="liked-by-section mt-3 pt-2 border-top">
                      <small className="text-muted">Liked by:</small>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {propertyLikers[prod.product_id] ? (
                          propertyLikers[prod.product_id].map(userId => (
                            <span key={userId} className="badge bg-light text-dark">
                              User #{userId}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">Loading...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">No liked properties found</h5>
            <p>Properties you like will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedProperties;