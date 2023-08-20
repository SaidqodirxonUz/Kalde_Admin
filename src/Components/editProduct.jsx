import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";

const editProduct = () => {
  let { id } = useParams();

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
        toast.success("успешный");

        console.log(response.data.data);
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await axios.get(`/products/${id}`);
        console.log(response);
        const productData = response.data.data;
        setFormData(productData);
        setSelectedCategoryId(productData.category_id);
        toast.success("успешный");
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    // fetchCategories();
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
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    formDataWithImage.append("image", imageFile);

    console.log("Request Payload:", Object.fromEntries(formDataWithImage));

    try {
      setIsUploading(true);

      const response = await axios.patch(`/products/${id}`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error update product:", error);
      toast(error.message, { type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between mb-5">
          <h2>Edit {id} Product</h2>
          <Link to={`/products`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Hamma Productlar
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uz_product_name" className="form-label">
              Nomi (Uzbek):
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
              Nomi (Russian):
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
              Nomi (English):
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
              Ma'lumot (Uzbek):
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
              Ma'lumot (Russian):
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
              Ma'lumot (English):
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
              Category:
            </label>
            <select
              typeof="number"
              id="category_id"
              name="category_id"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              className="form-control"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.ru_category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Narxi:
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
              Barcode:
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
              Diametr:
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
              Ichki Diametr:
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
              Ichki Uzunlik:
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
              Tashqi Uzunlik:
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
              Razmer :
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
              soni :
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
              Rasm:
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
            {isUploading && <p>Yuklanmoqda...</p>}
            <button
              type="submit" // Changed to type="submit"
              className="btn btn-primary mb-5 col-3 me-1"
              disabled={isUploading}
            >
              <AiOutlineSave /> Saqlash
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default editProduct;
