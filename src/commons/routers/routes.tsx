import LoginPage from "../../features/pages/login/LoginPage";
import MainPage from "../../features/pages/main/MainPage";
import BoardPage from "../../features/pages/board/BoardPage";
import BoardWritePage from "../../features/pages/board/BoardWritePage";
import MainLayout from "../../features/components/MainLayout";
import ProtectedRoute from "../../features/components/ProtectedRoute";

const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/board",
        element: <BoardPage />,
      },
      {
        path: "/board/write",
        element: (
          <ProtectedRoute>
            <BoardWritePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default routes;
