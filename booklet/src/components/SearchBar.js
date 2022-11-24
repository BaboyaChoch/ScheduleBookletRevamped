import * as React from "react";
import { useEffect, useState } from "react";
import {
  TextField,
  Autocomplete,
  Typography,
  Button,
  Grid, Stack,
  useMediaQuery,
} from "@mui/material";

import {makeStyles} from "@mui/styles";
const useStyles = makeStyles({
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default function Search({semesterValue, setSemesterValue, departmentValue, setDepartmentValue, setTotalCourses}) {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const [showErrorHelperMessage, setShowErrorHelperMessage] = useState(false);

  const handleSemesterYearInputChange = (event, value) => {
    if (value !== '' || value.length > 1){
      setSemesterValue(value)
    } else{
      setSemesterValue(null)
    }
  }

  const handleDepartmentInputChange = (event, value) => {
    if (value !== '' || value.length > 1){
      setDepartmentValue(value)
    } else {
      setDepartmentValue(null)
    }
  }

  const handleSearchCourses = () => {
    if (semesterValue && departmentValue) {
      setShowErrorHelperMessage(false)
      // initiate search
      setTotalCourses(17)
      alert("starting search.....")

    } else{
      setShowErrorHelperMessage(true)
    }
  }

  return (
    <Grid container direction={isSmallScreen ? 'column' : 'row'}>
      <Grid className={classes.content} item xs={2.5} sx={{m: 2, marginLeft: 0, marginRight: 12}}>
        <Stack>
          <Typography fontWeight="bold" color="#674EA7" sx={{m: 1}}>
            Semester / Year
          </Typography>
          <Autocomplete
            componentsProps={{ paper: { sx: { width: 250, margin: "auto" } } }}
            disablePortal
            id="auto-highlight"
            size="small"
            options={Semester}
            noOptionsText="No Options..="
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
            onInputChange={handleSemesterYearInputChange}
          />
        </Stack>
      </Grid>
      <Grid className={classes.content} item xs={3.3} sx={{m: 2, marginLeft: isSmallScreen ? 0 : '', marginRight: 12}}>
        <Stack>
          <Typography fontWeight="bold" color="#674EA7" sx={{m: 1}}>
            Department
          </Typography>
          <Autocomplete
            componentsProps={{ paper: { sx: { width: 350, margin: "auto" } } }}
            disablePortal
            id="auto-highlight"
            size="small"
            options={Department}
            noOptionsText="No Options..="
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
            onInputChange={handleDepartmentInputChange}

          />
        </Stack>
      </Grid>
      <Grid item xs={1.2} sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        m: 2,
        marginLeft: isSmallScreen ? 0 : ''
      }} >
        <Button
          variant="contained"
          sx={{
            color: "white",
            borderRadius: 3,
            textTransform: "capitalize",
            fontWeight: "bold",
            backgroundColor: "#674EA7",
          }}
          onClick={handleSearchCourses}
        >
          Search Courses
        </Button>
      </Grid>
      <Grid item sx={{display: 'flex', alignItems: 'flex-end', marginLeft: isSmallScreen ? 0 : ''}}>
        {
          showErrorHelperMessage ?
            <Typography sx={{color: '#d32f2f', p: isSmallScreen ? 0 : 1.3, m: 2, fontSize: 11, fontWeight: 500}}>
              Make selection for both Semester/Year and Department
            </Typography> : null
        }
      </Grid>
    </Grid>
  );
}

const Semester = [
  { value: "Spring 2023" , label: "Spring 2023" },
  { value: "Fall 2022", label: "Fall 2022" }
];

const Department = [
  { value: "Art History", label: "Art History" },
  { value: "Computer Science", label: "Computer Science" }
];
