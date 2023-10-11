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

    location: "",

    phone_number: "",
    // addition_number: "",
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function fetchCategoriesDetails() {
      try {
        const response = await axios.get(`/dealers/${id}`);
        console.log(response.data.data, "res");
        console.log(response.data.data[0].title_uz, "title bu ");
        const dealerData = {
          title_uz: response.data.data[0].title_uz,
          title_ru: response.data.data[0].title_ru,
          title_en: response.data.data[0].title_en,
          desc_uz: response.data.data[0].desc_uz,
          desc_ru: response.data.data[0].desc_ru,
          desc_en: response.data.data[0].desc_en,

          location: response.data.data[0].location,

          phone_number: response.data.data[0].phone_number,
          addition_number: response.data.data[0].addition_number, // xato berishi mumkin
        };
        console.log(dealerData);

        console.log(dealerData.title_uz, "title uz");

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

    try {
      setIsUploading(true);

      const response = await axios.patch(`/dealers/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      toast.success("Успешно изменено");
      navigate("/dealers");
    } catch (error) {
      console.log("Error:", error);

      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
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
            <label htmlFor="addition_number" className="form-label">
              Дополнительный номер телефона
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
    </>
  );
};

export default EditDealers;
