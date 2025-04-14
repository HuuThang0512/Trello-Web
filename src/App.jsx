import { useColorScheme } from "@mui/material/styles"
import { Button } from "@mui/material"

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode == "light" ? "dark" : "light")
      }}
    >
      {mode == "light" ? "Turn Dark" : "Turn Light"}
    </Button>
  )
}

function App() {
  return (
    <>
      <div>
        <ModeToggle />
      </div>
    </>
  )
}

export default App
