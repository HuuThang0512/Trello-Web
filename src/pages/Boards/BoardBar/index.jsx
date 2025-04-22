import { Box } from "@mui/material"
import Chip from "@mui/material/Chip"
import WidgetsIcon from "@mui/icons-material/Widgets"
import VpnLockIcon from "@mui/icons-material/VpnLock"
import AddToDriveIcon from "@mui/icons-material/AddToDrive"
import AutoModeIcon from "@mui/icons-material/AutoMode"
import FilterListIcon from "@mui/icons-material/FilterList"
import Tooltip from "@mui/material/Tooltip"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Button from "@mui/material/Button"

const chipStyle = {
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "6px",
  ".MuiSvgIcon-root": {
    color: "white"
  },
  "&:hover": {
    backgroundColor: "primary.50"
  }
}

const BoardBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        borderBottom: "1px solid white",
        backgroundColor: (theme) =>
          theme.palette.mode == "dark" ? "#34495e" : "#1976d2"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2
        }}
      >
        <Chip
          sx={chipStyle}
          icon={<WidgetsIcon />}
          label="Huu Thang's Board"
          clickable
        />
        <Chip
          sx={chipStyle}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={chipStyle}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={chipStyle}
          icon={<AutoModeIcon />}
          label="Automaion"
          clickable
        />
        <Chip
          sx={chipStyle}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2
        }}
      >
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={5}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              fontSize: "14px",
              cursor: "pointer",
              border: "none"
            }
          }}
        >
          <Tooltip>
            <Avatar
              alt="Avatar"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/434841266_1136936637733278_8562523003494747669_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=1qkjOZGfn60Q7kNvwGg8W81&_nc_oc=AdnqBkzVi8vopw60X1NTzHsFM1lscNtlKAj-6adLG3hkKkk-9446vTuMBCFfZvVPByW9sZuo3LM04LPF1afz6RYF&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=Y2i5MIehrkSbTxhbJKNacw&oh=00_AfF6PRdUmMAFn9pTCYZdnAC1J6Ez56i-uiZq8FoNkXBbWQ&oe=680ACE71"
            />
          </Tooltip>
          <Tooltip>
            <Avatar
              alt="Avatar"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/487088987_1369488791144727_5465203293411615926_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=FdLfHh3JDX0Q7kNvwFpsPs-&_nc_oc=AdnuIKUKxAr76WnNoy6du3izzkArYbKrMNTzhtAC-W3dxvVEz0WtOlXIGyeXaXl30CT75-COf-gsvcKdXK1W3sZb&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=Z6mqcr6J53_a5qG46CWuiQ&oh=00_AfGkltVRaS-qMvNcz2hxcc4q3apIOdL7W9lTJRm-hAs1MQ&oe=680BA4B2"
            />
          </Tooltip>
          <Tooltip>
            <Avatar
              alt="Avatar"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/486576688_1367952327965040_6397315610707636614_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=sEnV-9PFMBQQ7kNvwHsM7JN&_nc_oc=Adnuj9TSHR1QHFv2wJRf0oBGrvd6noSflK78Z6pzdxOuTeBBelAyEEk7tPS7hRyYmGuG9lRZfEjgGYRnfUYk6uNC&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=m76AlzXv5v9bQGxbosRJRw&oh=00_AfH1oGI5yFTALVaT4JwfqI2I42Azzk5l1m5Q6DicyY_avg&oe=680B85F8"
            />
          </Tooltip>
          <Tooltip>
            <Avatar
              alt="Avatar"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-1/492043818_3955676474745805_4821741991847048385_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=P5paUfhB9-QQ7kNvwHCIURP&_nc_oc=AdkAE81OwmraHdHV08T4XKpGWTJS1QsF9Bkp2Q24_HUKdmUhj_ZZF8m249yxjl0ZaKlHXPEo_jGh96Lqkd3IY4BC&_nc_zt=24&_nc_ht=scontent.fhan19-1.fna&_nc_gid=kEv3RuEptOuQIQw_ZcVsVQ&oh=00_AfHmwsO7gxYSydCPODCtqJXj-JFGkO-8A4LvFMzMjtg_ug&oe=680B8586"
            />
          </Tooltip>
          <Tooltip>
            <Avatar
              alt="Avatar"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/434841266_1136936637733278_8562523003494747669_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=1qkjOZGfn60Q7kNvwGg8W81&_nc_oc=AdnqBkzVi8vopw60X1NTzHsFM1lscNtlKAj-6adLG3hkKkk-9446vTuMBCFfZvVPByW9sZuo3LM04LPF1afz6RYF&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=Y2i5MIehrkSbTxhbJKNacw&oh=00_AfF6PRdUmMAFn9pTCYZdnAC1J6Ez56i-uiZq8FoNkXBbWQ&oe=680ACE71"
            />
          </Tooltip>
          <Tooltip>
            <Avatar
              alt="Avatar"
              src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/434841266_1136936637733278_8562523003494747669_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=1qkjOZGfn60Q7kNvwGg8W81&_nc_oc=AdnqBkzVi8vopw60X1NTzHsFM1lscNtlKAj-6adLG3hkKkk-9446vTuMBCFfZvVPByW9sZuo3LM04LPF1afz6RYF&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=Y2i5MIehrkSbTxhbJKNacw&oh=00_AfF6PRdUmMAFn9pTCYZdnAC1J6Ez56i-uiZq8FoNkXBbWQ&oe=680ACE71"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
