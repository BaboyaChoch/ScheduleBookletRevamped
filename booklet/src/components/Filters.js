import { Box, Stack, Typography, Divider } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import React from "react";

// File Imports
import CourseTime from "./CourseTime";

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
        <Divider />
        {/* Course Time Component*/}
        <CourseTime />
        <Divider />
        {/* Course Level Component */}

        {/* Availability Component */}

        {/* Course Days Component */}

        {/* Credit Hours Component */}
      </Stack>
    </Box>
  );
}
