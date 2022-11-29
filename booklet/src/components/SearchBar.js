import { useState } from "react";
import {
  TextField,
  Autocomplete,
  Typography,
  Button,
  Grid,
  Stack,
  useMediaQuery,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { getAllCoursesRequest } from "../lib/CoursesAPI";
const useStyles = makeStyles({
  content: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default function Search({
  semesterValue,
  setSemesterValue,
  departmentValue,
  setDepartmentValue,
  courses,
  setCourses,
  setShowResults,
}) {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const [showErrorHelperMessage, setShowErrorHelperMessage] = useState(false);

  const handleSemesterYearInputChange = (event, value) => {
    if (value !== "" || value.length > 1) {
      setSemesterValue(value);
    } else {
      setSemesterValue(null);
    }
  };

  const handleDepartmentInputChange = (event, value) => {
    if (value !== "" || value.length > 1) {
      setDepartmentValue(value);
    } else {
      setDepartmentValue(null);
    }
  };

  const SEMESTER_DEPARTMENT_TO_API_ENDPOINT_MAP = {
    "Fall 2022 Computer Science": "Fall_2022_CSC",
    "Fall 2022 Art History": "Fall_2022_Art_History",
    "Spring 2023 Computer Science": "Spring_2023_CSC",
    "Spring 2023 Art History": "Spring_2023_Art_History",
  };

  const getTime = (timeString) => {
    if (timeString == "TBA") return "TBA";

    let [start, end] = timeString.split("-");
    end = end.replace("N", "");
    let startTimePostFix, endTimePostFix;
    startTimePostFix = endTimePostFix = "AM";

    // 12pm to 559pm
    if (
      parseInt(start) <= 559 ||
      (1200 <= parseInt(start) && parseInt(start) <= 1259)
    ) {
      startTimePostFix = "PM";
    }
    // 629pm to 830pm
    else if (600 <= parseInt(start) <= 830 && timeString.includes("N")) {
      startTimePostFix = "PM";
    }

    //12pm to 719pm
    if (
      (1200 <= parseInt(end) && parseInt(end) <= 1259) ||
      (100 <= parseInt(end) && parseInt(end) <= 659)
    ) {
      endTimePostFix = "PM";
    }
    // 730pm to 9:30pm
    else if (
      700 <= parseInt(end) &&
      parseInt(end) <= 930 &&
      timeString.includes("N")
    ) {
      endTimePostFix = "PM";
    }

    start = start.split("");
    if (start.length === 3) start.splice(0, 0, "0");
    start.splice(2, 0, ":");

    end = end.split("");
    end.splice(2, 0, ":");

    return `${start.join("")}${startTimePostFix}-${end.join(
      ""
    )}${endTimePostFix}`;
  };

  const courseNumberDescendingComparator = (a, b) => {
    a = parseInt(a.data["courseNum"].split(" ")[1]);
    b = parseInt(b.data["courseNum"].split(" ")[1]);

    if (b < a) {
      return 1;
    }
    if (b > a) {
      return -1;
    }
    return 0;
  };

  const structureCoursesData = (coursesList) => {
    const newCoursesList = [];
    for (const course of coursesList) {
      newCoursesList.push({
        data: {
          availability: course.availability,
          enrollment: course.enrollment,
          courseNum: course.coursenum,
          courseName: course.coursename,
          type: course.type,
          section: course.section,
          credits: course.credits,
          time: getTime(course.time),
          days: course.days,
          building: course.building,
          instructor: course.instructor,
          actions: null, // empty row for actions
        },
        lab:
          course.lab !== null
            ? {
                labTime: getTime(course.lab.labtime),
                labDays: course.lab.labdays,
                labInstructor: course.lab.labinstructor,
              }
            : null,
        moreInfo: {
          prereqs: course.prereqs,
          notes: course.notes,
          desc: course.description,
          specialEnrollment: course.specialenrollment,
        },
      });
    }
    // show courses in descending order by default
    return newCoursesList.sort((a, b) =>
      courseNumberDescendingComparator(a, b)
    );
  };

  const handleSearchCourses = () => {
    if (semesterValue && departmentValue) {
      console.log("CURRENT: ", semesterValue, departmentValue);
      setShowErrorHelperMessage(false);

      const semesterDepartment =
        SEMESTER_DEPARTMENT_TO_API_ENDPOINT_MAP[
          `${semesterValue} ${departmentValue}`
        ];

      getAllCoursesRequest(semesterDepartment).then((response) => {
        setCourses(structureCoursesData(response));
        setShowResults(true);
        // show courses;
      });
    } else {
      setShowErrorHelperMessage(true);
    }
  };

  return (
    <Grid container direction={isSmallScreen ? "column" : "row"}>
      <Grid
        className={classes.content}
        item
        xs={2.5}
        sx={{ m: 2, marginLeft: 0, marginRight: 12 }}
      >
        <Stack>
          <Typography fontWeight="bold" color="#674EA7" sx={{ m: 1 }}>
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
      <Grid
        className={classes.content}
        item
        xs={3.3}
        sx={{ m: 2, marginLeft: isSmallScreen ? 0 : "", marginRight: 12 }}
      >
        <Stack>
          <Typography fontWeight="bold" color="#674EA7" sx={{ m: 1 }}>
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
      <Grid
        item
        xs={1.2}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          m: 2,
          marginLeft: isSmallScreen ? 0 : "",
        }}
      >
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
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "flex-end",
          marginLeft: isSmallScreen ? 0 : "",
        }}
      >
        {showErrorHelperMessage ? (
          <Typography
            sx={{
              color: "#d32f2f",
              p: isSmallScreen ? 0 : 1.3,
              m: 2,
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            Make selection for both Semester/Year and Department
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
}

const Semester = [
  { value: "Spring 2023", label: "Spring 2023" },
  { value: "Fall 2022", label: "Fall 2022" },
];

const Department = [
  { value: "Art History", label: "Art History" },
  { value: "Computer Science", label: "Computer Science" },
];
