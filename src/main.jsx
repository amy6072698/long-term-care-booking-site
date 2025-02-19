import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import router from "./router/Index";
import 'bootstrap/dist/css/bootstrap.css';
import "./assets/scss/all.scss";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
