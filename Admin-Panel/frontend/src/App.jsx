import "./App.css";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import AddBrand from "./components/Dashboard/Add Brand/AddBrand";
import BrandList from "./components/Dashboard/Brand/Brand";
import AddCategory from "./components/Dashboard/Add Category/AddCategory";
import Category from "./components/Dashboard/Category/Category";
import AddProduct from "./components/Dashboard/AddProduct/AddProduct";
import Products from "./components/Dashboard/Products/Products";
import LikedProperties from "./components/Dashboard/Products/LikedProperties";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/addBrand" element={<AddBrand/>}></Route>
          <Route path="/allBrands" element={<BrandList/>}></Route>
          <Route path="/addCategory" element={<AddCategory/>}></Route>
          <Route path="/allCategories" element={<Category/>}></Route>
          <Route path="/addProduct" element={<AddProduct/>}></Route>
          <Route path="/allProperty" element={<Products/>}></Route>
          <Route path="/likedProperties" element={<LikedProperties />} />
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
