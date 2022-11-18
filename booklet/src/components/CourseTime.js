import * as React from "react";
import { useState } from "react";
import { Box, Stack, Typography, Slider, Grid } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    justifyContent: "end",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    color: "#674EA7",
  },
  text: {
    color: "red",
  },
  logo: {
    height: 60,
    paddingTop: 3,
  },
});

function valueText(value) {
  return `${value}°C`;
}

export default function CourseTime() {
  const classes = useStyles();
  const [courseTime, setCourseTime] = useState([0, 100]);

  const handleChange = (event, newValue) => {
    setCourseTime(newValue);
  };
  return (
    <Grid container direction="column" spacing={4}>
      {/* Title - Course time */}
      <Grid item xs>
        <Typography sx={{ color: "#674EA7" }}> Course Time</Typography>
      </Grid>
      {/* Body - Slider */}
      <Grid item xs>
        {/* TODO: change color of the label to display the actual time rather than a number. */}
        <Slider
          getAriaLabel={() => "Course Time Range"}
          value={courseTime}
          step={30}
          onChange={handleChange}
          valueLabelDisplay="on"
          getAriaValueText={valueText}
        />
      </Grid>
    </Grid>
  );
}
