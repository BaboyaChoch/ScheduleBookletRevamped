import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CoursesRow from "./CoursesRow";
import { Grid, TableFooter, TextField } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { CoursesTablePaginationActions } from "./CoursesTablePaginationActions";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { DEFAULT_USER } from "../config/user";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const useStyles = makeStyles({
  root: {},
  tableSearchInput: {
    borderRadius: "11px !important",
  },
});

export default function CoursesTable({sidebarFilters, setSidebarFilters}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState(undefined);
  const [orderBy, setOrderBy] = useState(undefined);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [isSearchFilterActive, setIsSearchFilterActive] = useState(false);
  const [isHeaderSortActive, setIsHeaderSortActive] = useState(false);
  const [isFilterSidebarActive, setIsFitlerSidebarActive] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState("availability");
  const [tempSearchFilterResults, setTempSearchFilterResults] =
    useState([]);
  const [tempSidebarFilterResults, setTempSidebarFilterResults] =
    useState([]);
  const isFilterActive = isSearchFilterActive || isHeaderSortActive || isFilterSidebarActive;

  const createData = (
    availability,
    enrollment,
    courseNum,
    courseName,
    type,
    section,
    credits,
    time,
    days,
    building,
    instructor
  ) => {
    return {
      availability,
      enrollment,
      courseNum,
      courseName,
      type,
      section,
      credits,
      time,
      days,
      building,
      instructor,
      moreInfo: [
        {
          date: "2020-01-05",
          customerId: "11091700",
          amount: 3,
        },
        {
          date: "2020-01-02",
          customerId: "Anonymous",
          amount: 1,
        },
      ],
    };
  };

  const getTime = (timeString) => {
    if (timeString == "TBA")
      return "TBA"
    let [start, end] = timeString.split("-");

    let timePrefix = "AM";

    if (parseInt(start) < 600 || parseInt(start) === 1200) {
      timePrefix = "PM";
    }

    if (parseInt(end) > 930) {
      timePrefix = "AM";
    }

    start = start.split("");
    if (start.length === 3) start.splice(0, 0, "0");
    start.splice(2, 0, ":");

    end = end.split("");
    end.splice(2, 0, ":");

    return `${start.join("")}-${end.join("")} ${timePrefix}`;
  };

  const getTime2 = (timeString) => {
    if (timeString == "TBA")
      return "TBA"

    let [start, end] = timeString.split("-");
    let [startTimePostFix, endTimePostFix] = "AM";

    // 12pm to 629pm
    if (parseInt(start) <= 629 || parseInt(start) === 1200) {
      startTimePostFix = "PM";
    }

    // 629pm to 830pm
    else if ((630 <= parseInt(start) <= 830) && timeString.includes('N')) {
      startTimePostFix = "PM";
    }

    if (parseInt(end) >= 930) {
      endTimePostFix = "AM";
    }

    start = start.split("");
    if (start.length === 3) start.splice(0, 0, "0");
    start.splice(2, 0, ":");

    end = end.split("");
    end.splice(2, 0, ":");

    return `${start.join("")}${startTimePostFix}-${end.join("")}${endTimePostFix}`;
  };

  const rows = [
    {
      data: createData(
        69,
        16,
        "CSC 1240",
        "Stats & Graph MatLab",
        "Lec & Lab",
        1,
        3,
        getTime("1130-1200"),
        "M W",
        "Patrick Taylor",
        "Brener N"
      ),
      lab: {
        labTime: getTime("1130-0120"),
        labDays: "F",
        labInstructor: "Brener N",
      },
      moreInfo: {
        prereqs:
          "This is a test note This is a test prereq This is a test note This is a test prereqThis is a test note This is a " +
          "test prereqThis is a test note This is a test prereqThis is a test note This is a test prereq",
        notes:
          "This is a test note This is a test note This is a test note This is a test note  This is a test note" +
          " This is a test note This is a test note This is a test note This is a test note This is a test note ",
        desc: null,
        specialEnrollment: " CI-WRITTEN&SPOK",
      },
    },
    {
      data: createData(
        34,
        72,
        "CSC 1253",
        "COMP SCI WITH C++",
        "Lec",
        1,
        3,
        getTime("1200-0120"),
        "T TH",
        "Patrick Taylor",
        "Duncan W"
      ),
      lab: null,
      moreInfo: {
        prereqs:
          "This is a test note This is a test prereq This is a test note This is a test prereqThis is a test note This is a " +
          "test prereqThis is a test note This is a test prereqThis is a test note This is a test prereq",
        notes: null,
        desc:
          "This is a test note This is a test desc This is a test note This is a test desc This is a test note This " +
          "is a test descThis is a test note This is a test desc",
        specialEnrollment: "100% Web Based",
      },
    },
    {
      data: createData(
        69,
        16,
        "CSC 1350",
        "COMP SCI I-MJRS",
        "Lec & Lab",
        2,
        4,
        getTime("930-1020"),
        "M W F",
        "Patrick Taylor",
        "Donze D"
      ),
      lab: {
        labTime: getTime("500-0750"),
        labDays: "M",
        labInstructor: "Donze D",
      },
      moreInfo: {
        prereqs:
          "This is a test note This is a test prereq This is a test note This is a test prereqThis is a test note This is a " +
          "test prereqThis is a test note This is a test prereqThis is a test note This is a test prereq",
        notes:
          "This is a test note This is a test note This is a test note This is a test note  This is a test note" +
          " This is a test note This is a test note This is a test note This is a test note This is a test note ",
        desc:
          "This is a test note This is a test desc This is a test note This is a test desc This is a test note This " +
          "is a test descThis is a test note This is a test desc",
        specialEnrollment: "",
      },
    },
    {
      data: createData(
        0,
        131,
        "CSC 1350",
        "COMP SCI I-MJRS",
        "Lec & Lab",
        1,
        4,
        getTime("1030-1120"),
        "M W F",
        "Patrick Taylor",
        "Aymond P"
      ),
      lab: {
        labTime: getTime("430-0720"),
        labDays: "TH",
        labInstructor: "Aymond P",
      },
      moreInfo: {
        prereqs:
          "This is a test note This is a test prereq This is a test note This is a test prereqThis is a test note This is a " +
          "test prereqThis is a test note This is a test prereqThis is a test note This is a test prereq",
        notes:
          "This is a test note This is a test note This is a test note This is a test note  This is a test note" +
          " This is a test note This is a test note This is a test note This is a test note This is a test note ",
        desc:
          "This is a test note This is a test desc This is a test note This is a test desc This is a test note This " +
          "is a test descThis is a test note This is a test desc",
        specialEnrollment: "",
      },
    },
    {
      data: createData(
        18,
        162,
        "CSC 2259",
        "DISCRETE STRUCTURES ",
        "Lec",
        1,
        3,
        getTime("1200-0120"),
        "T TH",
        "Patrick Taylor",
        "SHAH R"
      ),
      lab: null,
      moreInfo: {
        prereqs:
          "This is a test note This is a test prereq This is a test note This is a test prereqThis is a test note This is a " +
          "test prereqThis is a test note This is a test prereqThis is a test note This is a test prereq",
        notes:
          "This is a test note This is a test note This is a test note This is a test note  This is a test note" +
          " This is a test note This is a test note This is a test note This is a test note This is a test note ",
        desc: null,
        specialEnrollment: " CI-WRITTEN&SPOK",
      },
    },
    {
      data: createData(
        30,
        130,
        "CSC 3102",
        "ADV DATA STRUCTURES",
        "Lec",
        1,
        3,
        getTime("900-1020"),
        "T TH",
        "Patrick Taylor",
        "DUNCAN W"
      ),
      lab: null,
      moreInfo: {
        prereqs:
          "This is a test note This is a test prereq This is a test note This is a test prereqThis is a test note This is a " +
          "test prereqThis is a test note This is a test prereqThis is a test note This is a test prereq",
        notes:
          "This is a test note This is a test note This is a test note This is a test note  This is a test note" +
          " This is a test note This is a test note This is a test note This is a test note This is a test note ",
        desc: null,
        specialEnrollment: " CI-WRITTEN&SPOK",
      },
    },
    {
      data: createData(
        14,
        6,
        "CSC 7090",
        "DESIGN PROJECT",
        "Lec",
        1,
        "1-9",
        getTime("TBA"),
        "",
        "",
        "CHEN J"
      ),
      lab: null,
      moreInfo: {
        prereqs:
          "This is a test note This is a test prereq This is a test note This is a test prereqThis is a test note This is a " +
          "test prereqThis is a test note This is a test prereqThis is a test note This is a test prereq",
        notes:
          "This is a test note This is a test note This is a test note This is a test note  This is a test note" +
          " This is a test note This is a test note This is a test note This is a test note This is a test note ",
        desc: null,
        specialEnrollment: "PERMIS OF DEPT ",
      },
    }
  ];

  const TABLE_HEADERS = [
    "Availability",
    "Enrollment",
    "Course Num.",
    "Course Name",
    "Type",
    "Section",
    "Credits",
    "Time",
    "Days",
    "Building",
    "Instructor",
    "Actions",
  ];

  const TABLE_HEADERS_TO_ROW_PROP_MAP = {
    availability: "availability",
    enrollment: "enrollment",
    "course num.": "courseNum",
    "course name": "courseName",
    type: "type",
    section: "section",
    credits: "credits",
    time: "time",
    days: "days",
    building: "building",
    instructor: "instructor",
  };

  const SIDEBAR_FILTERS_NAME_TO_ROW_PROP_MAP = {
    availability: "availability",
    course_levels: "courseNum",
    credit_hours: "credits",
    course_times: "time",
    course_days: "days",
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const getRows = isFilterActive ? filteredRows : rows;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchKeyWord = (event) => {
    setSearchKeyword(event.target.value);
  };

  const getRowsToFilter = () => {
    console.log("getRowsToFilter: ",isFilterActive, filteredRows, filteredRows.length)
    return isFilterActive && filteredRows && filteredRows.length > 0
      ? JSON.parse(JSON.stringify(filteredRows))
      : JSON.parse(JSON.stringify(rows));
  };

  const lazyFilterRowsByKeyWord = (keyWord) => {
    keyWord = keyWord.toLowerCase();

    const newRows = getRowsToFilter().filter((row, index) => {
      for (const [key, value] of Object.entries(row.data)) {
        const val = value.toString().toLowerCase();
        if (key != 'time') {
          if (val.includes(keyWord)) return true;
        }
        // time will almost always have AM/PM, so any keyword searching for just 'm' is not
        // worth searching
        else if (keyWord != 'm') {
          console.log(keyWord, val)
          if (val.includes(keyWord)) return true;
        }
      }
      return false;
    });

    setFilteredRows(newRows);
    setTempSearchFilterResults(newRows);
    setIsSearchFilterActive(true);
  };

  const handleOnSearchEnter = (event) => {
    if (event.key === "Enter") {
      if (searchKeyword === "" && searchKeyword.length < 1) {
        setIsSearchFilterActive(false);
        setTempSearchFilterResults([]);

        if (!isFilterActive) {
          setFilteredRows([]);
        } else if (isFilterSidebarActive) {
          setFilteredRows(tempSidebarFilterResults);
        }

      } else {
        lazyFilterRowsByKeyWord(searchKeyword);
      }
    }
  };

  const compareValues = (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };

  const courseNumberDescendingComparator = (a, b) => {
    const prop = TABLE_HEADERS_TO_ROW_PROP_MAP["course num."];

    a = parseInt(a.data[prop].split(" ")[1]);
    b = parseInt(b.data[prop].split(" ")[1]);

    return compareValues(a, b);
  };

  const courseNameDescendingComparator = (a, b) => {
    const prop = TABLE_HEADERS_TO_ROW_PROP_MAP["course name"];

    a = a.data[prop];
    b = b.data[prop];

    return a.localeCompare(b);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy == "course num.") {
      return courseNumberDescendingComparator(a, b);
    }

    if (orderBy == "course name") {
      return courseNameDescendingComparator(a, b);
    }

    if (b.data[orderBy] < a.data[orderBy]) {
      return -1;
    }
    if (b.data[orderBy] > a.data[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    if (order === "desc") {
      return (a, b) => descendingComparator(a, b, orderBy);
    } else if (order === "asc") {
      return (a, b) => -descendingComparator(a, b, orderBy);
    }
  };

  const checkIsCourseAdded = (row) => {
    for (const course of DEFAULT_USER.currentScheduledClasses) {
      if (row.courseNum == course.courseNum && row.section == course.sectionNum)
        return true;
    }
    return false;
  };

  const handleOnHeaderClick = (event, headerName) => {
    const NON_SORTABLE_HEADERS = [
      "type",
      "time",
      "days",
      "building",
      "instructor",
      "actions",
    ];
    if (NON_SORTABLE_HEADERS.includes(headerName.toLowerCase())) {
      return;
    }

    headerName = headerName.toLowerCase();
    let newRows;

    if (selectedHeader != headerName || order === undefined) {
      setOrder("desc");
      newRows = getRowsToFilter().sort(getComparator("desc", headerName));
    } else if (order === "desc") {
      setOrder("asc");
      newRows = getRowsToFilter().sort(getComparator("asc", headerName));
    } else if (order === "asc") {
      setSelectedHeader(headerName);
      setOrderBy(undefined);
      setOrder(undefined);
      setIsHeaderSortActive(false);

      if (isSearchFilterActive) {
        setFilteredRows(tempSearchFilterResults);
      }
      else if (isFilterSidebarActive) {
        setFilteredRows(tempSidebarFilterResults)
      }

      return;
    }

    setSelectedHeader(headerName);
    setOrderBy(headerName);
    setFilteredRows(newRows);
    setIsHeaderSortActive(true);
  };

  const showHeaderSortDirection = () => {
    if (order === undefined)
      return (
        <ArrowUpwardIcon
          sx={{ fontSize: 15, color: "#C5C5C5", marginTop: 0.7 }}
        />
      );
    else if (order === "desc")
      return <ArrowDownwardIcon sx={{ fontSize: 15, marginTop: 0.7 }} />;
    else if (order === "asc")
      return <ArrowUpwardIcon sx={{ fontSize: 15, marginTop: 0.7 }} />;
  };

  const handleSidebarFilters = (filters) => {
    let newRows = JSON.parse(JSON.stringify(rows));
    // console.log("Table.js | handleSidebarFilters: ", filters);
    // console.log(newRows.data)

    // Availability Filter
    if (filters.availability === "FULL_COURSES" || filters.availability === "NON_FULL_COURSES") {
      newRows = newRows.filter((row, index) => {
        const currentCourseAvailability = row.data.availability;

        /**
         * filters.availability === FULL_COURSES means we are comparing for courses that have avl >= 1
         * filters.availability === NON_FULL_COURSES means we are comparing for courses that have avl < 1
         * negative avl ---> means there is a waitlist.
         *  for example: -3 AVL means 1 more on the waitlist
         */
        return (filters.availability === "NON_FULL_COURSES") ? currentCourseAvailability >= 1 : currentCourseAvailability < 1;
      });
    }

    // Course Level Filter
    if (filters.course_levels) {
      const VALID_COURSE_LEVELS = [];

      /**
       * course levels will be compared using the first digit, since id gives us the first digit,
       * we will build a list of valid levels using the ids of course levels that are checked
       */
      for (let lvl of filters.course_levels) {
        if (lvl.checked) {
          VALID_COURSE_LEVELS.push(lvl.id)
        }
      }

      /**
      * a course is choosen if its first digit is part of the list of VALID_COURSE_LEVELS
      *
      * NOTE: if 5000+ filter is choosen, 5 is part of the list of VALID_COURSE_LEVELS, any course
      *   whose first digit is greater than or equal to 5 will be choosen
      */
      newRows = newRows.filter((row, index) => {
        const prop = SIDEBAR_FILTERS_NAME_TO_ROW_PROP_MAP.course_levels
        const currentCourseLevel = parseInt(row.data[prop].split(" ")[1][0]);

        if (VALID_COURSE_LEVELS.includes(5) && currentCourseLevel >= 5)
          return true

        return VALID_COURSE_LEVELS.includes(currentCourseLevel)
      });
    }

    // Course Days Filter
    if (filters.course_days) {
      const VALID_COURSE_DAYS = [];

      /**
       * course days will be compared using the initials of a day.
       * Since label gives us the initials of the selected/checked day, we will build a list of
       * valid day initials to compare to the initials of a course
       */
      for (let day of filters.course_days) {
        if (day.checked) {
          VALID_COURSE_DAYS.push(day.label)
        }
      }

      /**
       * a course is choosen is scheduled on ALLchecked days
       *
       * NOTE: logically means ALL checked days initials are present in its days string
       */
      newRows = newRows.filter((row, index) => {
        const prop = SIDEBAR_FILTERS_NAME_TO_ROW_PROP_MAP.course_days
        const currentCourseDays = row.data[prop].split(" ");

        return VALID_COURSE_DAYS.every(day => currentCourseDays.includes(day));
      });

    }

    // Course Times Filter
    if (filters.course_times) {
      console.log("COURSE_tIME FILTER: ", filters.course_times);

      /**
       *
       */
      newRows = newRows.filter((row, index) => {

        const prop = SIDEBAR_FILTERS_NAME_TO_ROW_PROP_MAP.course_times
        const currentCourseCredits = row.data[prop]
        if (currentCourseCredits === "" || currentCourseCredits === "") return false
        console.log(row.data.courseNum, currentCourseCredits.split("-"));


        return false;
      });
    }

    // Credit Hours Filter
    if (filters.credit_hours) {
      const VALID_COURSE_CREDIT_HOURS = [];

      /**
       * course credits will be compared using the label of a credit option.
       * Since label gives us the credit numerical value of the selected/checked day, we will
       * build a list of valid day credits to compare to the credits val of a course
       */
      for (let credit of filters.credit_hours) {
        if (credit.checked) {
          VALID_COURSE_CREDIT_HOURS.push(credit.label)
        }
      }


      /**
       * A course is choosen a checked option is within its range, or if its one of the valid
       * checked options
       */
      newRows = newRows.filter((row, index) => {

        const prop = SIDEBAR_FILTERS_NAME_TO_ROW_PROP_MAP.credit_hours
        let currentCourseCredits = row.data[prop] + ''

        // some courses include a range for the credit hours instead of a singular numerical val
        if (currentCourseCredits.includes('-')) {
          const currentCourseCreditsRange = currentCourseCredits.split("-");
          const startCredit = parseInt(currentCourseCreditsRange[0])
          const endCredit = parseInt(currentCourseCreditsRange[1])

          /**
           * for classes that have a range of hours, choose them if atleast one of the valid
           * checked credit hours is within the range
           */
          for (const hour of VALID_COURSE_CREDIT_HOURS) {
            if (startCredit <= hour <= endCredit) {
              return true;
            }
          }
        }
        else{
          currentCourseCredits = parseInt(currentCourseCredits);
          return VALID_COURSE_CREDIT_HOURS.includes(currentCourseCredits);
        }

        return false;
      });
    }


    setFilteredRows(newRows);
    setTempSidebarFilterResults(newRows);
    setPage(0)
    setIsFitlerSidebarActive(true)
  }

  // useEffect(() => {
  //   console.log(
  //     "DEBUG FOR FITLERS IN COURSESTABLE.JS",
  //     filteredRows,
  //     filteredRows.length
  //   );
  // }, [filteredRows]);

  useEffect( () =>  {
    if (sidebarFilters) {
      console.log(sidebarFilters)
      handleSidebarFilters(sidebarFilters);
    }
  },[sidebarFilters])

  return (
    <Box sx={{ width: "100%"}}>
      <Box sx={{marginBottom: 2}}>
        <Grid container>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <Typography fontWeight={500} color="primary">
              {isFilterActive && isSearchFilterActive
                ? `Results for “${searchKeyword}” (${filteredRows.length} Courses)`
                : "Results for “Fall 2022 Computer Science” (150 Courses)"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box boxShadow={1} sx={{ borderRadius: 3 }}>
              <TextField
                label="Search Table"
                id="outlined-size-small"
                size="small"
                value={searchKeyword}
                onChange={handleSearchKeyWord}
                onKeyPress={handleOnSearchEnter}
                sx={{ borderRadius: 3 }}
                InputProps={{
                  className: classes.tableSearchInput,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500 }}
          aria-label="custom pagination table"
          size="small"
        >
          <TableHead>
            <TableRow style={{}}>
              {TABLE_HEADERS.map((headerName, index) => (
                <TableCell
                  key={index}
                  align="center"
                  onClick={(event) => handleOnHeaderClick(event, headerName)}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid item>
                      <Typography sx={{ fontSize: 10, fontWeight: 700 }}>
                        {headerName}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Grid item>
                        {selectedHeader == headerName.toLowerCase()
                          ? showHeaderSortDirection(headerName)
                          : ""}
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? getRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : getRows
            ).map((row) => (
              <CoursesRow
                key={`${row.data.courseNum}-${row.data.section}`}
                row={row.data}
                isAdded={checkIsCourseAdded(row.data)}
                labInfo={row.lab}
                moreInfo={row.moreInfo}
              />
            ))}
            {/*{emptyRows > 0 && (*/}
            {/*  <TableRow style={{ height: 53 * emptyRows }}>*/}
            {/*    <TableCell colSpan={6} />*/}
            {/*  </TableRow>*/}
            {/*)}*/}
          </TableBody>
        </Table>
        {filteredRows.length < 1 && false ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {
              isSearchFilterActive ? (
                <Typography fontSize={26} fontWeight={700}>
                  No Search Results for "{searchKeyword}"
                </Typography>
              ) : (
                <Typography fontSize={26} fontWeight={700}>
                  No Search Results Match Selected Filters
                </Typography>
              )
            }
          </Box>
        ) : (
          ""
        )}
        <Box sx={{ width: "100%" }}>
          <Grid container sx={{ width: "100%" }}>
            <Grid item xs={7} />
            <Grid item xs={5}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={CoursesTablePaginationActions}
              />
            </Grid>
          </Grid>
        </Box>
      </TableContainer>
    </Box>
  );
}