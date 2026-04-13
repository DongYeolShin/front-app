import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchBoardList, type BoardItem } from "../service/apis/boardApi";

const sortByIdDesc = (boards: BoardItem[]) =>
  [...boards].sort((a, b) => b.id - a.id);

interface BoardState {
  boards: BoardItem[];
  initialized: boolean;
  loadBoards: () => Promise<void>;
  addBoard: (board: Omit<BoardItem, "id" | "views" | "createdAt">) => void;
  deleteBoards: (ids: number[]) => void;
}

const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      boards: [],
      initialized: false,
      loadBoards: async () => {
        if (get().initialized) return;
        const data = await fetchBoardList();
        set({ boards: sortByIdDesc(data), initialized: true });
      },
      addBoard: (board) => {
        const { boards } = get();
        const maxId =
          boards.length > 0 ? Math.max(...boards.map((b) => b.id)) : 0;
        const today = new Date().toISOString().slice(0, 10);
        const newBoard: BoardItem = {
          id: maxId + 1,
          title: board.title,
          author: board.author,
          views: 0,
          createdAt: today,
        };
        set({ boards: [newBoard, ...boards] });
      },
      deleteBoards: (ids) => {
        const idSet = new Set(ids);
        set({ boards: get().boards.filter((b) => !idSet.has(b.id)) });
      },
    }),
    {
      name: "board-storage",
    }
  )
);

export default useBoardStore;
