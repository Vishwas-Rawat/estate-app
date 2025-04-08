import React, { useEffect, useState } from "react";
import "./FilterProperty.css";
import filterImage from "../../assets/filterImage.png";
import axios from "axios";
import Cards from "../Cards/Cards";
function FilterProperty() {
  const [filters, setFilters] = useState({
    lookingFor: "",
    location: "",
    propertySize: "",
    budget: "",
  })

  return (
    <>
      <div className="mainDiv">
        <div className="imageDiv">
          <img src={filterImage} alt="" />
          <div className="formDiv">
            <h1>Your dream home</h1>
            <h4>Is one click away</h4>

            <div className="topButtons">
              <button className="bg-primary text-light fw-bold p-2">
                All units
              </button>
              <button className="centerBtn mt-2 bg-primary text-light fw-bold p-2">
                For rent
              </button>
              <button className="bg-primary text-light fw-bold p-2">
                For sale
              </button>
            </div>

            <div>
              <form action="" className="form">
                <div className="looking">
                  <label htmlFor="lookingFor">Looking For</label>
                  <select name="" id="lookingFor" 
                    onChange={(e)=>setFilters({...filters, lookingFor: e.target.value})}
                  >
                    <option value="select">Select</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="Lease">Lease</option>
                    <option value="Sell">Sell</option>
                    <option value="PG (Paying Guest)">PG (Paying Guest)</option>
                    <option value="Commercial Space">Commercial Space</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                  </select>
                </div>

                <div className="location">
                  <label htmlFor="location">Location</label>
                  <select name="" id="location"
                    onChange={(e)=>setFilters({...filters, location: e.target.value})}
                  >
                    <option value="select">Select</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="South Korea">South Korea</option>
                  </select>
                </div>

                <div className="size">
                  <label>Property size</label>
                  <select id="propertySize"
                    onChange={(e) =>
                      setFilters({ ...filters, propertySize: e.target.value })
                    }
                  >
                    <option value="">Select Size</option>
                    <option value="500">500 sq ft</option>
                    <option value="1000">1000 sq ft</option>
                    <option value="1500">1500 sq ft</option>
                    <option value="2000">2000 sq ft</option>
                    <option value="2500">2500 sq ft</option>
                  </select>
                </div>

                <div className="budget">
                  <label>Budget</label>
                  <select onChange={(e) =>
                    setFilters({ ...filters, budget: e.target.value })
                  }>
                    <option value="">Max price</option>
                    <option value="500000">₹5,00,000</option>
                    <option value="1000000">₹10,00,000</option>
                    <option value="2500000">₹25,00,000</option>
                    <option value="5000000">₹50,00,000</option>
                    <option value="10000000">₹1,00,00,000</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Cards
        filters={filters}
      />

    </>

  );
}

export default FilterProperty;
