import LoginPage from "../../features/pages/login/LoginPage";
import MainPage from "../../features/pages/main/MainPage";

const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default routes;
