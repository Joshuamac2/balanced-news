# News Bias Display Project

A React and Node.js app that shows news articles across various topics (Headlines, World, UK, etc.) — highlighting differences between left-wing and right-wing media coverage using the [NewsAPI](https://newsapi.org/).

![Screenshot 2025-07-06 at 20-47-16 React App](https://github.com/user-attachments/assets/551d8068-a464-4b9c-a96f-a159bd9b396a)


## Features

- Fetch news articles by topic using query strings
- Separate and display news from left-leaning and right-leaning sources
- Tab navigation to switch between news categories
- Built with React, Material-UI (frontend), and Express (backend)

## Setup Instructions

1. **Get your API key:**

   Go to [NewsAPI](https://newsapi.org/) and sign up for a free API key.

2. **Create environment variables:**

   In both your frontend and backend project folders, create a `.env` file:

   - **Frontend `.env`:**

     ```env
     REACT_APP_NEWS_API_KEY= // your api key here
     REACT_APP_NEWS_API_URL=https://newsapi.org/v2/top-headlines
     REACT_APP_API_BASE_URL= // your backend address e.g localhost:3001

     ```

   - **Backend `.env`:**

     ```env
     NEWS_API_KEY= // your api key here
     ```

3. **Run the backend server:**

   ```bash
   cd backend
   npm install
   npm start
