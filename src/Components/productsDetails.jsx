import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "./Footer";

const More = () => {
  const { id } = useParams();
  const [product, setProducts] = useState({});
  useEffect(() => {
    fetch(`https://api.kalde.uz/${id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-3 mb-5">
          {Array(1)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="col-12 h-100 pt-5">
                <div className="card overflow-hidden" aria-hidden="true">
                  <img
                    src={product.image_url}
                    className="placeholder-card-image d-flex align-items-center justify-content-center card-image-top bg-light"
                  />

                  <div className="card-body">
                    <h3 className="card-title text-truncate">
                      Имя : {product.ru_product_name}
                    </h3>
                    <div className="card-text">
                      <h5 className="product-description my-3">
                        Шитрикс код : {product.barcode}
                      </h5>
                    </div>
                    <div className="d-flex g-3 row">
                      <h6 className="text-danger fs-2">
                        Цена : {product.price}
                      </h6>
                      <div className="col-6 d-flex justify-content-between">
                        <h6 className="fs-2">{product.category}</h6>
                      </div>

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
