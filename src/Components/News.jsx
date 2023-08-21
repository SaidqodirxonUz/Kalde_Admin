import React from "react";
import PlaceholderCards from "./PlaceholderCards";
import NewsCards from "./NewsCards";
import useNews from "../Hooks/useNews";

const News = () => {
  const [news, loading] = useNews();

  return (
    <div className="container py-3">
      {loading ? <PlaceholderCards /> : <NewsCards news={news} />}
    </div>
  );
};

export default News;
