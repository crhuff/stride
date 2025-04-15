import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";
import { useHeader } from "../../utils/header/useHeader";

const Header = () => {
  const navigate = useNavigate();
  const { backButtonVisible } = useHeader();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate(nav.toHome())}>
          Home
        </Button>
        {backButtonVisible && (
          <Button color="inherit" onClick={() => navigate(-1)}>
            Back
          </Button>
        )}
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "max-content",
          }}
        >
          Welcome to the Clinic
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
