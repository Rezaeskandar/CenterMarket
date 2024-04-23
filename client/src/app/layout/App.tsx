
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";

function App() {
  const [darkMode, setdarkMode] = useState(false)
  const palletType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palletType,
      background:{default:palletType==='light'? '#eaeaea':'#121212'} 
  }})

  // switching the darkmode or lightmode 
  function handleThemeChange(){
    setdarkMode(!darkMode)
  }
  
  return (
    <>
    {/* using CssBaseline to reset the default styles */}
    <ThemeProvider theme={theme}>

    <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Catalog/>
      </Container>
    
    </ThemeProvider>
    </>
  );
}

export default App;
