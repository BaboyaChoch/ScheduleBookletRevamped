import "./App.css";
import { useEffect, useState } from "react";
import { Divider, Grid, useTheme, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// File Imports
import Filters from "./components/Filters";
import CoursesTable from "./components/CoursesTable";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ScheduleModel from "./components/ScheduleModel";

const useStyles = makeStyles({
  root: {
  },
  schedule: {
    width: 577,
    height: 'fit-content',
    position: "fixed",
    bottom: 0,
    right: 10,
  },
});

export default function App() {
  const classes = useStyles();
  const theme = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filters, setFilters] = useState(null);
  const [semesterYearKeyWord, setSemesterYearKeyword] = useState(null);
  const [departmentKeyWord, setDepartmentKeyword] = useState(null);
  const [currentTableTotalResults, setCurrentTableTotalResults] = useState(null);
  const [handleClearAllFilters, setHandleClearAllFilters] = useState( () => {})
  const [scheduledCourses, setScheduledCourses] = useState([])

  useEffect(() => {
    setIsDarkMode(theme.palette.mode == "dark");
    // console.log(theme);
  });

  useEffect(() => {
    // console.log(
    //   `CURRENT_THEME_MODE: ${theme.palette.mode}`,
    //   `IS_DARK_MODE: ${isDarkMode}`
    // );
    theme.palette.mode = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);


// for debugging purposes, feel free to comment out
  useEffect(() => {

  }, [departmentKeyWord, semesterYearKeyWord]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sx={{width: '100%'}}>
          <NavBar />
        </Grid>
        <Grid item sx={{width: '100%'}}>
          <Container maxWidth={"xl"}>
            <Grid container direction='column' spacing={2}>
              <Grid item sx={{ width: '100%'}}>
                <SearchBar
                  semesterValue={semesterYearKeyWord}
                  setSemesterValue={setSemesterYearKeyword}
                  departmentValue={departmentKeyWord}
                  setDepartmentValue={setDepartmentKeyword}
                  setTotalCourses={setCurrentTableTotalResults}
                />
              </Grid>
              <Grid container item>
                <Grid item xs={2.25} className={classes.filters}>
                  <Filters
                    filters={filters}
                    setFilters={setFilters}
                    setClearFiltersHandler={setHandleClearAllFilters}
                  />
                </Grid>
                <Grid item xs={0.25} display="flex" justifyContent="center">
                  <Divider
                    orientation="vertical"
                    sx={{ backgroundColor: "#E0E0E0" }}
                  />
                </Grid>
                <Grid item container xs={9.5} className={classes.table}>
                  <CoursesTable
                    sidebarFilters={filters}
                    setSidebarFilters={setFilters}
                    onClearFilters={handleClearAllFilters}
                    totalCourses={currentTableTotalResults ? currentTableTotalResults : 150}
                    currentTableSemesterYear={semesterYearKeyWord ? semesterYearKeyWord : 'Fall' +
                      ' 2022'}
                    currentTableDepartment={departmentKeyWord ? departmentKeyWord : 'Computer' +
                      ' Science'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Box>
        <div className={classes.schedule}>
          <ScheduleModel />
        </div>
      </Box>
    </div>
  );
}
