import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "./Footer";
import axios from "axios";

const More = () => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => setProducts([res.data]));
    // .then((data) => setProducts(data.data));
    // fetch(`http://localhost:5000`)
  }, []);
  console.log(product);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-3 mb-5">
          {product.map((p, index) => (
            <div key={index} className="col-12 h-100 pt-5">
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
                    src={p.data?.img_url}
                    className="placeholder-card-image d-flex align-items-center justify-content-center card-image-top bg-light"
                  />
                  <img
                    src={p.data?.img1_url}
                    className="placeholder-card-image d-flex align-items-center justify-content-center card-image-top bg-light"
                  />
                </div>

                <div className="card-body">
                  <h3 className="card-title text-truncate">
                    Имя : {p.data.ru_product_name}
                  </h3>
                  <div className="card-text">
                    <h5 className="product-description my-3">
                      {p.data?.ru_desc}
                    </h5>
                    {/* <div className="col-6 d-flex justify-content-between">
                      <h6 className="fs-2">{p.data?.category}</h6>
                    </div> */}
                    {/* </div>  */}
                    {/* <div className="d-flex g-3 row">
                      <h6 className="text-danger fs-2">
                        Цена : {product.price}
                      </h6> */}

                    <div className="col-6"></div>
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
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default More;
