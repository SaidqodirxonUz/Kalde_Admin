import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";

const CreateDealers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title_uz: "",
    title_ru: "",
    title_en: "",
    desc_uz: "",
    desc_ru: "",
    desc_en: "",

    location: "NULL",

    phone_number: "",
    addition_number: "NULL",
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

    try {
      setIsUploading(true);

      const response = await axios.post("/dealers", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("added:", response.data);
      toast("добавлена", { type: "success" });
      navigate("/dealers");
    } catch (error) {
      console.log("Error adding category:", error.message);

      if (error.response) {
        console.log("Server Response Data:", error.response.data);
        console.log("Status Code:", error.response.status);
        toast("Ошибка добавления Категория", { type: "error" });
      } else {
        toast("An error occurred while making the request", { type: "error" });
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between mb-5">
          <h2>Добавить Дилер</h2>
          <Link to={`/dealers`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Все Дилеры
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Заголовок (узбекский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="uz_category_name"
              name="title_uz"
              // value={formData.title_uz}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_category_name" className="form-label">
              Заголовок (Русский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="ru_category_name"
              name="title_ru"
              // value={formData.title_ru}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_category_name" className="form-label">
              Заголовок (Английский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="en_category_name"
              name="title_en"
              // value={formData.title_en}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Oписание (узбекский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="uz_category_name"
              name="desc_uz"
              // value={formData.desc_uz}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_category_name" className="form-label">
              Oписание (Русский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="ru_category_name"
              name="desc_ru"
              // value={formData.desc_ru}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_category_name" className="form-label">
              Oписание (Английский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="en_category_name"
              name="desc_en"
              // value={formData.desc_en}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Расположение
              <span className="text-danger"> Не обязательно</span> :
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              Номер телефона
              <span className="text-danger"> Обязательно</span> :
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="addition_number" className="form-label">
              Дополнительный номер телефона
              <span className="text-danger"> Не обязательно</span> :
            </label>
            <input
              type="text"
              id="addition_number"
              name="addition_number"
              value={formData.addition_number}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div>
            {isUploading && <p>Загрузка, пожалуйста подождите ....</p>}
            <button
              type="submit" // Changed to type="submit"
              className="btn btn-primary mb-5 col-3 me-1"
              disabled={isUploading}
            >
              Добавлять
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateDealers;
