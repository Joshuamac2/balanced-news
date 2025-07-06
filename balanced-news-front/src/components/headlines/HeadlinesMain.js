import React, { useState, useEffect } from "react";

import HeadlinesCard from "./components/HeadlinesCard";
import sourcePoliticalStance from "../sources/sourcePoliticalStance";

function HeadlinesMain() {
  const [data, setData] = useState({ left: [], right: [] });

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const API_URL = process.env.REACT_APP_NEWS_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}?country=us&apiKey=${API_KEY}`);

        const data = await response.json();

        const articles = data?.articles || [];

        if (!articles || !Array.isArray(articles)) {
          throw new Error("No articles returned from API");
        }

        const filtered = articles.filter(
          (article) =>
            article.urlToImage &&
            article.title &&
            article.description &&
            article.publishedAt &&
            article.url &&
            article.source
        );

        const leftArticles = filtered.filter(
          (a) => sourcePoliticalStance[a.source.name] === "left"
        );
        const rightArticles = filtered.filter(
          (a) => sourcePoliticalStance[a.source.name] === "right"
        );
        setData({
          left: leftArticles,
          right: rightArticles,
        });
      } catch {
        throw new Error("failed");
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <h1
        style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Top Headlines
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          alignItems: "flex-start",
          flexWrap: "wrap",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <div style={{ flex: 1, minWidth: "400px" }}>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "bolder",
              color: "#1875D2",
              marginTop: "0px",
            }}
          >
            Headlines from the left
          </h2>
          <HeadlinesCard data={data.left} color="primary" />
        </div>

        <div style={{ flex: 1, minWidth: "400px" }}>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "red",
              marginTop: "0px",
            }}
          >
            Headlines from the right
          </h2>
          <HeadlinesCard data={data.right} color="error" />
        </div>
      </div>
    </div>
  );
}

export default HeadlinesMain;
