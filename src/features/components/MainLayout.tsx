import { Outlet } from "react-router";
import MenuBar from "./MenuBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MenuBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
