import "./App.css";
import { useState } from "react";
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
    zIndex: 999,
  },
});

export default function App() {
  const classes = useStyles();

  const [filters, setFilters] = useState(null);
  const [semesterYearKeyWord, setSemesterYearKeyword] = useState(null);
  const [departmentKeyWord, setDepartmentKeyword] = useState(null);
  const [handleClearAllFilters, setHandleClearAllFilters] = useState(() => {});
  const [scheduledCourses, setScheduledCourses] = useState([
    ["CSC 1350", 2, "1", "9:30AM-10:20AM", "M W F"],
    ["CSC 1253", 1, "3", "12:00PM-1:20PM", "T TH"],
    ["CSC 1240", 1, "3", "11:30AM-12:30PM", "M W "],
  ]);
  const [courses, setCourses] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sx={{ width: "100%" }}>
          <NavBar />
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <Container maxWidth={"xl"}>
            <Grid container direction="column" spacing={2}>
              <Grid item sx={{ width: "100%", mt: 4 }}>
                <SearchBar
                  semesterValue={semesterYearKeyWord}
                  setSemesterValue={setSemesterYearKeyword}
                  departmentValue={departmentKeyWord}
                  setDepartmentValue={setDepartmentKeyword}
                  courses={courses}
                  setCourses={setCourses}
                  setShowResults={setShowResults}
                  setShowLoading={setShowLoading}
                />
              </Grid>
              <Grid container item>
                <Grid item xs={2.25} className={classes.filters}>
                  {showResults ? (
                    showLoading ? (
                      <Skeleton
                        animation="wave"
                        sx={{ bgcolor: "#E0E0E0" }}
                        variant="rounded"
                        height={"95%"}
                      >
                        <Filters
                          filters={filters}
                          setFilters={setFilters}
                          setClearFiltersHandler={setHandleClearAllFilters}
                          sx={{ display: showResults ? "" : "none" }}
                        />
                      </Skeleton>
                    ) : (
                      <Filters
                        filters={filters}
                        setFilters={setFilters}
                        setClearFiltersHandler={setHandleClearAllFilters}
                        sx={{ display: showResults ? "" : "none" }}
                      />
                    )
                  ) : null}
                </Grid>
                <Grid item xs={0.25} display="flex" justifyContent="center">
                  {showResults && !showLoading ? (
                    <Divider
                      orientation="vertical"
                      sx={{ backgroundColor: "#E0E0E0" }}
                    />
                  ) : null}
                </Grid>
                <Grid item container xs={9.5} className={classes.table}>
                  {showResults ? (
                    showLoading ? (
                      <Skeleton
                        animation="wave"
                        sx={{ bgcolor: "#E0E0E0" }}
                        variant="rounded"
                        width={"100%"}
                        height={"95%"}
                      >
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
                          showResults={showResults}
                        />
                      </Skeleton>
                    ) : (
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
                        sx={{ display: showResults ? "" : "none", mb: 8 }}
                        showResults={showResults}
                      />
                    )
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
