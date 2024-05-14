import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore"


const RequireAuth = () => {
 const {user} = useAppSelector(state => state.account);
 // bu using useLocation => redirekt the user wher they came from 
 const location = useLocation();

 if(!user){
    return <Navigate to = '/login' state={{from:location}}/>
 }

 // if the user sucsefuly loged in returne 
 return <Outlet/>
}

export default RequireAuth