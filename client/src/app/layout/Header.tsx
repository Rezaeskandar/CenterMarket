import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];
const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

function Header({ darkMode, handleThemeChange }: Props) {
  const {basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state => state.account);
  const ItemCont = basket?.items.reduce((sum,item)=> sum+item.quantity,0)
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Switch checked={darkMode} onChange={handleThemeChange} />

          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            Center-Market
          </Typography>
        </Box>

        <Box>
          {/* middle links */}
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toLocaleUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          {/* shopping icone */}
          <IconButton
            component={Link}
            to="basket"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={ItemCont} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>


            {/* rightLiks */}
            {user ? (<SignedInMenu/>)
            :(
               
              <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                  {title.toLocaleUpperCase()}
                </ListItem>
              ))}
            </List>
            )}      
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
