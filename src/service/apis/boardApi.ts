import axios from "axios";

export interface BoardItem {
  id: number;
  title: string;
  author: string;
  views: number;
  createdAt: string;
}

const BASE_URL = "/assets/data";

export const fetchBoardList = async (): Promise<BoardItem[]> => {
  const response = await axios.get<BoardItem[]>(`${BASE_URL}/board.json`);
  return response.data;
};
