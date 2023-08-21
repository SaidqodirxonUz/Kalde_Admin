import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

// Components
import Header from "../Components/Header";
import DealersList from "../Components/DealersList";

const Dealers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <DealersList />
      <Footer />
    </>
  );
};

export default Dealers;
