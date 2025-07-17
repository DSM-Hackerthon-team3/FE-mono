import { createBrowserRouter } from "react-router-dom";
import { MainPage, LoginPage, RegisterPage } from "@/pages";
import { AppLayout } from "./layout/AppLayout";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login/student",
        element: <LoginPage />,
      },
      {
        path: "/login/employee",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <MainPage />,
      },
      {
        path: "/register/student",
        element: <RegisterPage />,
      },
      {
        path: "/register/employee",
        element: <RegisterPage />,
      },
    ],
  },
]);