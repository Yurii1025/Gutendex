import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import Category from "./pages/Category.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Favorites from "./pages/Favorites.jsx";


// Configure application routes
const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />, //App is a layout component.
                      //It uses <Outlet /> inside, which renders its children.
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
        path: "/category/:name", //dynamic params
        element: <Category />,
      },
      {
        path: "/book/:id",       //dynamic params
        element: <BookDetails />,
      },
    ],
  },
],
// Required for GitHub Pages deployment
{basename: "/Gutendex/",}
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
