import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Divider, Grid, useTheme, Container, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";

// File Imports
import Filters from "./components/Filters";
import CoursesTable from "./components/CoursesTable";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ScheduleModel from "./components/ScheduleModel";

const useStyles = makeStyles({
  root: {},
  schedule: {
    width: 577,
    height: "fit-content",
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
  const [handleClearAllFilters, setHandleClearAllFilters] = useState(() => {});
  const [scheduledCourses, setScheduledCourses] = useState([
    ["CSC 1350", 3, "1.0", "9:30AM-10:20AM", "M W F"],
    ["CSC 1253", 1, "3.0", "12:00PM-1:20PM", "T TH"],
    ["CSC 1240", 1, "3.0", "11:30AM-12:30AM", "M W "],
  ]);
  const [courses, setCourses] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState([]);

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
  useEffect(() => {}, [departmentKeyWord, semesterYearKeyWord]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sx={{ width: "100%" }}>
          <NavBar />
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <Container maxWidth={"xl"}>
            <Grid container direction="column" spacing={2}>
              <Grid item sx={{ width: "100%" }}>
                <SearchBar
                  semesterValue={semesterYearKeyWord}
                  setSemesterValue={setSemesterYearKeyword}
                  departmentValue={departmentKeyWord}
                  setDepartmentValue={setDepartmentKeyword}
                  courses={courses}
                  setCourses={setCourses}
                  setShowResults={setShowResults}
                />
              </Grid>
              <Grid container item>
                <Grid item xs={2.25} className={classes.filters}>
                  {showResults ? (
                    <Filters
                      filters={filters}
                      setFilters={setFilters}
                      setClearFiltersHandler={setHandleClearAllFilters}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={0.25} display="flex" justifyContent="center">
                  {showResults ? (
                    <Divider
                      orientation="vertical"
                      sx={{ backgroundColor: "#E0E0E0" }}
                    />
                  ) : null}
                </Grid>
                <Grid item container xs={9.5} className={classes.table}>
                  {showResults ? (
                    <CoursesTable
                      sidebarFilters={filters}
                      setSidebarFilters={setFilters}
                      onClearFilters={handleClearAllFilters}
                      courses={courses}
                      setCourses={setCourses}
                      totalCourses={courses.length}
                      currentTableSemesterYear={semesterYearKeyWord}
                      currentTableDepartment={departmentKeyWord}
                      selectedCourses={selectedCourses}
                      setSelectedCourses={setSelectedCourses}
                      scheduledCourses={scheduledCourses}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Box>
        <div className={classes.schedule}>
          <ScheduleModel
            scheduledCourses={scheduledCourses}
            setScheduledCourses={setScheduledCourses}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
          />
        </div>
      </Box>
    </div>
  );
}
