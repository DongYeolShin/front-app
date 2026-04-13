import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../../store/useAuthStore";
import useBoardStore from "../../../store/useBoardStore";

const BoardWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const addBoard = useBoardStore((state) => state.addBoard);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    addBoard({ title: title.trim(), author: user?.name ?? "" });
    alert("게시글이 등록되었습니다.");
    navigate("/board");
  };

  return (
    <div className="flex flex-col gap-6 min-h-full bg-[#F5F6FA] px-20 py-10">
      <h1 className="text-[28px] font-bold text-[#1B2A4A] font-[Inter] m-0">
        게시글 작성
      </h1>

      <div
        className="flex flex-col gap-5 rounded-xl bg-white p-8"
        style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" }}
      >
        {/* 작성자 */}
        <div className="flex items-center gap-3">
          <span className="w-[80px] text-sm font-semibold text-[#1B2A4A] font-[Inter]">
            작성자
          </span>
          <span className="text-sm text-[#6B7280] font-[Inter]">
            {user?.name}
          </span>
        </div>

        {/* 제목 */}
        <div className="flex items-center gap-3">
          <span className="w-[80px] text-sm font-semibold text-[#1B2A4A] font-[Inter]">
            제목
          </span>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 h-11 rounded-lg border border-[#D0D5DD] px-4 text-sm text-[#1B2A4A] placeholder-[#9CA3AF] outline-none font-[Inter] focus:border-[#2563EB] transition-colors"
          />
        </div>

        {/* 내용 */}
        <div className="flex gap-3">
          <span className="w-[80px] pt-2 text-sm font-semibold text-[#1B2A4A] font-[Inter]">
            내용
          </span>
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="flex-1 rounded-lg border border-[#D0D5DD] px-4 py-3 text-sm text-[#1B2A4A] placeholder-[#9CA3AF] outline-none font-[Inter] resize-none focus:border-[#2563EB] transition-colors"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2.5 pt-2">
          <button
            onClick={() => navigate("/board")}
            className="flex items-center justify-center h-[38px] px-5 rounded-lg border border-[#D0D5DD] bg-white text-[#6B7280] text-sm font-semibold font-[Inter] cursor-pointer hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center h-[38px] px-5 rounded-lg bg-[#2563EB] text-white text-sm font-semibold font-[Inter] cursor-pointer hover:opacity-90 transition-opacity border-none"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardWritePage;
