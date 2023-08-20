import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

// Components
import Header from "../Components/Header";
import Categories from "../Components/Categories";

const CategoriesList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <Categories />
      <Footer />
    </>
  );
};

export default CategoriesList;
