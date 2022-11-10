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

const useStyles = makeStyles({
  root: {},
});

export default function CoursesTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchKeyword, setSearchKeyword] = useState(undefined);
  const [filteredRows, setFilteredRows] = useState([]);
  const [isSearchFilterActive, setIsSearchFilterActive] = useState(false);

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
    instructor,
    isAdded
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
        "11:30-12:00PM",
        "M-W",
        "Patrick Taylor",
        "Brener N",
        false
      ),
      isAdded: true,
      lab: {
        labTime: "1130-0120PM",
        labDays: "F",
        labInstructor: "Brener N",
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
        "12:00-1:20PM",
        "T-TH",
        "Patrick Taylor",
        "Duncan W"
      ),
      isAdded: false,
      lab: null,
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
        "9:30-10:20PM",
        "M-W-F",
        "Patrick Taylor",
        "Donze D"
      ),
      isAdded: false,
      lab: {
        labTime: "500-0750PM",
        labDays: "M",
        labInstructor: "Donze D",
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
        "10:30-11:20PM",
        "M-W-F",
        "Patrick Taylor",
        "Aymond P"
      ),
      isAdded: true,
      lab: {
        labTime: "4:30-0720PM",
        labDays: "TH",
        labInstructor: "Aymond P",
      },
    },
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const isFilterActive = isSearchFilterActive;

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

  const lazyFilterRowsByKeyWord = (keyWord) => {
    keyWord = keyWord.toLowerCase();

    const newRows = rows.filter((row, index) => {
      for (const [key, value] of Object.entries(row.data)) {
        const val = value.toString().toLowerCase();
        if (val.includes(keyWord)) return true;
      }
      return false;
    });
    setFilteredRows(newRows);
    setIsSearchFilterActive(true);
  };

  const handleOnSearchEnter = (event) => {
    if (event.key === "Enter") {
      if (searchKeyword == "") {
        setFilteredRows([]);
        setIsSearchFilterActive(false);
      } else {
        lazyFilterRowsByKeyWord(searchKeyword);
      }
    }
  };
  useEffect(() => {
    console.log(filteredRows, filteredRows.length);
  }, [filteredRows]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ padding: "5px 0px 5px" }}>
        <Grid container>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "end",
            }}
          >
            <Typography fontSize={12} fontWeight={700} color={"#674EA7"}>
              {isFilterActive
                ? `Results for “${searchKeyword}” (${filteredRows.length} Courses)`
                : "Results for “Fall 2022 Computer Science” (150 Courses)"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <TextField
              label="Search Table"
              id="outlined-size-small"
              size="small"
              value={searchKeyword}
              onChange={handleSearchKeyWord}
              onKeyPress={handleOnSearchEnter}
            />
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
                  sx={{ fontSize: 10, fontWeight: 700 }}
                >
                  {headerName}
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
                isAdded={row.isAdded}
                labInfo={row.lab}
              />
            ))}
            {/*Todo: Decide to remove or keep empty rows*/}
            {/*{emptyRows > 0 && (*/}
            {/*  <TableRow style={{ height: 53 * emptyRows }}>*/}
            {/*    <TableCell colSpan={6} />*/}
            {/*  </TableRow>*/}
            {/*)}*/}
          </TableBody>
        </Table>
        {filteredRows.length < 1 && isFilterActive ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography fontSize={26} fontWeight={700}>
              No Search Results for "{searchKeyword}"
            </Typography>
          </Box>
        ) : (
          ""
        )}
        <Box sx={{ width: "100%" }}>
          <Grid container sx={{ width: "100%" }}>
            <Grid item xs={7} />
            <Grid item xs={5}>
              <TablePagination
                rowsPerPageOptions={[2, 3, 5, { label: "All", value: -1 }]}
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
