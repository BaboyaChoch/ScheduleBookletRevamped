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

/*
* True : not_full_courses
* False : full_courses
* undefined : all_courses
*/
const availabilityOptions = [
  { value: false, label: "Full Courses" },
  { value: true, label: "Not Full Courses" },
  { value: "ALL_COURSES", label: "All Courses" },
];

export default function Availability({value, setValue, defaultValue}) {

  const handleOnClick = (event) => {
    setValue(event.target.value);
  }

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography sx={{ color: "#674EA7" }}> Availability </Typography>
      </Grid>
      <Grid item>
        <RadioGroup defaultValue={defaultValue}>
          {availabilityOptions.map((element) => {
            return (
              <Grid item>
                <FormControlLabel
                  value={element.value}
                  control={<Radio />}
                  label={element.label}
                  onChange={handleOnClick}
                />
              </Grid>
            );
          })}
        </RadioGroup>
      </Grid>
    </Grid>
  );
}
