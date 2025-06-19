import {useState} from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import ContentCut from "@mui/icons-material/ContentCut"
import ContentCopy from "@mui/icons-material/ContentCopy"
import ContentPaste from "@mui/icons-material/ContentPaste"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ArchiveIcon from "@mui/icons-material/Archive"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import AddCardIcon from "@mui/icons-material/AddCard"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import CloseIcon from "@mui/icons-material/Close"
import TextField from "@mui/material/TextField"
import ListCards from "./ListCards.jsx/ListCards"
import {mapOrder} from "~/utils/sorts"

import {useSortable} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"
import {toast} from "react-toastify"

const Column = ({column}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id: column._id, data: {...column}})

  const dndKitColumnStyle = {
    // touchAcion: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  }
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id")
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
  }
  const [newCardTitle, setNewCardTitle] = useState("")
  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error("Please enter a card title", {position: "bottom-right"})
      return
    }
    // Gọi API ỏ đây
    toggleNewCardForm()
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          backgroundColor: (theme) =>
            theme.palette.mode == "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{fontWeight: "bold", cursor: "pointer", fontSize: "1rem"}}
          >
            {column.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <KeyboardArrowDownIcon
                sx={{color: "text.primary", cursor: "pointer"}}
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <ArchiveIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Body */}
        <ListCards cards={orderedCards} />
        {/* Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            padding: 2,
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "space-between",
              }}
            >
              <Button onClick={toggleNewCardForm} startIcon={<AddCardIcon />}>
                Add new card
              </Button>
              <Tooltip sx={{cursor: "pointer"}} title="Drag to move">
                <DragHandleIcon />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                borderRadius: "6px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                label="Enter Card Title..."
                variant="outlined"
                size="small"
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  "& label": {color: "text.primary"},
                  "& input": {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "#333643" : "white",
                  },
                  "& label.Mui-focused": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    borderRadius: 1,
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
                  onClick={addNewCard}
                  data-no-dnd="true"
                  sx={{
                    boxShadow: "none",
                    border: "0.5px solid",
                    borderColor: (theme) => theme.palette.success.main,
                    "&:hover": {bgColor: (theme) => theme.palette.success.main},
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  onClick={toggleNewCardForm}
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
      </Box>
    </div>
  )
}

export default Column
