import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootPage from './components/RootPage.jsx'
import ShopPage from './components/Shop.jsx'
import HomePage from './components/HomePage.jsx'
import CartPage from './components/ShopCart.jsx'
import ProductPage from './components/ProductPage.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import './styles/index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "product/:name",
        element: <ProductPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
