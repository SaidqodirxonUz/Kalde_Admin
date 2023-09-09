import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlineSave } from "react-icons/ai";

const EditCategories = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uz_category_name: "",
    ru_category_name: "",
    en_category_name: "",
  });

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

    const formDataWithImage = new FormData();
    formDataWithImage.append("uz_category_name", formData.uz_category_name);
    formDataWithImage.append("ru_category_name", formData.ru_category_name);
    formDataWithImage.append("en_category_name", formData.en_category_name);

    if (imageFile) {
      formDataWithImage.append("image", imageFile);
    }

    try {
      setIsUploading(true);

      const response = await axios.patch(
        `/categories/${id}`,
        formDataWithImage,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data", // Set the Content-Type header
          },
        }
      );

      console.log(response.data);
      toast.success("Категория успешно обновлена");

      navigate("/categories");

      // Clear form inputs after successful submission
      setFormData({
        uz_category_name: "",
        ru_category_name: "",
        en_category_name: "",
      });
      setImageFile(null);
    } catch (error) {
      console.log("Error updating category:", error);

      toast("Не удалось обновить категорию", {
        type: "error",
      });
      toast("Изображение с таким названием уже загружено", { type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    async function fetchCategoriesDetails() {
      try {
        const response = await axios.get(`/categories/${id}`);
        const categoriesData = response.data.data;
        setFormData(categoriesData);
        // toast.success("Успешно");
      } catch (error) {
        console.error("Error fetching category details:", error);
        toast("Произошла ошибка, попробуйте еще раз", { type: "warning" });
        navigate("/categories");
      }
    }

    if (id) {
      fetchCategoriesDetails();
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between mb-5">
          <h2>Изменить категорию {id} </h2>
          <Link to={`/products`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Все категории
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Имя (узбекский) :
            </label>
            <input
              type="text"
              id="uz_category_name"
              name="uz_category_name"
              value={formData.uz_category_name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_category_name" className="form-label">
              Имя (Русский) :
            </label>
            <input
              type="text"
              id="ru_category_name"
              name="ru_category_name"
              value={formData.ru_category_name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_category_name" className="form-label">
              Имя (Английский) :
            </label>
            <input
              type="text"
              id="en_category_name"
              name="en_category_name"
              value={formData.en_category_name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Изображение :
            </label>
            <input
              type="file"
              id="image"
              name="image" // Add name attribute for file upload
              accept="image/*"
              onChange={handleImageChange}
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
              <AiOutlineSave /> Добавлять
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditCategories;
