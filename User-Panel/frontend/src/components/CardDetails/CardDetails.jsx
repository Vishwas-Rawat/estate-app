import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form";
import axios from "axios";
import "./CardDetails.css";
import OverviewSection from './OverviewSection'
import Address from './Address'

function CardDetails() {
  const { id } = useParams();
  const [allProperties, setAllProperties] = useState([]);
  const [property, setProperty] = useState(null);

  async function fetchAllProperties() {
    try {
      const response = await axios.get(
        "http://estate-app-production.up.railway.app/api/v1/property/allProperty"
      );
      if (response.data.success) {
        setAllProperties(response.data.result);
      }
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  }

  useEffect(() => {
    fetchAllProperties();
  }, []);

  // Find the property with the matching ID
  useEffect(() => {
    if (allProperties.length > 0) {
      const foundProperty = allProperties.find(
        (prop) => prop.product_id.toString() === id
      );
      setProperty(foundProperty || null);
    }
  }, [allProperties, id]);

  if (!property) {
    return <h1>No property found</h1>;
  }
  return (
    <>
      <div className="mainDiv container">
        <div>
          <p className=" badge bg-success text-light">{property.product_lookingFor}</p>
        </div>

        <div className="imageAndFormDiv">
          <div className="cardDetailsImageDiv">
          <h2>{property.product_name}</h2>
            <img src={`http://localhost:7000/uploads/${property.product_image}`} alt="cardDetails" />
          </div>

          <Form />
          
        </div>
        <OverviewSection 
        bedroom={property.product_bedroom}
        bathroom={property.product_bathroom}
        size={property.product_propertySize}
        />

        <Address 
        address={property.product_address}
        
        />


        <div className="cardDetailsDetailsDiv">
          <div className="cardDetailsDetailsHead">
            <h1>Details</h1>
          </div>

          <div className="cardDetailsDetailsInnerDiv  p-2 d-flex">
            <div className="addressCityStateDiv">
              <div className="addressDiv d-flex ">
                <p className="fw-bold addressSideHead">Property ID</p>
                <p>{property.product_id}</p>
              </div>

              <div className="cityDiv d-flex justify-space-between">
                <p className="fw-bold">Property Type:</p>
                <b>pending</b>
              </div>

              <div className="stateDiv d-flex justify-space-between">
                <p className="fw-bold">Bedrooms</p>
                <p>{property.product_bedroom}</p>
              </div>
            </div>

            <div className="zipAreaCountryDiv flex-column">
              <div className="zipDiv d-flex">
                <p className="fw-bold text-align-start">Property Size</p>
                <p>{property.product_propertySize} m²</p>
              </div>

              <div className="areaDiv d-flex">
                <p className="fw-bold">Property Status</p>
                <b>pending</b>
              </div>

              <div className="countryDiv d-flex">
                <p className="text-align-start fw-bold">Bathrooms</p>
                <p>{property.product_bathroom}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDetails;

