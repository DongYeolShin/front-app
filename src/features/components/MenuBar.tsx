import { NavLink, useNavigate } from "react-router";
import useAuthStore from "../../store/useAuthStore";

const MenuBar = () => {
  const user = useAuthStore((state) => state.user);
  const deleteUser = useAuthStore((state) => state.deleteUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteUser();
    navigate("/");
  };

  return (
    <nav className="flex items-center h-[70px] bg-black px-10 gap-8">
      <div className="flex items-center gap-8 flex-1">
        <NavLink
          to="/board"
          className={({ isActive }) =>
            `text-base font-medium font-[Inter] no-underline ${isActive ? "text-white" : "text-gray-400 hover:text-white"} transition-colors`
          }
        >
          게시판
        </NavLink>
        <NavLink
          to="/members"
          className={({ isActive }) =>
            `text-base font-medium font-[Inter] no-underline ${isActive ? "text-white" : "text-gray-400 hover:text-white"} transition-colors`
          }
        >
          회원정보
        </NavLink>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-white text-sm font-[Inter]">
            {user.name}님
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center h-[38px] px-6 rounded-lg bg-[#1a3a6b] text-white text-sm font-semibold font-[Inter] cursor-pointer hover:opacity-90 transition-opacity border-none"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <NavLink
          to="/login"
          className="flex items-center justify-center h-[38px] px-6 rounded-lg bg-[#1a3a6b] text-white text-sm font-semibold font-[Inter] no-underline hover:opacity-90 transition-opacity"
        >
          로그인
        </NavLink>
      )}
    </nav>
  );
};

export default MenuBar;
