import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ModeSelect from "~/components/ModeSelect/ModeSelect"
import AppsIcon from "@mui/icons-material/Apps"
import {ReactComponent as TrelloIcon} from "~/assets/trello.svg"
import SvgIcon from "@mui/material/SvgIcon"
import Workspaces from "./Menu/Workspaces"
import Recent from "./Menu/Recent"
import Starred from "./Menu/Starred"
import Templates from "./Menu/Templates"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Badge from "@mui/material/Badge"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import Tooltip from "@mui/material/Tooltip"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import Profiles from "./Menu/Profiles"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import {useState} from "react"

const AppBar = () => {
  const [searchValue, setSearchValue] = useState("")
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode == "dark" ? "#2c3e50" : "#1565c0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AppsIcon sx={{color: "white", cursor: "pointer"}} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
        >
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{color: "white"}}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Trello
          </Typography>
        </Box>

        <Box sx={{display: {xs: "none", md: "flex"}, gap: 1}}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button sx={{color: "white"}} startIcon={<LibraryAddIcon />}>
            Create
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{
            minWidth: "120px",
            maxWidth: "180px",
            "& label": {color: "white"},
            "& input": {color: "white"},
            "& label.Mui-focused": {color: "white"},
            "& .MuiOutlinedInput-root": {
              "& fieldset": {borderColor: "white"},
              "&:hover fieldset": {borderColor: "white"},
              "&.Mui-focused fieldset": {borderColor: "white"},
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color: "white"}} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  onClick={() => setSearchValue("")}
                  fontSize="small"
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    display: `${searchValue ? "block" : "none"}`,
                  }}
                />
              </InputAdornment>
            ),
          }}
        />

        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{cursor: "pointer"}}>
            <NotificationsNoneIcon sx={{color: "white"}} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{cursor: "pointer", color: "white"}} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
