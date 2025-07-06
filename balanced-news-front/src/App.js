import React from "react";
import Container from "@mui/material/Container";

import HeadlinesMain from "./components/headlines/HeadlinesMain";
import TopicsMain from "./components/topics/TopicsMain";

function App() {
  return (
    <Container maxWidth="xl">
      <div>
        <HeadlinesMain />
      </div>
      <div>
        <TopicsMain />
      </div>
    </Container>
  );
}

export default App;
