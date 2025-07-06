import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import TopicsCard from "./components/TopicsCard";
import TabContentWrapper from "./components/TabContentWrapper";
import sourcePoliticalStance from "../sources/sourcePoliticalStance";

function TopicsTab() {
  const [topic, setTopic] = React.useState("world");
  const [newsData, setNewsData] = React.useState({ left: [], right: [] });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({ category: topic });
        const response = await fetch(`${API_BASE_URL}/news?${query}`);

        const data = await response.json();

        const articles = data?.data?.articles || [];

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

        setNewsData({
          left: leftArticles,
          right: rightArticles,
        });
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topic]);

  const handleChange = (event, newValue) => {
    setTopic(newValue);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "10px" }}>
      <h1
        style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Also in the news
      </h1>

      <Box
        sx={{
          typography: "body1",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
        }}
      >
        <TabContext value={topic}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              mx: 2,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="news category tabs"
              sx={{
                ".MuiTabs-flexContainer": {
                  gap: 7,
                },
                ".MuiTab-root": {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  padding: "12px 20px",
                  borderRadius: "8px 8px 0 0",
                  backgroundColor: "white",
                  color: "black",
                },
                ".Mui-selected": {
                  backgroundColor: "black",
                  color: "white !important",
                },
              }}
            >
              <Tab label="World" value="world" />
              <Tab label="United Kingdom" value="uk" />
              <Tab label="Entertainment" value="entertainment" />
              <Tab label="Business" value="business" />
              <Tab label="Sports" value="sports" />
            </TabList>
          </Box>

          {["world", "uk", "entertainment", "business", "sports"].map((tab) => (
            <TabPanel key={tab} value={tab}>
              <TabContentWrapper
                left={<TopicsCard newsData={newsData.left} color="primary" />}
                right={<TopicsCard newsData={newsData.right} color="error" />}
              />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </div>
  );
}

export default TopicsTab;
