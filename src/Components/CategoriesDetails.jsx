import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const CategoriesDetails = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch(`http://localhost:6000/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data));
  }, [id]); // Include 'id' in the dependency array to re-fetch when id changes

  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-3 mb-5">
          <div className="col-12 h-100 pt-5">
            <div className="card overflow-hidden" aria-hidden="true">
              <img
                src={categories.image_url}
                className="placeholder-card-image d-flex align-items-center justify-content-center card-image-top bg-light"
                alt=""
              />

              <div className="card-body">
                <div className="card-text">
                  <h5 className="categories-description my-3">
                    ID : {categories.id}
                  </h5>
                </div>
                <h3 className="card-title text-truncate">
                  Имя : {categories.ru_category_name}
                </h3>

                <div className="d-flex g-3 row">
                  <h6 className="text-danger fs-2">
                    {/* narxi : {categories.price} */}
                  </h6>
                  <div className="col-6 d-flex justify-content-between">
                    {/* <h6 className="fs-2">{categories.category}</h6> */}
                  </div>
                  <div className="col-6"></div>
                </div>
              </div>
            </div>

            <Link
              to={"/categories"}
              className="btn btn-primary w-25 d-flex justify-content-center m-auto fs-6 mt-5"
            >
              <i className="fa-solid fa-arrow-left d-flex justify-content-center m-1"></i>{" "}
              назад
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoriesDetails;
