import axios from "axios"
import { API_ROOT } from "~/utils/constants"
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // axios trả về dữ liệu qua property của nó là data
  return response.data
}
