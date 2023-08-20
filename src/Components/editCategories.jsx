import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";

const EditCategories = () => {
  let { id } = useParams();

  const [formData, setFormData] = useState({
    uz_category_name: "",
    ru_category_name: "",
    en_category_name: "",
    image: null,
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

  useEffect(() => {
    async function fetchCategoriesDetails() {
      try {
        const response = await axios.get(`/categories/${id}`);
        const categoriesData = response.data.data;
        setFormData(categoriesData);
        toast.success("Успешно");
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    }

    if (id) {
      fetchCategoriesDetails();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
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
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error updating category:", error);

      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
      }

      toast("An error occurred while updating the category.", {
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
          <h2>Edit {id} Category</h2>
          <Link to={`/products`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Hamma Categorylar
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Nomi (Uzbek):
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
              Nomi (Russian):
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
              Nomi (English):
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
              Rasm:
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

export default EditCategories;
