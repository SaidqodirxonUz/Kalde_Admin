import React from "react";
import useHooks from "../Hooks/useProducts";
import More from "../Components/productsDetails";
import LoadMore from "../Components/LoadMore";

const MoreInfo = () => {
  const [products, loading] = useHooks();

  return (
    <>
      <div className="cardsArea">
        {loading ? <LoadMore /> : <More product={products} />}
      </div>
    </>
  );
};

export default MoreInfo;
