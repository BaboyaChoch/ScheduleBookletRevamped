import * as React from "react";
import { useState } from "react";
import { Box, Stack, Typography, Slider, Grid, TextField } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

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

export default function CourseTime({ value, setValue }) {
  const classes = useStyles();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  React.useEffect(() => {
    setValue([startTime, endTime]);
    console.log(value);
  }, [startTime, endTime]);

  return (
    <Grid container direction="column" spacing={2}>
      {/* Title - Course time */}
      <Grid item xs>
        <Typography sx={{ color: "#674EA7" }}> Course Time</Typography>
      </Grid>
      {/* Body - Slider */}
      <Grid item xs>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={startTime}
              // to change time w/ dayjs -> dayjs(newValue).format("HH:mm A"
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sx={{ paddingTop: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  );
}
