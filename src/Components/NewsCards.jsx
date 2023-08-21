import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillEdit,
  AiFillEye,
  AiFillDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import useNews from "../Hooks/useNews"; // useNews faylini to'g'ri joyga o'rnating

const NewsCards = () => {
  const [news, loading, deleteNews] = useNews();

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Вы уверены, что хотите удалить эту Новости?")) {
        await deleteNews(id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(loading);
  if (loading) {
    return <div>Загрузка ...</div>;
  }
  if (!news || !Array.isArray(news) || news.length === 0) {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h2>Новости пока нет</h2>
          <Link to={`/createNews`} className="btn btn-primary col-2 me-1">
            <AiOutlinePlus /> Добавить Новости
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      <div className="d-flex justify-content-between">
        <h2>Новости</h2>
        <Link to={`/createNews`} className="btn btn-primary col-2 me-1">
          <AiOutlinePlus />
          Добавить Новости
        </Link>
      </div>
      {news.map((News) => (
        <div key={News.id} className="col-md-6 col-lg-3">
          <div className="card overflow-hidden" aria-hidden="true">
            <img
              src={News.image_url}
              alt={News.image_url}
              className="card-image-top placeholder-card-image"
            />
            <div className="card-body">
              <p className="card-text">
                ID :{News.id}
                <span className="d-flex justify-content-between align-items-center">
                  <span className="text-danger">Имя : {News.title_ru}</span>
                </span>
              </p>
              <div className="d-flex g-3">
                <Link
                  to={`/editNews/${News.id}`}
                  className="btn btn-warning col-4 me-1"
                >
                  <AiFillEdit />
                </Link>
                <Link
                  to={`/news/${News.id}`}
                  className="btn btn-primary col-4 me-1"
                >
                  <AiFillEye />
                </Link>
                <button
                  onClick={() => {
                    handleDelete(News.id);
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

export default NewsCards;
