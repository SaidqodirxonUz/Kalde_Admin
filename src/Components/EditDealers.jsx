import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";

const EditDealers = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    title_uz: "",
    title_ru: "",
    title_en: "",
    desc_uz: "",
    desc_ru: "",
    desc_en: "",
    adress: "",
    location: "",
    email: "",
    orientation: "",
    work_at: "",
    phone_number: "",
    addition_number: "",
    // image: null,
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
    // console.log(event.target.files[0], "file");
    setImageFile(event.target.files[0]);
    console.log(imageFile);
  };

  useEffect(() => {
    async function fetchCategoriesDetails() {
      try {
        const response = await axios.get(`/dealers/${id}`);
        console.log(response.data.data, "res");
        const dealerData = {
          title_uz: response.data.data.title_uz,
          title_ru: response.data.data.title_ru,
          title_en: response.data.data.title_en,
          desc_uz: response.data.data.desc_uz,
          desc_ru: response.data.data.desc_ru,
          desc_en: response.data.data.desc_en,
          adress: response.data.data.adress,
          location: response.data.data.location,
          email: response.data.data.email,
          orientation: response.data.data.orientation,
          work_at: response.data.data.work_at,
          phone_number: response.data.data.phone_number,
        };
        console.log(dealerData);
        setFormData(dealerData);
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
    console.log(imageFile, "img");
    if (imageFile) {
      formDataWithImage.append("image", imageFile);
    }

    try {
      setIsUploading(true);

      const response = await axios.patch(`/dealers/${id}`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: localStorage.getItem("token"),
        },
      });

      toast.success("Успешно изменено");
      navigate("/dealers");
    } catch (error) {
      console.log("Error updating category:", error);

      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
      }
      if (error.response.data.error == "Unauthorized.") {
        toast("Пожалуйста, авторизоваться еще раз.", {
          type: "error",
        });
        navigate("/login");
      }

      toast("Что-то пошло не так. Пожалуйста, попробуйте еще раз.", {
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
          <h2>Pедактирование id:{id} дилер</h2>
          <Link to={`/dealers`} className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Все дилеры
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Заголовок (узбекский)
            </label>
            <input
              type="text"
              id="uz_category_name"
              name="title_uz"
              value={formData.title_uz}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_category_name" className="form-label">
              Заголовок (Русский)
            </label>
            <input
              type="text"
              id="ru_category_name"
              name="title_ru"
              value={formData.title_ru}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_category_name" className="form-label">
              Заголовок (Английский)
            </label>
            <input
              type="text"
              id="en_category_name"
              name="title_en"
              value={formData.title_en}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="uz_category_name" className="form-label">
              Oписание (узбекский)
            </label>
            <input
              type="text"
              id="uz_category_name"
              name="desc_uz"
              value={formData.desc_uz}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ru_category_name" className="form-label">
              Oписание (Русский)
            </label>
            <input
              type="text"
              id="ru_category_name"
              name="desc_ru"
              value={formData.desc_ru}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="en_category_name" className="form-label">
              Oписание (Английский)
            </label>
            <input
              type="text"
              id="en_category_name"
              name="desc_en"
              value={formData.desc_en}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adress" className="form-label">
              Адрес
            </label>
            <input
              type="text"
              id="adress"
              name="adress"
              value={formData.adress}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Расположение
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="orientation" className="form-label">
              Ориентация
            </label>
            <input
              type="text"
              id="orientation"
              name="orientation"
              value={formData.orientation}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="work_at" className="form-label">
              Рабочее время
            </label>
            <input
              type="text"
              id="work_at"
              name="work_at"
              value={formData.work_at}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g: 8:00-20:00"
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
              value={formData.phone}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Изображение
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
            {isUploading && <p>Загрузка...</p>}
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

export default EditDealers;
