import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import { Layout } from "./views/Layout";
import NotFound from "./views/NotFound";
import LoginPage from "./views/login/LoginPage";
import RegisterPage from "./views/login/RegisterPage";
import CheckoutPassed from "./views/CheckoutPassed";
import CheckoutFailed from "./views/CheckoutFailed";
import LoginCompleted from "./views/login/LoginCompleted";
import LoginFailed from "./views/login/LoginFailed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true
      },
      {
        path: "/checkout-passed",
        element: <CheckoutPassed />,
      },
      {
        path: "/checkout-failed",
        element: <CheckoutFailed />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login-failed",
        element: <LoginFailed />,
      },
      {
        path: "/login-complete",
        element: <LoginCompleted />,
      },
    ],
  },
]);

export default router;