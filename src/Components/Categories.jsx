import React from "react";
import useCategories from "../Hooks/useCategories";
import PlaceholderCards from "./PlaceholderCards";
import CategoriesCards from "./CategoryCards";

const Categories = () => {
  const [categories, loading] = useCategories();

  return (
    <div className="container py-3">
      {loading ? (
        <PlaceholderCards />
      ) : (
        <CategoriesCards categories={categories} />
      )}
    </div>
  );
};

export default Categories;
