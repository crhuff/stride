import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to the Clinic
        </Typography>
        <Button color="inherit" onClick={() => navigate(nav.toHome())}>
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
