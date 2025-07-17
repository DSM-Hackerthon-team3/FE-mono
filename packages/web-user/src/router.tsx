import { createBrowserRouter } from "react-router-dom";
import { MainPage, MentoringDetailPage, CareerTestPage, CareerTestResultPage, BoardPage, BoardDetailPage, BoardWritePage, MyInfoPage, MentoringPage } from "@/page";
import { AppLayout } from "@/layout";

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
        path: "/career",
        children: [
          {
            index: true,
            element: <CareerTestPage />,
          },
          {
            path: "test",
            element: <CareerTestPage />,
          },
          {
            path: "result",
            element: <CareerTestResultPage />,
          },
        ],
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
          },
          {
            path: "write",
            element: <BoardWritePage />,
          },
        ]
      },
      {
        path: "mentoring",
        element: <MentoringPage />,
      },
      {
        path: "mentoring/:id/detail",
        element: <MentoringDetailPage />,
      },
      {
        path: "my-info",
        element: <MyInfoPage />,
      }
    ],
  },
]);