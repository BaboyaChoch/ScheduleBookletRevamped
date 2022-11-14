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
import { Stack } from "@mui/system";

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

export default function CheckmarkDisplayer(props) {
  const { headerText, itemList } = props;
  const classes = useStyles();
  const [courseLevel, setCourseLevel] = useState(0);

  return (
    <Grid container direction="column" spacing={1}>
      {/* Title - Course Level */}
      <Grid item xs>
        <Typography sx={{ color: "#674EA7" }}> {headerText}</Typography>
      </Grid>
      {/* Body - checklist */}
      <Grid
        item
        sx={{
          flexWrap: "nowrap",
        }}
      >
        {itemList.map((item) => {
          return (
            <FormControlLabel
              spacing={1}
              key={item.id}
              control={<Checkbox />}
              label={item.label}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
