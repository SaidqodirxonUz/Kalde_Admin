import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlineSave } from "react-icons/ai";

const editProduct = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uz_product_name: "",
    ru_product_name: "",
    en_product_name: "",
    uz_desc: "",
    ru_desc: "",
    en_desc: "",
    category_id: null,
    image: null,
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        // console.error(error.message);
        // toast.error("Failed to fetch categories");
        toast("Не удалось обновить категорию", {
          type: "error",
        });
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await axios.get(`/products/${id}`);
        const productData = response.data.data;
        setFormData(productData);
        setSelectedCategoryId(productData.category_id);
      } catch (error) {
        // console.error("Error fetching product details:", error);
        toast("Произошла ошибка, попробуйте еще раз", { type: "warning" });
        navigate("/products");
      }
    }

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithImage = new FormData();

    formDataWithImage.append("uz_product_name", formData.uz_product_name);
    formDataWithImage.append("ru_product_name", formData.ru_product_name);
    formDataWithImage.append("en_product_name", formData.en_product_name);
    formDataWithImage.append("uz_desc", formData.uz_desc);
    formDataWithImage.append("ru_desc", formData.ru_desc);
    formDataWithImage.append("en_desc", formData.en_desc);

    formDataWithImage.append("image", imageFile);

    formDataWithImage.append("category_id", selectedCategoryId);

    console.log("FORMDATA WITH IMAGE", formDataWithImage);
    console.log("FORMDATA", formData);

    // ... oldingi kodlar ...

    try {
      setIsUploading(true);

      const formDataWithImage = new FormData();
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
      if (imageFile) {
        formDataWithImage.append("image", imageFile);
      }

      formDataWithImage.append("category_id", selectedCategoryId);

      const response = await axios.patch(`/products/${id}`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      // Success case
      console.log(response.data, "update data");
      toast.success("Товар успешно обновлена");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);

      // Error case
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
        toast.error(`Failed to update product: ${error.response.data.message}`);
      } else {
        console.error("Request Error:", error.message);
        toast.error("Failed to update product. Check console for details.");
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
          <h2>Изменить Продукт {id} </h2>
          <Link to={`/products`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Все продукты
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uz_product_name" className="form-label">
              Имя (узбекский) :
            </label>
            <input
              type="text"
              id="uz_product_name"
              name="uz_product_name"
              value={formData.uz_product_name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_product_name" className="form-label">
              Имя (Русский) :
            </label>
            <input
              type="text"
              id="ru_product_name"
              name="ru_product_name"
              value={formData.ru_product_name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_product_name" className="form-label">
              Имя (Английский) :
            </label>
            <input
              type="text"
              id="en_product_name"
              name="en_product_name"
              value={formData.en_product_name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="uz_desc" className="form-label">
              Информация (узбекский) :
            </label>
            <textarea
              id="uz_desc"
              name="uz_desc"
              value={formData.uz_desc}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_desc" className="form-label">
              Информация (русский) :
            </label>
            <textarea
              id="ru_desc"
              name="ru_desc"
              value={formData.ru_desc}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_desc" className="form-label">
              Информация (Английский) :
            </label>
            <textarea
              id="en_desc"
              name="en_desc"
              value={formData.en_desc}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category_id" className="form-label">
              Категории :
            </label>
            <select
              typeof="number"
              id="category_id"
              name="category_id"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              className="form-control"
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
              Изображение :
            </label>
            <input
              type="file"
              multiple
              id="image"
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
              <AiOutlineSave /> Сохранять
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default editProduct;
