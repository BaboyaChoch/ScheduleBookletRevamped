import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {},
  logo: {
    height: 50,
  },
});

export default function DemoNav() {
  const classes = useStyles();

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        display: "block",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <div
            sx={{ flexGrow: 1 }}
            onClick={() => window.location.reload(true)}
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2021/09/Louisiana-State-University-LSU-Emblem.png"
              className={classes.logo}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
