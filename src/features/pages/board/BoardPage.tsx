import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useBoardStore from "../../../store/useBoardStore";
import useAuthStore from "../../../store/useAuthStore";

const PAGE_SIZE = 10;

const BoardPage = () => {
  const boards = useBoardStore((state) => state.boards);
  const initialized = useBoardStore((state) => state.initialized);
  const loadBoards = useBoardStore((state) => state.loadBoards);
  const deleteBoards = useBoardStore((state) => state.deleteBoards);
  const user = useAuthStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    loadBoards().catch((err) =>
      console.error("게시판 데이터 로딩 실패:", err)
    );
  }, [loadBoards]);

  const totalPages = Math.ceil(boards.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentItems = boards.slice(startIndex, startIndex + PAGE_SIZE);

  const isAllSelected =
    currentItems.length > 0 &&
    currentItems.every((item) => selectedIds.has(item.id));

  const handleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (isAllSelected) {
        currentItems.forEach((item) => next.delete(item.id));
      } else {
        currentItems.forEach((item) => next.add(item.id));
      }
      return next;
    });
  };

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDelete = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    if (selectedIds.size === 0) {
      alert("삭제할 글을 선택하세요.");
      return;
    }
    if (!confirm("정말 선택한 글들을 삭제하시겠습니까?")) return;

    deleteBoards([...selectedIds]);
    setSelectedIds(new Set());

    const newTotalPages = Math.ceil(
      (boards.length - selectedIds.size) / PAGE_SIZE
    );
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F5F6FA]">
        <p className="text-[#1B2A4A] text-lg font-[Inter]">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 min-h-full bg-[#F5F6FA] px-20 py-10">
      {/* 제목 */}
      <h1 className="text-[28px] font-bold text-[#1B2A4A] font-[Inter] m-0">
        사용자 게시판
      </h1>

      {/* 액션 버튼 */}
      <div className="flex justify-end gap-2.5">
        <button
          onClick={() => navigate("/board/write")}
          className="flex items-center justify-center h-[38px] px-5 rounded-lg bg-[#2563EB] text-white text-sm font-semibold font-[Inter] cursor-pointer hover:opacity-90 transition-opacity border-none"
        >
          글쓰기
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center h-[38px] px-5 rounded-lg bg-[#DC2626] text-white text-sm font-semibold font-[Inter] cursor-pointer hover:opacity-90 transition-opacity border-none"
        >
          삭제
        </button>
      </div>

      {/* 테이블 */}
      <div
        className="flex flex-col rounded-xl bg-white overflow-hidden"
        style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" }}
      >
        {/* 테이블 헤더 */}
        <div className="flex items-center h-12 bg-[#1B2A4A] px-5">
          <div className="flex items-center justify-center w-12 h-12">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              className="w-4 h-4 cursor-pointer accent-[#2563EB]"
            />
          </div>
          <span className="w-[60px] text-white text-[13px] font-semibold font-[Inter]">
            번호
          </span>
          <span className="flex-1 text-white text-[13px] font-semibold font-[Inter]">
            제목
          </span>
          <span className="w-[100px] text-center text-white text-[13px] font-semibold font-[Inter]">
            작성자
          </span>
          <span className="w-[80px] text-center text-white text-[13px] font-semibold font-[Inter]">
            조회수
          </span>
          <span className="w-[110px] text-center text-white text-[13px] font-semibold font-[Inter]">
            작성일
          </span>
        </div>

        {/* 테이블 행 */}
        {currentItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center h-12 px-5 border-b border-[#E8EBF0] ${
              index % 2 === 0 ? "bg-[#F8F9FC]" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12">
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() => handleSelect(item.id)}
                className="w-4 h-4 cursor-pointer accent-[#2563EB]"
              />
            </div>
            <span className="w-[60px] text-[#6B7280] text-[13px] font-[Inter]">
              {item.id}
            </span>
            <span className="flex-1 text-[#1B2A4A] text-[13px] font-medium font-[Inter] truncate">
              {item.title}
            </span>
            <span className="w-[100px] text-center text-[#6B7280] text-[13px] font-[Inter]">
              {item.author}
            </span>
            <span className="w-[80px] text-center text-[#6B7280] text-[13px] font-[Inter]">
              {item.views}
            </span>
            <span className="w-[110px] text-center text-[#6B7280] text-[13px] font-[Inter]">
              {item.createdAt}
            </span>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#D0D5DD] bg-white text-[#6B7280] text-sm font-medium font-[Inter] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-[Inter] cursor-pointer transition-colors border ${
              page === currentPage
                ? "bg-[#1B2A4A] text-white font-semibold border-[#1B2A4A]"
                : "bg-white text-[#6B7280] font-medium border-[#D0D5DD] hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#D0D5DD] bg-white text-[#6B7280] text-sm font-medium font-[Inter] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default BoardPage;
