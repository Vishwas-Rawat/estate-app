import React from "react";
import bedroomImg from '../../assets/bedroom.png'
import garageImg from '../../assets/garage.png'
import bathroomImg from '../../assets/bathroom.png'
import sizeImg from '../../assets/size.png'
function OverviewSection({bedroom, bathroom, size}) {
  return (
    <>
      <div className="cardDetailsOverViewDiv">
        <div className="cardDetailsOverviewHead">
          <h1>Overview</h1>
        </div>
        <div className="propertyDetailsDiv">
          <div className="type">
            <h5>Property Type</h5>
            <p><b>pending</b></p>
          </div>

          <div className="year">
            <h5>Year Built</h5>
            <p><b>pending</b></p>
          </div>

          <div className="bedroom">
            <h5>Bedrooms</h5>
            <p>
              <img style={{marginRight: '5px'}} height='20px' src={bedroomImg} alt="bedroom logo" />{bedroom}
            </p>
          </div>

          <div className="bathrooms">
            <h5>Bathrooms</h5>
            <p>
              <img style={{marginRight: '5px'}} height='20px' src={bathroomImg} alt="Bathrooms logo" />{bathroom}
            </p>
          </div>

          <div className="garage">
            <h5>Garage</h5>
            <p>
              <img style={{marginRight: '5px'}} height='20px' src={garageImg} alt="Garage logo" />  <b>pending</b>
            </p>
          </div>

          <div className="size">
            <h5>Size (m2)</h5>
            <p>
              <img style={{marginRight: '5px'}} height='20px' src={sizeImg} alt="size logo" />
              {size}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverviewSection;
