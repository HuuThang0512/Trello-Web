// Board ID
import Container from "@mui/material/Container"
import AppBar from "~/components/AppBar/AppBar"
import BoardBar from "./BoardBar/BoardBar"
import BoardContent from "./BoardContent/BoardContent"
import { useEffect, useState } from "react"
import { fetchBoardDetailsAPI } from "~/apis"
import { mockData } from "~/apis/mock-data"

const Board = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = "68485b42d05c54f72e09b833"
    fetchBoardDetailsAPI(boardId).then((b) => {
      setBoard(b)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar></AppBar>
      {board && <BoardBar board={mockData.board}></BoardBar>}
      {board && <BoardContent board={mockData.board}></BoardContent>}
    </Container>
  )
}

export default Board
