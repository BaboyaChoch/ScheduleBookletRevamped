import * as React from "react";
import { useEffect, useState } from "react";
import {
  TextField,
  Autocomplete,
  Typography,
  Button,
  Grid,
} from "@mui/material";

export default function Search() {
  return (
    <Grid container sx={{ backgroundColor: "" }}>
      <Grid item xs={4} sx={{ ml: 3, mt: 2, backgroundColor: "" }}>
        <Typography fontWeight="bold" color="#674EA7">
          Semester / Year{" "}
        </Typography>
      </Grid>
      <Grid item xs={5} sx={{ mt: 2, backgroundColor: "" }}>
        <Typography fontWeight="bold" color="#674EA7">
          Department
        </Typography>
      </Grid>

      <Grid item xs={4} sx={{ backgroundColor: "" }}>
        <Autocomplete
          componentsProps={{ paper: { sx: { width: 250, margin: "auto" } } }}
          disablePortal
          id="auto-highlight"
          size="small"
          options={Semester}
          noOptionsText="No Results"
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  boxShadow: 1,
                },
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4} sx={{ backgroundColor: "" }}>
        <Autocomplete
          componentsProps={{ paper: { sx: { width: 350, margin: "auto" } } }}
          disablePortal
          id="auto-highlight"
          size="small"
          options={Department}
          noOptionsText="No Results"
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  boxShadow: 1,
                },
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          sx={{
            color: "white",
            borderRadius: 3,
            textTransform: "capitalize",
            fontWeight: "bold",
            backgroundColor: "#674EA7",
          }}
          onClick
          {...() => {
            alert("clicked");
          }}
        >
          Search Courses
        </Button>
      </Grid>
    </Grid>
  );
}

const Semester = [{ label: "Spring 2023" }, { label: "Fall 2022" }];

const Department = [{ label: "Art History" }, { label: "Computer Science" }];
