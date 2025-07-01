// Board ID
import Container from "@mui/material/Container"
import AppBar from "~/components/AppBar/AppBar"
import BoardBar from "./BoardBar/BoardBar"
import BoardContent from "./BoardContent/BoardContent"
import { useEffect, useState } from "react"
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from "~/apis"
import { generatePlaceholderCard } from "~/utils/formatters"
import { isEmpty } from "lodash"
// import BoardSidebar from "./BoardSidebar"

const Board = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = "68485b42d05c54f72e09b833"
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column._id)]
          column.cardOrderIds = [column.cards[0]._id]
        }
      })
      setBoard(board)
    })
  }, [])

  /**Function này gọi API tạo mới column và set lại dữ liệu state board  */
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    })

    // Set card placeholder để xử lí trường hợp column rỗng thì sẽ không kéo card khác vào được
    createdColumn.cards = [generatePlaceholderCard(createdColumn._id)]
    createdColumn.cardOrderIds = [createdColumn.cards[0]._id]
    // Set lại board, thêm column mới vào cuối và thêm id của column đó vào cuối của columnOrderIds
    setBoard({
      ...board,
      columns: [...board.columns, createdColumn],
      columnOrderIds: [...board.columnOrderIds, createdColumn._id]
    })
  }

  /**Function này gọi API tạo mới card và set lại dữ liệu state board  */
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    })
    setBoard({
      ...board,
      columns: board.columns.map((column) => {
        if (column._id === newCardData.columnId) {
          return { ...column, cards: [...column.cards, createdCard], cardOrderIds: [...column.cardOrderIds, createdCard._id] }
        }
        return column
      }),
    })
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar></AppBar>
      {board && <BoardBar board={board}></BoardBar>}
      {board && <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard}></BoardContent>}
      {/* <BoardSidebar></BoardSidebar> */}
    </Container>
  )
}

export default Board
