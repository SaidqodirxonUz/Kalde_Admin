import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillEdit,
  AiFillEye,
  AiFillDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import useDealers from "../Hooks/useDealers";

const DealerCards = () => {
  const [dealers, loading, deleteDealers] = useDealers();

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Вы уверены, что хотите удалить эту дилер?")) {
        await deleteDealers(id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(loading);
  if (loading) {
    return <div>Загрузка ...</div>;
  }
  console.log(dealers, "validation dan oldin");
  if (!dealers || !Array.isArray(dealers) || dealers.length === 0) {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h2>дилеры пока нет</h2>
          <Link to={`/createDealers`} className="btn btn-primary col-2 me-1">
            <AiOutlinePlus /> Добавить дилер
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      <div className="d-flex justify-content-between">
        <h2>Дилеры</h2>
        <Link to={`/createDealers`} className="btn btn-primary col-2 me-1">
          <AiOutlinePlus />
          Добавить Дилер
        </Link>
      </div>
      {dealers.map((Dealers) => (
        <div key={Dealers.id} className="col-md-6 col-lg-3">
          <div className="card overflow-hidden" aria-hidden="true">
            <div className="card-body">
              <p className="card-text">
                ID :{Dealers.id}
                <span className="d-flex justify-content-between align-items-center">
                  <span className="text-danger">Имя : {Dealers.title_ru}</span>
                </span>
              </p>
              <div className="d-flex g-3">
                <Link
                  to={`/editDealers/${Dealers.id}`}
                  className="btn btn-warning col-4 me-1"
                >
                  <AiFillEdit />
                </Link>
                <Link
                  to={`/dealers/${Dealers.id}`}
                  className="btn btn-primary col-4 me-1"
                >
                  <AiFillEye />
                </Link>
                <button
                  onClick={() => {
                    handleDelete(Dealers.id);
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

export default DealerCards;
