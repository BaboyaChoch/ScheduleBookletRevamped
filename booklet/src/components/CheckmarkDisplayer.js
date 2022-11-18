import * as React from "react";
import { useState } from "react";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  Box,
  FormGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";

const useStyles = makeStyles({
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
    <Box>
      {/* <Grid container direction={"column"} spacing={1}> */}
      {/* Title - Course Level */}

      <Typography sx={{ color: "#674EA7" }}> {headerText}</Typography>

      {/* Body - checklist */}
      <Box sx={{paddingLeft: 1}}>
        <FormGroup>
          {itemList.map((item) => {
            return (
              <FormControlLabel
                key={item.id}
                control={<Checkbox />}
                label={item.label}
              />
            );
          })}
        </FormGroup>
      </Box>

      {/* </Grid> */}
    </Box>
  );
}
