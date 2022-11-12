import * as React from "react";
import { useState } from "react";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  FormGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

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

const courseLevelList = [
  "1000 Level",
  "2000 Level",
  "3000 Level",
  "4000 Level",
  "5000+ Level",
];

export default function CourseLevel() {
  const classes = useStyles();
  const [courseLevel, setCourseLevel] = useState(0);

  return (
    <Grid container direction="column" spacing={1}>
      {/* Title - Course Level */}
      <Grid item xs>
        <Typography sx={{ color: "#674EA7" }}> Course Level</Typography>
      </Grid>
      {/* Body - checklist */}
      <Grid item xs={1}>
        {courseLevelList.map((level) => {
          return <FormControlLabel control={<Checkbox />} label={level} />;
        })}
      </Grid>
    </Grid>
  );
}
