import React from "react";
import { Box, Typography, Chip } from "@mui/material";

function HeadlinesArticles({ data, color }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {data?.slice(0, 4).map((article, index) => (
        <Box key={index}>
          <Typography variant="subtitle1" fontWeight="bold">
            {article.title.length > 60
              ? article.title.slice(0, 60) + "..."
              : article.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              flexWrap: "wrap",
              mt: 0.5,
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
      ))}
    </Box>
  );
}

export default HeadlinesArticles;
