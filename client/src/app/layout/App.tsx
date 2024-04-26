import Catalog from "../../features/catalog/Catalog";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setdarkMode] = useState(false);
  const palletType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: palletType,
      background: { default: palletType === "light" ? "#eaeaea" : "#121212" },
    },
  });

  // switching the darkmode or lightmode
  function handleThemeChange() {
    setdarkMode(!darkMode);
  }

  return (
    <>
      {/* using CssBaseline to reset the default styles */}
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
