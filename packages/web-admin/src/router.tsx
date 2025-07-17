import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout";
import { BoardDetailPage, BoardPage, MainPage, MyInfoPage } from "@/page";

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
        path: "/board",
        children: [
          {
            index: true,
            element: <BoardPage />,
          },
          {
            path: ":id",
            element: <BoardDetailPage />,
          }
        ]
      },
      {
        path: "my-info",
        element: <MyInfoPage />,
      }
    ],
  },
]);