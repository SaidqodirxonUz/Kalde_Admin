import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillEdit,
  AiFillEye,
  AiFillDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import useCategories from "../Hooks/useCategories"; // useCategories faylini to'g'ri joyga o'rnating

const CategoriesCards = () => {
  const [categories, loading, deletecategories] = useCategories();

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Вы уверены, что хотите удалить эту категорию?")) {
        await deletecategories(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Загрузка ...</div>;
  }

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <div>
        {" "}
        <div className="d-flex justify-content-between">
          <h2>Категория пока нет</h2>
          <Link to={`/createCategory`} className="btn btn-primary col-2 me-1">
            <AiOutlinePlus /> Добавить
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      <div className="d-flex justify-content-between">
        <h2>Категория</h2>
        <Link to={`/createCategory`} className="btn btn-primary col-2 me-1">
          <AiOutlinePlus /> Добавить
        </Link>
      </div>
      {categories.map((categories) => (
        <div key={categories.id} className="col-md-6 col-lg-3">
          <div className="card overflow-hidden" aria-hidden="true">
            <img
              src={categories.image_url}
              alt={categories.image_url}
              className="card-image-top placeholder-card-image"
            />
            <div className="card-body">
              <p className="card-text">
                ID :{categories.id}
                <span className="d-flex justify-content-between align-items-center">
                  <span className="text-danger">
                    Имя : {categories.ru_category_name}
                  </span>
                </span>
              </p>
              <div className="d-flex g-3">
                <Link
                  to={`/editCategories/${categories.id}`}
                  className="btn btn-warning col-4 me-1"
                >
                  <AiFillEdit />
                </Link>
                <Link
                  to={`/categories/${categories.id}`}
                  className="btn btn-primary col-4 me-1"
                >
                  <AiFillEye />
                </Link>{" "}
                <button
                  onClick={() => {
                    handleDelete(categories.id);
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

export default CategoriesCards;

// let newArr = categories.filter((e) => {
//   if ((e.id = categories.id)) {
//     return categories;
//   }
// }

// );
// setcategories(newArr);
