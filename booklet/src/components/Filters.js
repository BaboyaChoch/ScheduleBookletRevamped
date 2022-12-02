import { useEffect, useState } from "react";
import { Box, Stack, Divider, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

// File Imports
import CourseTime from "./CourseTime";
import CheckmarkDisplayer from "./CheckmarkDisplayer";
import Availability from "./Availibility";
import CollapsableContainer from "./CollapsableContainer";

const useStyles = makeStyles({
  root: {},
  text: {
    color: "white",
  },
  logo: {
    height: 60,
    paddingTop: 3,
  },
  filterStack: {},
});

// careful when changing {id} value, it is used in handleSidebarFilters in CoursesTable.js
const courseLevelList = [
  { id: 1, label: "1000 Level", checked: false },
  { id: 2, label: "2000 Level", checked: false },
  { id: 3, label: "3000 Level", checked: false },
  { id: 4, label: "4000 Level", checked: false },
  { id: 5, label: "5000+ Level", checked: false },
];

// careful when changing {label} value, it is used in handleSidebarFilters in CoursesTable.js
const courseDayList = [
  { id: 1, label: "M", checked: false },
  { id: 2, label: "T", checked: false },
  { id: 3, label: "W", checked: false },
  { id: 4, label: "TH", checked: false },
  { id: 5, label: "F", checked: false },
];

// careful when changing {label} value, it is used in handleSidebarFilters in CoursesTable.js
const creditHourList = [
  { id: 1, label: 1.0, checked: false },
  { id: 2, label: 2.0, checked: false },
  { id: 3, label: 3.0, checked: false },
  { id: 4, label: 4.0, checked: false },
  { id: 5, label: 5.0, checked: false },
  { id: 6, label: "Other", checked: false },
];

export default function Filters({
  filters,
  setFilters,
  setClearFiltersHandler,
  ref,
  sx,
}) {
  const classes = useStyles();
  const [randKey, setRandKey] = useState(0);
  const [courseTimes, setCourseTimes] = useState(null);

  // False -> full class, True -> classes available, Undefined -> all classes
  const [availability, setAvailability] = useState(null);
  const [courseLevels, setCourseLevels] = useState(
    JSON.parse(JSON.stringify(courseLevelList))
  );
  const [courseDays, setCourseDays] = useState(
    JSON.parse(JSON.stringify(courseDayList))
  );
  const [creditHours, setCreditHours] = useState(
    JSON.parse(JSON.stringify(creditHourList))
  );
  const AVAILABILITY_DEFAULT_VALUE = "ALL_COURSES";

  const FITLER_OPTIONS_DEFAULT_SHOW_VALUE = true;
  const [openCourseTimeFilter, setOpenCourseTimeFilter] = useState(
    FITLER_OPTIONS_DEFAULT_SHOW_VALUE
  );
  const [openCourseLevelsFilter, setOpenCourseLevelsFilter] = useState(
    FITLER_OPTIONS_DEFAULT_SHOW_VALUE
  );
  const [openAvailabilityFilter, setOpenAvailabilityFilter] = useState(
    FITLER_OPTIONS_DEFAULT_SHOW_VALUE
  );
  const [openCourseDaysFilter, setOpenCourseDaysFilter] = useState(
    FITLER_OPTIONS_DEFAULT_SHOW_VALUE
  );
  const [openCreditHoursFilter, setOpenCreditHoursFilter] = useState(
    FITLER_OPTIONS_DEFAULT_SHOW_VALUE
  );

  const handleApplyFilters = () => {
    setFilters({
      course_times: courseTimes,
      course_levels:
        JSON.stringify(courseLevels) === JSON.stringify(courseLevelList)
          ? null
          : courseLevels,
      availability:
        availability === null || availability == AVAILABILITY_DEFAULT_VALUE
          ? null
          : availability,
      course_days:
        JSON.stringify(courseDays) === JSON.stringify(courseDayList)
          ? null
          : courseDays,
      credit_hours:
        JSON.stringify(creditHours) === JSON.stringify(creditHourList)
          ? null
          : creditHours,
    });
  };

  const resetAllFilterSidebarOptions = () => {
    // reset sidebar to default values, uncheck everything and all courses selected
    setCourseTimes(null);
    setAvailability(null);
    setCourseLevels(JSON.parse(JSON.stringify(courseLevelList)));
    setCourseDays(JSON.parse(JSON.stringify(courseDayList)));
    setCreditHours(JSON.parse(JSON.stringify(creditHourList)));

    setFilters({
      course_times: null,
      course_levels: null,
      availability: null,
      course_days: null,
      credit_hours: null,
    });

    setRandKey(Math.random());
  };

  useEffect(() => {
    setClearFiltersHandler(() => resetAllFilterSidebarOptions);
  }, []);

  return (
    <Box ref={ref} sx={{ width: "100%", ...sx }} key={randKey}>
      <Stack divider={<Divider />} spacing={1}>
        <div className={classes.filterStack}>
          <Typography sx={{ color: "#674EA7", fontWeight: 700 }}>
            Filters
          </Typography>
        </div>

        {/* Course Times Filter*/}
        <CollapsableContainer
          label={"Course Time"}
          open={openCourseTimeFilter}
          setOpen={setOpenCourseTimeFilter}
        >
          <CourseTime value={courseTimes} setValue={setCourseTimes} />
        </CollapsableContainer>

        {/* Course Levels Filter */}
        <CollapsableContainer
          label={"Course Level"}
          open={openCourseLevelsFilter}
          setOpen={setOpenCourseLevelsFilter}
        >
          <CheckmarkDisplayer
            value={courseLevels}
            setValue={setCourseLevels}
            itemList={courseLevelList}
          />
        </CollapsableContainer>

        {/* Availability Filter */}
        <CollapsableContainer
          label={"Availability"}
          open={openAvailabilityFilter}
          setOpen={setOpenAvailabilityFilter}
        >
          <Availability
            value={availability}
            setValue={setAvailability}
            defaultValue={AVAILABILITY_DEFAULT_VALUE}
          />
        </CollapsableContainer>

        {/* Course Days Filter */}
        <CollapsableContainer
          label={"Course Days"}
          open={openCourseDaysFilter}
          setOpen={setOpenCourseDaysFilter}
        >
          <CheckmarkDisplayer
            value={courseDays}
            setValue={setCourseDays}
            headerText="Course Days"
            itemList={courseDayList}
          />
        </CollapsableContainer>

        {/* Credit Hours Filter */}
        <CollapsableContainer
          label={"Credit Hours"}
          open={openCreditHoursFilter}
          setOpen={setOpenCreditHoursFilter}
        >
          <CheckmarkDisplayer
            value={creditHours}
            setValue={setCreditHours}
            itemList={creditHourList}
          />
        </CollapsableContainer>

        {/* Apply Filters Button*/}
        <Box sx={{ paddingTop: 2, alignSelf: "end", p: 1 }}>
          <Button
            size="small"
            sx={{ width: "100%", fontWeight: 700 }}
            variant="contained"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
