import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <div className="customMainDiv d-flex">
        <div className="sideBar">
          <ul>
            <li><NavLink to='/allProperty'>Products</NavLink></li>
            <li><NavLink to='/addProduct'>Add Product</NavLink></li>
            <li><NavLink to='/allCategories'>Category</NavLink></li>
            <li><NavLink to='/addCategory'>Add Category</NavLink></li>
            <li><NavLink to='/allBrands'>Brand</NavLink></li>
            <li><NavLink to='/addBrand'>Add Brand</NavLink></li>
            <li><NavLink to='/likedProperties'>❤️ Liked Properties</NavLink></li> {/* New NavLink */}
          </ul>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
