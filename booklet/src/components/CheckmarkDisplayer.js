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

export default function CheckmarkDisplayer({
  value,
  setValue,
  headerText,
  itemList,
}) {
  const classes = useStyles();

  const handleChange = (event, index) => {
    const newValue = value;
    newValue[index].checked = event.target.checked;
    setValue(newValue);
  };

  return (
    <Box>
      {/* <Grid container direction={"column"} spacing={1}> */}
      {/* Title - Course Level */}

      <Typography sx={{ color: "#674EA7" }}> {headerText}</Typography>

      {/* Body - checklist */}
      <Box sx={{paddingLeft: 1}}>
        <FormGroup>
          {itemList.map((element, index) => {
            return (
              <FormControlLabel
                key={element.id}
                onChange={(event) => handleChange(event, index)}
                control={<Checkbox />}
                label={element.label}
              />
            );
          })}
        </FormGroup>
      </Box>

      {/* </Grid> */}
    </Box>
  );
}
