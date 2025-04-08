import React from "react";
function Address({address}) {
  return (
    <>
      <div className="cardDetailsAddressDiv">
        <div className="cardDetailsAddressHead">
          <h1>Address</h1>
        </div>
        <div className="cardDetailsAddressInnerDiv  p-2 d-flex">
          <div className="addressCityStateDiv">
            <div className="addressDiv d-flex ">
              <p className="fw-bold addressSideHead">Address</p>
              <p>{address} </p>
            </div>

            <div className="cityDiv d-flex justify-space-between">
              <p className="fw-bold">City</p>
              <p><b>pending</b></p>
            </div>

            <div className="stateDiv d-flex justify-space-between">
              <p className="fw-bold">State/county</p>
              <p><b>pending</b></p>
            </div>
          </div>

          <div className="zipAreaCountryDiv flex-column">
            <div className="zipDiv d-flex">
              <p className="fw-bold text-align-start">Zip/Postal Code</p>
              <p><b>pending</b></p>
            </div>

            <div className="areaDiv d-flex">
              <p className="fw-bold">Area</p>
              <p><b>pending</b></p>
            </div>

            <div className="countryDiv d-flex">
              <p className="text-align-start fw-bold">Country</p>
              <p><b>pending</b></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;
