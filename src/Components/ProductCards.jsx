import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillEdit,
  AiFillEye,
  AiFillDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import useProducts from "../Hooks/useProducts"; // useHooks faylini to'g'ri joyga o'rnating

const ProductCards = () => {
  const [products, loading, deleteProduct] = useProducts();

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Вы уверены, что хотите удалить это?")) {
        await deleteProduct(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Загрузка ...</div>;
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div>
        {" "}
        <div className="d-flex justify-content-between">
          <h2>Товаров пока нет</h2>
          <Link to={`/createProduct`} className="btn btn-primary col-2 me-1">
            <AiOutlinePlus /> Добавить
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      <div className="d-flex justify-content-between">
        <h2>Товаров</h2>
        <Link to={`/createProduct`} className="btn btn-primary col-2 me-1">
          <AiOutlinePlus /> Добавить
        </Link>
      </div>
      {products.map((product) => (
        <div key={product.id} className="col-md-6 col-lg-3">
          <div className="card overflow-hidden" aria-hidden="true">
            <img
              src={product.img_url}
              alt={product.title_ru}
              className="card-image-top placeholder-card-image"
            />
            <div className="card-body">
              <h5 className="card-title text-truncate">{product.title_ru}</h5>
              <p className="card-text">
                <span className="d-flex justify-content-between align-items-center">
                  <span className="text-danger">
                    Имя :{" "}
                    {
                      product.ru_product_name // Nom
                    }
                  </span>
                </span>
              </p>
              <div className="d-flex g-3">
                <Link
                  to={`/editProduct/${product.id}`}
                  className="btn btn-warning col-4 me-1"
                >
                  <AiFillEdit />
                </Link>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary col-4 me-1"
                >
                  <AiFillEye />
                </Link>{" "}
                <button
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                  className="btn btn-danger col-4 me-1"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;

// let newArr = products.filter((e) => {
//   if ((e.id = product.id)) {
//     return product;
//   }
// }

// );
// setProducts(newArr);
