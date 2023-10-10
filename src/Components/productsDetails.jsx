import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "./Footer";
import axios from "axios";

const More = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize as null

  useEffect(() => {
    fetch(`https://back.kalde.uz/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    // Loading state
    return (
      <>
        <Header />
        <div className="container text-center">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-3 mb-5">
          <div className="col-12 h-100 pt-5">
            <div className="card overflow-hidden" aria-hidden="true">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src={product?.img_url}
                  className="placeholder-card-image d-flex align-items-center justify-content-center card-image-top bg-light"
                />
                <img
                  src={product?.img1_url}
                  className="placeholder-card-image d-flex align-items-center justify-content-center card-image-top bg-light"
                />
              </div>

              <div className="card-body">
                <h3 className="card-title text-truncate">
                  Имя : {product.ru_product_name}
                </h3>
                <div className="card-text">
                  <h5 className="product-description my-3">
                    {product.ru_desc == "undefined" ? "" : product?.ru_desc}
                  </h5>
                </div>
              </div>
            </div>

            <Link
              to={"/"}
              className="btn btn-primary w-25 d-flex justify-content-center m-auto fs-6 mt-5"
            >
              <i className="fa-solid fa-arrow-left d-flex justify-content-center m-1"></i>{" "}
              назад
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default More;
