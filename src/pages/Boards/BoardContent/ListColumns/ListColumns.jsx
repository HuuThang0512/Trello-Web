import Box from "@mui/material/Box"
import Column from "./Column/Column"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import CloseIcon from "@mui/icons-material/Close"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import {SortableContext, horizontalListSortingStrategy} from "@dnd-kit/sortable"
import { useState } from "react"
import { toast } from "react-toastify"

const ListColumns = ({columns}) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
    setNewColumnTitle("")
  }
  const [newColumnTitle, setNewColumnTitle] = useState("")
  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error("Please enter a column title", {position: "bottom-right"})
      return
    }
    // Gọi API ỏ đây

    toggleNewColumnForm()
  }
  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          backgrondColor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        {columns?.map((column) => (
          <Column column={column} key={column._id} />
        ))}

        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
            onClick={toggleNewColumnForm}
          >
            <Button
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
              startIcon={<AddCircleIcon />}
            >
              Add New Column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              backgroundColor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter Column Title..."
              variant="outlined"
              size="small"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                "& label": {color: "white"},
                "& input": {color: "white"},
                "& label.Mui-focused": {color: "white"},
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {borderColor: "white"},
                  "&:hover fieldset": {borderColor: "white"},
                  "&.Mui-focused fieldset": {borderColor: "white"},
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={addNewColumn}
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": {bgColor: (theme) => theme.palette.success.main},
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                onClick={toggleNewColumnForm}
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {color: (theme) => theme.palette.warning.light},
                  // display: `${searchValue ? "block" : "none"}`,
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
