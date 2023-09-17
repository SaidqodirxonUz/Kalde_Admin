import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlineSave } from "react-icons/ai";

const EditAdmin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    password: "",
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("full_name", formData.full_name);
    formDataWithImage.append("phone_number", formData.phone_number);
    formDataWithImage.append("password", formData.password);

    try {
      setIsUploading(true);

      const response = await axios.patch(`/admin/me`, formDataWithImage, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json", // Set the Content-Type header
        },
      });

      console.log(response.data);
      toast.success("Admin успешно обновлена");

      navigate("/");

      // Clear form inputs after successful submission
      // setFormData({
      //   full_name: "",
      //   phone_number: "",
      //   password: "",
      // });

      // setImageFile(null);
    } catch (error) {
      console.log("Error updating admin:", error);

      toast("Не удалось обновить Admin", {
        type: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between mb-5">
          <h2>Изменить Admin </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="full_name" className="form-label">
              Имя :
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              Номер телефона
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Пароль :
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div>
            {isUploading && <p>Загрузка, данные изменяются ....</p>}
            <button
              type="submit" // Changed to type="submit"
              className="btn btn-primary mb-5 col-3 me-1"
              disabled={isUploading}
            >
              <AiOutlineSave /> Обновлять
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditAdmin;
