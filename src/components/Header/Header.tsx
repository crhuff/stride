import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate(nav.toHome())}>
          Home
        </Button>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: "1rem" }}
        >
          Welcome to the Clinic
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
