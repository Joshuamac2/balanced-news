import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// Mock the global fetch function
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          articles: [
            { author: "Alice" },
            { author: "Bob" },
            { author: "Charlie" },
            { author: "Diana" },
            { author: "Eve" },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders authors from fetched articles", async () => {
  render(<App />);

  // Wait for authors to appear in the DOM
  await waitFor(() => {
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText("Diana")).toBeInTheDocument();
    expect(screen.getByText("Eve")).toBeInTheDocument();
  });
});

test("renders fallback text if no articles are available", async () => {
  // Override fetch to return empty
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );

  render(<App />);
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
});
