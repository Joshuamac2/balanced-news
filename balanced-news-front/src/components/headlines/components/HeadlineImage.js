import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CircleIcon from "@mui/icons-material/Circle";

function HeadlineImage({ data, color }) {
  const article = data?.[0];

  if (!article) return null;

  return (
    <Box
      sx={{
        overflow: "hidden",
        bgcolor: "background.paper",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", height: 200, overflow: "hidden" }}>
        <LazyLoadImage
          src={article.urlToImage}
          alt={article.title}
          effect="blur"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      <Box sx={{ p: 0, flex: 1 }}>
        <Typography variant="h6" fontWeight="bold" align="left" sx={{ mb: 1 }}>
          {article.title}
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
            size="small"
          />
          <Box sx={{ display: "flex", alignItems: "center", fontSize: 14 }}>
            <CircleIcon sx={{ fontSize: 8, mr: 0.5 }} />
            {new Date(article.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeadlineImage;
