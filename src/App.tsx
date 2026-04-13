import { RouterProvider } from "react-router";
import router from "./commons/routers";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
