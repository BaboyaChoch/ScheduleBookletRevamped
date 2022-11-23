import { useEffect, useState } from "react";
import { Typography, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showErrorHelperMessage, setShowErrorHelperMessage] = useState(false);

  useEffect(() => {
    if ( startTime && endTime && ![startTime, endTime].includes("Invalid Date")) {
      setValue([startTime.format("hh:mm A"), endTime.format("hh:mm A")]);
      setShowErrorHelperMessage(false)
    } else {
      setValue(null);
    }
  }, [startTime, endTime]);

  return (
    <Grid container direction="column" spacing={2}>
      {/* Body - Slider */}
      <Grid container item xs>
        <Grid item>
          {
            showErrorHelperMessage && (startTime || endTime) ?
              <Typography sx={{color: '#d32f2f', p: 1, fontSize: 10, fontWeight: 600}}>
                Invalid Date: make sure AM/PM is capitalized and check bounds START [6:30AM, 9:30PM] and END [start + 1hour, 10:30PM]
              </Typography> : null
          }
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={startTime}
              // to change time w/ dayjs -> dayjs(newValue).format("HH:mm A"
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              onError={() => setShowErrorHelperMessage(true)}
              onAccept={() => setShowErrorHelperMessage(false)}

              // we make an assumption that no class begins before 6:30AM
              minTime={dayjs("06:29:00", "HH:mm:ss")}

              // we make an assumption that the latest start time is 9:30PM
              maxTime={dayjs("21:29:00", "HH:mm:ss")}

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
              onError={() => setShowErrorHelperMessage(true)}
              onAccept={() => setShowErrorHelperMessage(false)}

              /*
              * we make an assumption that the end time, must be atleast an hour after the assumed start time
              * if there is no star time, the min end time will be by default an hour after the earliest assumed
              *  start time of 6:30am
              * */
              minTime={startTime ? startTime.add(1, 'hours') : dayjs("07:29:00", "HH:mm:ss")}

              /*
              * we make another assumption that every class ends by 10:30PM, the latest end time is 10:30PM
              * which is an hour after our assumed latest start time of 9:30PM
              */
              maxTime={dayjs("22:29:00", "HH:mm:ss")}

              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  );
}
