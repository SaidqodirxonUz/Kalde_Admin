import React from "react";
import PlaceholderCards from "./PlaceholderCards";
import NewsCards from "./NewsCards";
import useNews from "../Hooks/useNews";
import DealerCards from "./DealerCards";

const DealersList = () => {
  const [news, loading] = useNews();

  return (
    <div className="container py-3">
      {loading ? <PlaceholderCards /> : <DealerCards news={news} />}
    </div>
  );
};

export default DealersList;
