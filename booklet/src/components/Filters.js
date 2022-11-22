import {useEffect, useState} from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  Container,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React from "react";

// File Imports
import CourseTime from "./CourseTime";
import CheckmarkDisplayer from "./CheckmarkDisplayer";
import Availability from "./Availibility";

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

  const handleApplyFilters = () => {
    setFilters({
      course_times:  courseTimes,
      course_levels: JSON.stringify(courseLevels) === JSON.stringify(courseLevelList) ? null : courseLevels,
      availability: (availability === null || availability == AVAILABILITY_DEFAULT_VALUE) ? null : availability,
      course_days: JSON.stringify(courseDays) === JSON.stringify(courseDayList) ? null : courseDays,
      credit_hours: JSON.stringify(creditHours) === JSON.stringify(creditHourList) ? null : creditHours,
    })
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Stack divider={<Divider />} spacing={1}>
        <div className={classes.filterStack}> Filters</div>
        {/* Course Time Component*/}

        <div>
          <CourseTime value={courseTimes} setValue={setCourseTimes} />
        </div>

        {/* Course Level through the checkmarkDisp. componenet */}
        <div>
          <CheckmarkDisplayer
            value={courseLevels}
            setValue={setCourseLevels}
            headerText="Course Level"
            itemList={courseLevelList}
          />
        </div>

        {/* Availability Component */}
        <Availability
          value={availability}
          setValue={setAvailability}
          defaultValue={AVAILABILITY_DEFAULT_VALUE}
        />

        {/* Course Component */}
        <div>
          <CheckmarkDisplayer
            value={courseDays}
            setValue={setCourseDays}
            headerText="Course Days"
            itemList={courseDayList}
          />
        </div>

        {/* Credit Hours Component */}
        <div>
          <CheckmarkDisplayer
            value={creditHours}
            setValue={setCreditHours}
            headerText="Credit Hours"
            itemList={creditHourList}
          />
        </div>

        <Box sx={{ paddingTop: 2, alignSelf: "center" }}>
          <Button
            size="small"
            sx={{ width: "100%" }}
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
