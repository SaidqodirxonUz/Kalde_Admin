import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uz_product_name: "",
    ru_product_name: "",
    en_product_name: "",
    uz_desc: "",
    ru_desc: "",
    en_desc: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data.data);
        console.log(response.data.data);
        // toast.success("успешный");
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        toast.error("Не удалось загрузить категории");
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const val = event.target.value;
    const sVal = Number(val);
    setSelectedCategoryId(sVal);
    console.log("SVAL bu ", sVal);
    console.log("SVAL bu ", typeof sVal);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    console.log(event.target.files);
    setImageFile(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      toast.error("Вы должны выбрать картинку.", { type: "error" });
      return;
    }
    console.log(imageFile);
    const formDataWithImage = new FormData();

    console.log(formData);

    try {
      setIsUploading(true);

      const response = await axios.post("/products", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Product added:", response.data.data);
      toast(response.data.message, { type: "success" });
      navigate("/products");
    } catch (error) {
      if (error) {
        // console.log("Server Response Data:", error.response.data);
        // console.log("Status Code:", error.response.status);
        toast("Ошибка добавления продукта & Проверьте штрих-код", {
          type: "error",
        });
        // toast(error.data.errMessage, { type: "error" });
        toast("Изображение с таким названием уже загружено", { type: "error" });
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
          <h2>Добавить новый продукт</h2>
          <Link to={`/products`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Все продукты
          </Link>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="uz_product_name" className="form-label">
              Имя (узбекский) <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="uz_product_name"
              name="uz_product_name"
              value={formData.uz_product_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_product_name" className="form-label">
              Имя (Русский) <span className="text-danger">Обязательно</span> :
            </label>
            <input
              type="text"
              id="ru_product_name"
              name="ru_product_name"
              value={formData.ru_product_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_product_name" className="form-label">
              Имя (Английский) <span className="text-danger">Обязательно</span>{" "}
              :
            </label>
            <input
              type="text"
              id="en_product_name"
              name="en_product_name"
              value={formData.en_product_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="uz_desc" className="form-label">
              Информация (узбекский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <textarea
              id="uz_desc"
              name="uz_desc"
              value={formData.uz_desc}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_desc" className="form-label">
              Информация (русский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <textarea
              id="ru_desc"
              name="ru_desc"
              value={formData.ru_desc}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_desc" className="form-label">
              Информация (Английский){" "}
              <span className="text-danger">Обязательно</span> :
            </label>
            <textarea
              id="en_desc"
              name="en_desc"
              value={formData.en_desc}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category_id" className="form-label">
              Категории <span className="text-danger">Обязательно</span> :
            </label>
            <select
              id="category_id"
              name="category_id"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              className="form-control"
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.ru_category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Изображение<span className="text-danger"> Oбязательно</span> :
            </label>
            <input
              type="file"
              multiple
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

export default ProductForm;
