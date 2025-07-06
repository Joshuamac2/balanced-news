import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box, Typography, Chip } from "@mui/material";

function TopicsCard({ newsData, color }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {newsData?.slice(0, 5).map((article, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ flex: "1 1 35%" }}>
            <LazyLoadImage
              src={article.urlToImage}
              alt={article.title}
              effect="blur"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box sx={{ flex: "1 1 60%" }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {article.title.length > 80
                ? article.title.slice(0, 80) + "..."
                : article.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={article.source.name || "No source"}
                color={color}
                sx={{
                  fontWeight: "bold",
                }}
                size="small"
              />
              <Typography variant="caption" fontWeight="bold">
                •{" "}
                {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default TopicsCard;
