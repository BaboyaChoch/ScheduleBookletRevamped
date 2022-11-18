import "./App.css";
import { useEffect, useState } from "react";
import { Divider, Grid, useTheme, Container } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// File Imports
import Filters from "./components/Filters";
import CoursesTable from "./components/CoursesTable";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

const useStyles = makeStyles({
  root: {
    height: "100%",
    flexGrow: 1,
    backgroundColor: "#F6F4F1",
  },
  navBar: {},
  content: {
    flexGrow: 1,
    height: "100%",
    overflow: "auto",
  },
  search: {},
  main: {},
  filters: {},
  table: {},
  schedule: {
    width: 577,
    height: 36,
    backgroundColor: "green",
    position: "fixed",
    bottom: 0,
    right: 0,
  },
});

const Label = ({ children }) => {
  return (
    <Typography
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        width: "100%",
      }}
    >
      {children}
    </Typography>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    setIsDarkMode(theme.palette.mode == "dark");
    console.log(theme);
  });

  useEffect(() => {
    console.log(
      `CURRENT_THEME_MODE: ${theme.palette.mode}`,
      `IS_DARK_MODE: ${isDarkMode}`
    );
    theme.palette.mode = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <>
      <Grid container className={classes.root} direction="column">
        <Grid item className={classes.navBar}>
          <NavBar />
        </Grid>

        <Container maxWidth="xl">
          <Grid
            container
            className={classes.content}
            direction="column"
            alignItems="stretch"
          >
            <Grid item xs={1.25} />
            <Grid item container direction="column" xs={9.5} spacing={3}>
              <Grid item container xs={1} className={classes.search}>
                <SearchBar />
              </Grid>
              <Grid
                item
                container
                wrap="nowrap"
                xs={11}
                className={classes.main}
              >
                <Grid item xs={2.25} className={classes.filters}>
                  <Filters />
                </Grid>
                <Grid item xs={0.25} display="flex" justifyContent="center">
                  <Divider
                    orientation="vertical"
                    sx={{ backgroundColor: "#E0E0E0" }}
                  />
                </Grid>
                <Grid item container xs={9.5} className={classes.table}>
                  <CoursesTable />
                </Grid>
              </Grid>
              <Grid item xs={1.25} sx={{ backgroundColor: "green" }} />
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {/* <Box>
        <div className={classes.schedule}>
          <Label>SCHEDULE MODAL</Label>
        </div>
      </Box> */}
    </>
  );
}
