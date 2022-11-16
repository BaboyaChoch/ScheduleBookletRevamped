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
  { id: 1, label: "1000 Level" },
  { id: 2, label: "2000 Level" },
  { id: 3, label: "3000 Level" },
  { id: 4, label: "4000 Level" },
  { id: 5, label: "5000+ Level" },
];

const courseDayList = [
  { id: 1, label: "M" },
  { id: 2, label: "T" },
  { id: 3, label: "W" },
  { id: 4, label: "TH" },
  { id: 5, label: "F" },
];

const credtHourList = [
  { id: 1, label: 1.0 },
  { id: 2, label: 2.0 },
  { id: 3, label: 3.0 },
  { id: 4, label: 4.0 },
  { id: 5, label: 5.0 },
  { id: 6, label: "Other" },
];

export default function Filters(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root} xs={12}>
      <Stack
        className={classes.filterStack}
        direction="column"
        sx={{ overflow: "auto" }}
      >
        <div className={classes.filterStack}> Filters</div>
        {/* Course Time Component*/}
        <Divider />
        <div>
          <CourseTime />
        </div>
        <Divider />
        {/* Course Level through the checkmarkDisp. componenet */}
        <div>
          <CheckmarkDisplayer
            headerText="Course Level"
            itemList={courseLevelList}
          />
        </div>

        <Divider />
        {/* Availability Component */}
        <Availability />
        <Divider />
        {/* Using the Course Component */}
        <CheckmarkDisplayer headerText="Course Days" itemList={courseDayList} />
        <Divider />
        {/* Credit Hours Component */}
        <CheckmarkDisplayer
          headerText="Credit Hours"
          itemList={credtHourList}
        />
        <Divider />
        <Box sx={{ paddingTop: 2, alignSelf: "center" }}>
          <Button
            size="small"
            sx={{ width: "100%" }}
            variant="contained"
            onClick={() => {
              return alert("submit filters");
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
