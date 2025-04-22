// import { BorderColor } from "@mui/icons-material"
// import { cyan, deepOrange, orange, teal } from "@mui/material/colors"
import { colors } from "@mui/material"
import { experimental_extendTheme as extendTheme } from "@mui/material/styles"

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: "58px",
    boardBarHeight: "60px"
  },
  colorSchemes: {
    light: {},
    dark: {}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px"
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px"
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "white"
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "1px"
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          // color: theme.palette.primary.main,
          fontSize: "0.875rem"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          // color: theme.palette.primary.main,
          fontSize: "0.875rem",
          // ".MuiOutlinedInput-notchedOutline": {
          //   borderColor: `${theme.palette.primary.light} !important`
          // },
          // "&:hover": {
          //   ".MuiOutlinedInput-notchedOutline": {
          //     borderColor: `${theme.palette.primary.main} !important`
          //   }
          // },
          "& fieldset": {
            borderWidth: "0.5px !important"
          },
          "&:hover fieldset": {
            borderWidth: "1px !important"
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px !important"
          }
        }
      }
    }
  }
})

export default theme
