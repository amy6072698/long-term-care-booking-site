import { createHashRouter } from "react-router";
import FrontLayout from "../pages/FrontLayout";
import Home from "../pages/Home";
import AdminLayout from "../pages/AdminLayout";
import NotFound from "../pages/NotFound";
import ProductPage from "../pages/ProductPage";
import News from "../pages/News";
import Other from "../pages/Other";
import Cart from "../pages/Cart";

const router = createHashRouter([
  {
    // 前台路由
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "other",
        element: <Other />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    // 後台路由
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // 尚未設置後台霧遊
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
