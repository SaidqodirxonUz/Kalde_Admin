import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    full_name: "",
    phone_number: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button disabled state

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) navigate("/");
  }, []);

  // let headers = { "Access-Control-Allow-Origin": "*" };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true); // Set isSubmitting to true when submitting the form

      // let res = await axios.post(
      //   "https://kalde.victoriaslove.uz/login",
      //   headers,
      //   values
      // );

      let res = await axios.post("/login", values);

      if (res.status === 200) {
        toast("Войти успешно", { type: "success" });
        setValues({ full_name: "", phone_number: "", password: "" }); // Clear input values
        localStorage.setItem("token", res.data.token); // Save token to localStorage
        navigate("/");
      }
    } catch (error) {
      if (error.message === "Network Error") {
        toast("проблема с интернетом", { type: "warning" });
      } else {
        toast("Введенная информация неверна", { type: "error" });
      }

      console.log(error.message);
    } finally {
      setIsSubmitting(false); // Reset isSubmitting to false after request completes
    }
  }

  function handleChange(e) {
    setValues((oldValues) => {
      return {
        ...oldValues,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className="min-vh-100 text-bg-light d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="bg-white border w-50 p-3">
        {/* ... (your form content) */}
        <div className="my-3">
          <label className="form-label" htmlFor="full_name">
            Имя (обязательно)
          </label>
          <input
            className="form-control"
            type="text"
            name="full_name"
            id="full_name"
            value={values.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="phone_number">
            Номер телефона (обязательно)
          </label>
          <input
            className="form-control"
            type="text"
            name="phone_number"
            id="phone_number"
            value={values.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-3">
          <label className="form-label" htmlFor="password">
            Пароль для входа (обязательно)
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            required
            // min={4}
          />
        </div>
        <div className="mt-3">
          <button
            disabled={
              !values.full_name ||
              !values.phone_number ||
              values.password.length < 4 ||
              isSubmitting // Disable the button while submitting
            }
            className="btn btn-primary d-block w-100 fs-4"
          >
            {isSubmitting ? "Вход..." : "Входить"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
