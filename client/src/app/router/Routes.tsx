import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductDtails from "../../features/catalog/ProductDtails";
import AboutPage from "../../features/about/AboutPage";
import { ContactPage } from "@mui/icons-material";
import Catalog from "../../features/catalog/Catalog";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <App/>,
        children:[
            {path: '', element:<HomePage/>},
            {path: 'catalog', element:<Catalog/>},
            {path: 'catalog/:id', element:<ProductDtails/>},
            {path: 'about', element:<AboutPage/>},
            {path: 'contact', element:<ContactPage/>}
        ]

    }
]) 