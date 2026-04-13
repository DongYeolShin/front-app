import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../../store/useAuthStore";

const MOCK_USER = {
  id: "admin",
  password: "admin",
  name: "김철수",
};

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = () => {
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (id !== MOCK_USER.id || password !== MOCK_USER.password) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      return;
    }

    setUser({ id: MOCK_USER.id, name: MOCK_USER.name });
    navigate("/");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleSignup = () => {
    console.log("회원가입 이동");
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F0F2F5]">
      <div
        className="flex flex-col items-center gap-7 w-[328px] rounded-3xl px-10 pt-12 pb-10"
        style={{
          backgroundColor: "#0a1628",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* 로고 영역 */}
        <div className="flex flex-col items-center gap-5">
          <div className="w-[160px] h-[50px] bg-[#0a1628] rounded flex items-center justify-center">
            <span className="text-white text-lg font-bold tracking-wide">
              NOVATECH
            </span>
          </div>
        </div>

        {/* 아이디 입력 */}
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-12 rounded-[10px] border border-[#2a3a5a] bg-white px-4 text-sm text-gray-700 placeholder-[#999999] outline-none font-[Inter]"
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-12 rounded-[10px] border border-[#2a3a5a] bg-white px-4 text-sm text-gray-700 placeholder-[#999999] outline-none font-[Inter]"
        />

        {/* 버튼 영역 */}
        <div className="flex w-full gap-3">
          <button
            onClick={handleLogin}
            className="flex-1 h-12 rounded-[10px] bg-[#1a3a6b] text-white text-[15px] font-semibold cursor-pointer hover:opacity-90 transition-opacity font-[Inter] border-none"
          >
            로그인
          </button>
          <button
            onClick={handleSignup}
            className="flex-1 h-12 rounded-[10px] bg-[#7c5cbf] text-white text-[15px] font-semibold cursor-pointer hover:opacity-90 transition-opacity font-[Inter] border-none"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
