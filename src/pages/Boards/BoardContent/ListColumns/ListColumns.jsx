import Box from "@mui/material/Box"
import Column from "./Column/Column"
import Button from "@mui/material/Button"
import AddCircleIcon from "@mui/icons-material/AddCircle"

const ListColumns = () => {
  return (
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
      <Column />
      <Column />
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
  )
}

export default ListColumns
