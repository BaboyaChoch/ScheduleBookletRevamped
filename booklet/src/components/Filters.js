import { useState } from "react";
import {
  Box,
  Stack,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

// File Imports
import CourseTime from "./CourseTime";
import CheckmarkDisplayer from "./CheckmarkDisplayer";
import Availability from "./Availibility";
import CollapsableFilter from "./CollapsableFilter";

const useStyles = makeStyles({
  root: {},
  text: {
    color: "white",
  },
  logo: {
    height: 60,
    paddingTop: 3,
  },
  filterStack: {
    paddingLeft: 5,
  },
});

const courseLevelList = [
  { id: 1, label: "1000 Level", checked: false },
  { id: 2, label: "2000 Level", checked: false },
  { id: 3, label: "3000 Level", checked: false },
  { id: 4, label: "4000 Level", checked: false },
  { id: 5, label: "5000+ Level", checked: false },
];

const courseDayList = [
  { id: 1, label: "M", checked: false },
  { id: 2, label: "T", checked: false },
  { id: 3, label: "W", checked: false },
  { id: 4, label: "TH", checked: false },
  { id: 5, label: "F", checked: false },
];

const creditHourList = [
  { id: 1, label: 1.0, checked: false },
  { id: 2, label: 2.0, checked: false },
  { id: 3, label: 3.0, checked: false },
  { id: 4, label: 4.0, checked: false },
  { id: 5, label: 5.0, checked: false },
  { id: 6, label: "Other", checked: false },
];

export default function Filters({ filters, setFilters }) {
  const classes = useStyles();
  const [courseTimes, setCourseTimes] = useState(null);

  // False -> full class, True -> classes available, Undefined -> all classes
  const [availability, setAvailability] = useState(null);
  const [courseLevels, setCourseLevels] = useState(JSON.parse(JSON.stringify(courseLevelList)));
  const [courseDays, setCourseDays] = useState(JSON.parse(JSON.stringify(courseDayList)));
  const [creditHours, setCreditHours] = useState(JSON.parse(JSON.stringify(creditHourList)));
  const AVAILABILITY_DEFAULT_VALUE = "ALL_COURSES";

  const FITLER_OPTIONS_DEFAULT_SHOW_VALUE = true;
  const [openCourseTimeFilter, setOpenCourseTimeFilter] = useState(FITLER_OPTIONS_DEFAULT_SHOW_VALUE);
  const [openCourseLevelsFilter, setOpenCourseLevelsFilter] = useState(FITLER_OPTIONS_DEFAULT_SHOW_VALUE);
  const [openAvailabilityFilter, setOpenAvailabilityFilter] = useState(FITLER_OPTIONS_DEFAULT_SHOW_VALUE);
  const [openCourseDaysFilter, setOpenCourseDaysFilter] = useState(FITLER_OPTIONS_DEFAULT_SHOW_VALUE);
  const [openCreditHoursFilter, setOpenCreditHoursFilter] = useState(FITLER_OPTIONS_DEFAULT_SHOW_VALUE);

  const handleApplyFilters = () => {
    setFilters({
      course_times:  courseTimes,
      course_levels: JSON.stringify(courseLevels) === JSON.stringify(courseLevelList) ? null : courseLevels,
      availability: (availability === null || availability == AVAILABILITY_DEFAULT_VALUE) ? null : availability,
      course_days: JSON.stringify(courseDays) === JSON.stringify(courseDayList) ? null : courseDays,
      credit_hours: JSON.stringify(creditHours) === JSON.stringify(creditHourList) ? null : creditHours,
    })
  };
// border: '1px solid red',
  return (
    <Box sx={{ width: "100%" }}>
      <Stack divider={<Divider />} spacing={1}>
        <div className={classes.filterStack}>
          <Typography sx={{ color: "#674EA7", fontWeight: 700 }}>
            Filters
          </Typography>
        </div>

        {/* Course Times Filter*/}
        <CollapsableFilter label={"Course Time"} open={openCourseTimeFilter} setOpen={setOpenCourseTimeFilter}>
          <CourseTime
            value={courseTimes}
            setValue={setCourseTimes}
          />
        </CollapsableFilter>

        {/* Course Levels Filter */}
        <CollapsableFilter label={"Course Level"} open={openCourseLevelsFilter} setOpen={setOpenCourseLevelsFilter}>
          <CheckmarkDisplayer
            value={courseLevels}
            setValue={setCourseLevels}
            itemList={courseLevelList}
          />
        </CollapsableFilter>


        {/* Availability Filter */}
        <CollapsableFilter label={"Availability"} open={openAvailabilityFilter} setOpen={setOpenAvailabilityFilter}>
          <Availability
            value={availability}
            setValue={setAvailability}
            defaultValue={AVAILABILITY_DEFAULT_VALUE}
            />
        </CollapsableFilter>

        {/* Course Days Filter */}
        <CollapsableFilter label={"Course Days"} open={openCourseDaysFilter} setOpen={setOpenCourseDaysFilter}>
          <CheckmarkDisplayer
            value={courseDays}
            setValue={setCourseDays}
            headerText="Course Days"
            itemList={courseDayList}
          />
        </CollapsableFilter>

        {/* Credit Hours Filter */}
        <CollapsableFilter label={"Credit Hours"} open={openCreditHoursFilter} setOpen={setOpenCreditHoursFilter}>
          <CheckmarkDisplayer
            value={creditHours}
            setValue={setCreditHours}
            itemList={creditHourList}
          />
        </CollapsableFilter>

        {/* Apply Filters Button*/}
        <Box sx={{ paddingTop: 2, alignSelf: "end",  p: 1 }}>
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
