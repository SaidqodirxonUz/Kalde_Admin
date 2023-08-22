import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";

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
    price: "",
    barcode: "",
    diametr: "",
    ichki_diametr: "",
    ichki_uzunlik: "",
    tashqi_uzunlik: "",
    razmer: "",
    soni: "",
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
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithImage = new FormData();
    if (formData.diametr !== null && formData.soni !== null) {
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
      formDataWithImage.append("price", formData.price);
      formDataWithImage.append("barcode", formData.barcode);
      //
      formDataWithImage.append("diametr", formData.diametr);
      formDataWithImage.append("soni", formData.soni);
    } else if (
      formData.diametr !== null &&
      formData.ichki_diametr !== null &&
      formData.ichki_uzunlik !== null &&
      formData.tashqi_uzunlik !== null &&
      formData.soni !== null
    ) {
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
      formDataWithImage.append("price", formData.price);
      formDataWithImage.append("barcode", formData.barcode);
      //
      formDataWithImage.append("diametr", formData.diametr);
      formDataWithImage.append("ichki_diametr", formData.ichki_diametr);
      formDataWithImage.append("ichki_uzunlik", formData.ichki_uzunlik);
      formDataWithImage.append("tashqi_uzunlik", formData.tashqi_uzunlik);
      formDataWithImage.append("soni", formData.soni);
    } else if (formData.razmer !== null) {
      formDataWithImage.append("razmer", formData.razmer);
    } else if (
      formData.razmer !== null &&
      formData.ichki_diametr !== null &&
      formData.diametr !== null &&
      formData.tashqi_uzunlik !== null &&
      formData.soni !== null
    ) {
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
      formDataWithImage.append("price", formData.price);
      formDataWithImage.append("barcode", formData.barcode);
      //
      formDataWithImage.append("razmer", formData.razmer);
      formDataWithImage.append("ichki_diametr", formData.ichki_diametr);
      formDataWithImage.append("diametr", formData.diametr);
      formDataWithImage.append("tashqi_uzunlik", formData.tashqi_uzunlik);
      formDataWithImage.append("soni", formData.soni);
    } else if (
      formData.razmer !== null &&
      formData.ichki_diametr !== null &&
      formData.tashqi_uzunlik !== null &&
      formData.soni !== null
    ) {
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
      formDataWithImage.append("price", formData.price);
      formDataWithImage.append("barcode", formData.barcode);
      //
      formDataWithImage.append("razmer", formData.razmer);
      formDataWithImage.append("ichki_diametr", formData.ichki_diametr);
      formDataWithImage.append("tashqi_uzunlik", formData.tashqi_uzunlik);
      formDataWithImage.append("soni", formData.soni);
    } else if (formData.razmer !== null && formData.soni !== null) {
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
      formDataWithImage.append("price", formData.price);
      formDataWithImage.append("barcode", formData.barcode);
      //
      formDataWithImage.append("razmer", formData.razmer);
      formDataWithImage.append("soni", formData.soni);
    } else if (
      formData.razmer !== null &&
      formData.diametr !== null &&
      formData.soni !== null
    ) {
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
      formDataWithImage.append("price", formData.price);
      formDataWithImage.append("barcode", formData.barcode);
      //
      formDataWithImage.append("razmer", formData.razmer);
      formDataWithImage.append("diametr", formData.diametr);
      formDataWithImage.append("soni", formData.soni);
    } else if (formData.razmer !== null) {
      formDataWithImage.append("uz_product_name", formData.uz_product_name);
      formDataWithImage.append("ru_product_name", formData.ru_product_name);
      formDataWithImage.append("en_product_name", formData.en_product_name);
      formDataWithImage.append("uz_desc", formData.uz_desc);
      formDataWithImage.append("ru_desc", formData.ru_desc);
      formDataWithImage.append("en_desc", formData.en_desc);
      formDataWithImage.append("price", formData.price);
      formDataWithImage.append("barcode", formData.barcode);
      //
      formDataWithImage.append("razmer", formData.razmer);
    } else {
      toast("Вы добавляете не тот товар, невозможно добавить этот тип товара");
    }

    // formDataWithImage.append("category_id", selectedCategoryId);

    // formDataWithImage.append("diametr", formData.diametr);
    // formDataWithImage.append("ichki_diametr", formData.ichki_diametr);
    // formDataWithImage.append("ichki_uzunlik", formData.ichki_uzunlik);
    // formDataWithImage.append("tashqi_uzunlik", formData.tashqi_uzunlik);
    // formDataWithImage.append("razmer", formData.razmer);
    // formDataWithImage.append("soni", formData.soni);

    formDataWithImage.append("category_id", selectedCategoryId);

    console.log("FORMDATA WITH IMAGE", formDataWithImage);
    console.log("FORMDATA", formData);

    // if (image) {
    formDataWithImage.append("image", imageFile);
    // }

    try {
      setIsUploading(true);

      const response = await axios.patch(`/products/${id}`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      toast.success("Товар успешно обновлена");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error.message);
      toast.error("Failed to update product");
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
            <label htmlFor="price" className="form-label">
              Цена :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="barcode" className="form-label">
              Штрих-код :
            </label>
            <input
              type="number"
              id="barcode"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="diametr" className="form-label">
              Диаметр :
            </label>
            <input
              type="number"
              id="diametr"
              name="diametr"
              value={formData.diametr}
              onChange={handleInputChange}
              className="form-control"
              //
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ichki_diametr" className="form-label">
              Внутренний диаметр :
            </label>
            <input
              type="number"
              id="ichki_diametr"
              name="ichki_diametr"
              value={formData.ichki_diametr}
              onChange={handleInputChange}
              className="form-control"
              //
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ichki_uzunlik" className="form-label">
              Внутренняя длина :
            </label>
            <input
              type="number"
              id="ichki_uzunlik"
              name="ichki_uzunlik"
              value={formData.ichki_uzunlik}
              onChange={handleInputChange}
              className="form-control"
              //
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tashqi_uzunlik" className="form-label">
              Внешняя длина :
            </label>
            <input
              type="number"
              id="tashqi_uzunlik"
              name="tashqi_uzunlik"
              value={formData.tashqi_uzunlik}
              onChange={handleInputChange}
              className="form-control"
              //
            />
          </div>

          <div className="mb-3">
            <label htmlFor="razmer" className="form-label">
              Размер :
            </label>
            <input
              type="number"
              id="razmer"
              name="razmer"
              value={formData.razmer}
              onChange={handleInputChange}
              className="form-control"
              //
            />
          </div>

          <div className="mb-3">
            <label htmlFor="soni" className="form-label">
              Номер :
            </label>
            <input
              type="number"
              id="soni"
              name="soni"
              value={formData.soni}
              onChange={handleInputChange}
              className="form-control"
              //
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Изображение :
            </label>
            <input
              type="file"
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
      <Footer />
    </>
  );
};

export default editProduct;
