
import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react";
import ReactDom from "react-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import Category from "./pages/Category.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Favorites from "./pages/Favorites.jsx";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/category/:name",
        element: <Category />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
    ],
  },
],
{basename: "/Gutendex/",}
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
