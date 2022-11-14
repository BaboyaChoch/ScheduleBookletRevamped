import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const availabilityOptions = [
  { value: "fullCourses", label: "Full Courses" },
  { value: "nonFullCourses", label: "Not Full Courses" },
  { value: "allCourses", label: "All Courses" },
];

export default function Availability() {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography sx={{ color: "#674EA7" }}> Availability </Typography>
      </Grid>
      <Grid item>
        <RadioGroup defaultValue="allCourses">
          {availabilityOptions.map((element) => {
            return (
              <FormControlLabel
                value={element.value}
                control={<Radio />}
                label={element.label}
              />
            );
          })}
        </RadioGroup>
      </Grid>
    </Grid>
  );
}
