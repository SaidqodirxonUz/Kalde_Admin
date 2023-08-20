import React from "react";

import useCategories from "../Hooks/useCategories";
import LoadMore from "../Components/LoadMore";
import CategoriesDetails from "../Components/CategoriesDetails";

const CategoryDetailsList = () => {
  const [categories, loading] = useCategories();

  return (
    <>
      <div className="cardsArea">
        {loading ? <LoadMore /> : <CategoriesDetails product={categories} />}
      </div>
    </>
  );
};

export default CategoryDetailsList;
