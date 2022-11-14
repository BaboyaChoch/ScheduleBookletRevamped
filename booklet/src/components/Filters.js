import { Box, Stack, Typography, Divider } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React from "react";
import CourseLevel from "./CourseLevel";

// File Imports
import CourseTime from "./CourseTime";
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
});

export default function Filters() {
  const classes = useStyles();

  return (
    <Box className={classes.root} sx={{ flexGrow: 1 }}>
      <Stack direction={"column"}>
        <div className={classes.text}> Filters</div>
        {/* Course Time Component*/}
        <Divider />
        <CourseTime />
        <Divider />
        {/* Course Level Component */}
        <CourseLevel />
        <Divider />
        {/* Availability Component */}
        <Availability />
        {/* Course Days Component */}

        {/* Credit Hours Component */}
      </Stack>
    </Box>
  );
}
