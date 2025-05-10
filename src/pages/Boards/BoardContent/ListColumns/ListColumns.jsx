import Box from "@mui/material/Box"
import Column from "./Column/Column"
import Button from "@mui/material/Button"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import {
  SortableContext,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable"

const ListColumns = ({ columns }) => {
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
            m: 2
          }
        }}
      >
        {columns?.map((column) => (
          <Column column={column} key={column._id} />
        ))}

        <Box
          sx={{
            minWidth: "200px",
            maxWidth: "200px",
            mx: 2,
            borderRadius: "6px",
            height: "fit-content",
            backgroundColor: "rgba(255, 255, 255, 0.2)"
          }}
        >
          <Button
            sx={{
              color: "white",
              width: "100%",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1
            }}
            startIcon={<AddCircleIcon />}
          >
            Add New Column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
