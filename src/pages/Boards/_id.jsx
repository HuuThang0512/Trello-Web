// Board ID
import Container from "@mui/material/Container"
import AppBar from "~/components/AppBar"
import BoardBar from "./BoardBar"
import BoardContent from "./BoardContent"
const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar></AppBar>
      <BoardBar></BoardBar>
      <BoardContent></BoardContent>
    </Container>
  )
}

export default Board
