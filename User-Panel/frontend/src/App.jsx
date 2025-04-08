import React from "react";
import Navbar from "./components/navbar/Navbar";
import FilterProperty from "./components/filterProperty/FilterProperty";
import Cards from "./components/Cards/Cards";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CardDetails from "./components/CardDetails/CardDetails";
import { Routes, Route, useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FilterProperty />
              <Cards />
            </>
          }
        ></Route>

        <Route path="/" element={<FilterProperty />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/propertyDetails/:id" element={<CardDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
