import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages";
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
    ],
  },
]);