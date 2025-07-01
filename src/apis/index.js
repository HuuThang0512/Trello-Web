import axios from "axios";
import { API_ROOT } from "~/utils/constants";

// Board
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  // axios trả về dữ liệu qua property của nó là data
  return response.data;
};

// Columns
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  // axios trả về dữ liệu qua property của nó là data
  return response.data;
};

// Cards
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  // axios trả về dữ liệu qua property của nó là data
  return response.data;
};
