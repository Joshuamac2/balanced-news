require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

const apiKey = process.env.NEWS_API_KEY;

app.get("/news", async (req, res) => {
  const { category } = req.query;
  let url = "";

  try {
    switch (category) {
      case "uk":
        url = `https://newsapi.org/v2/top-headlines?sources=bbc-news,sky-news,the-guardian-uk,the-telegraph,independent`;
        break;
      case "world":
        url = `https://newsapi.org/v2/everything?q=world`;
        break;
      case "entertainment":
        url = `https://newsapi.org/v2/top-headlines?category=entertainment&country=us`;
        break;
      case "business":
        url = `https://newsapi.org/v2/top-headlines?category=business&country=us`;
        break;
      case "sports":
        url = `https://newsapi.org/v2/top-headlines?category=sports`;
        break;
      default:
        url = `https://newsapi.org/v2/top-headlines?`;
    }

    url += `&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Non-OK response:", response.status, errorText);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch news from source" });
    }

    const data = await response.json();
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
