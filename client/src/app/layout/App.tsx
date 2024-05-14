import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/acoount/accountSlice";

function App() {
  // const {setBasket} = useCenterMarketContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
          await dispatch(fetchCurrentUser());
          await dispatch(fetchBasketAsync());
    }catch(error){
      console.log(error)
    } 
},[dispatch])
  useEffect(() => {
   initApp().then(() => setLoading(false));
     
  }, [initApp]);
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

  if (loading) return <LoadingComponent message="Initialising app..." />;

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
