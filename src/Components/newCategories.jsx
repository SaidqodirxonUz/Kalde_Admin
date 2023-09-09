import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";

const CategoriesForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uz_category_name: "",
    ru_category_name: "",
    en_category_name: "",
  });

  //   uz_category_name:Ehtiyot qismlari uz
  // ru_category_name:Ehtiyot qismlari ru
  // en_category_name:Ehtiyot qismlari en

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      toast.error("Вы должны выбрать картинку.", { type: "error" });
      return;
    }

    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }

    formDataWithImage.append("image", imageFile);

    try {
      setIsUploading(true);

      const response = await axios.post("/categories", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("category added:", response.data.data);
      toast("Категория добавлена", { type: "success" });
      navigate("/categories");
    } catch (error) {
      console.log("Error adding category:", error.message);
      //   toast(error.message, { type: "error" });

      toast("Изображение с таким названием уже загружено", { type: "error" });
      toast("Ошибка добавления Категория", { type: "error" });

      console.log("Server Response Data:", error.response.data);
      console.log("Status Code:", error.response.status);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between mb-5">
          <h2>Добавить новый Категория</h2>
          <Link to={`/categories`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Все Категории
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Категория (узбекский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="uz_category_name"
              name="uz_category_name"
              value={formData.uz_category_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_category_name" className="form-label">
              Категория (Русский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="ru_category_name"
              name="ru_category_name"
              value={formData.ru_category_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_category_name" className="form-label">
              Категория (Английский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="en_category_name"
              name="en_category_name"
              value={formData.en_category_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Изображение<span className="text-danger"> Oбязательно</span> :
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
              required
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
      <Footer />
    </>
  );
};

export default CategoriesForm;
