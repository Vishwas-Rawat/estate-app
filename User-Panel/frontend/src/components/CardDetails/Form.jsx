import React from "react";
function Form(){
    return(
        <>
            <div className="cardDetailsFormDiv">
            <form action="">
              <h2 style={{marginBottom: '0px', whiteSpace:'nowrap'}}>Submit an enquiry</h2>
              <div className="userImageDiv">
                <img src="das.png" alt="userImage" />
                <div className=" nameAndRole">
                  <p>Martha Stewart</p>
                  <p>Property Consultant</p>
                </div>
              </div>

              <div className="userDetails">
                <label htmlFor="">Name</label>
                <input type="text" name="" id="" />

                <label htmlFor="">Email</label>
                <input type="email" name="" id="" />

                <label htmlFor="">Phone (Optional)</label>
                <input type="number" name="" id="" />

                <label htmlFor="">Message</label>
                <input type="text" name="" id="" />

                <button
                  style={{ borderRadius: "10px" }}
                  className="bg-primary text-light fw-bold w-100 p-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
    )
}

export default Form;