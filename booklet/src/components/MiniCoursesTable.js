import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import AlertUser from "./AlertUser";

const useStyles = makeStyles({
  tableCells: {
    backgroundColor: "#f6f4f1",
  },
  actionButtons: {
    borderRadius: "15px !important",
    width: "68px",
    fontSize: "8px !important",
    fontWeight: "700 !important",
  },
});

export default function MiniCoursesTable({
  sx,
  rows,
  isLab = false,
  handleRemove,
  scheduledRows,
  selectedRows,
}) {
  const classes = useStyles();
  const LAB_TABLE_HEADERS = ["Class", "Time", "Days", "Instructor"];
  const SCHEDULE_TABLE_HEADERS = [
    "Course Num.",
    "Section",
    "Credits",
    "Time",
    "Days",
    "Action",
  ];
  const getHeaders = isLab ? LAB_TABLE_HEADERS : SCHEDULE_TABLE_HEADERS;
  const [openDropCourseAlert, setOpenDropCourseAlert] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  useEffect(() => {}, [selectedRows, scheduledRows]);

  return (
    <>
      <Box
        sx={{ width: "100%", ...sx, border: isLab ? "1px solid #674EA7" : "" }}
      >
        <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {getHeaders.map((headerName, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ fontSize: 10, fontWeight: 700 }}
                    className={classes.tableCells}
                  >
                    {headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/*mini table for courses row*/}
              {isLab && rows.length < 2
                ? rows.map((row, index) => (
                    <TableRow key={index}>
                      {row.map((cell, index) => (
                        <TableCell key={index} className={classes.tableCells}>
                          <Typography
                            textAlign="center"
                            sx={{ fontSize: 9, fontWeight: "500" }}
                          >
                            {index ? cell : `${cell} ${isLab ? "Lab" : ""}`}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : null}

              {/*mini table for modal*/}

              {/*alreadyed schedule*/}
              {!isLab && scheduledRows
                ? scheduledRows.map((row, index) => (
                    <TableRow key={index}>
                      {row.map((cell, index) => (
                        <TableCell key={index} className={classes.tableCells}>
                          <Typography
                            textAlign="center"
                            sx={{ fontSize: 9, fontWeight: "500" }}
                          >
                            {cell}
                          </Typography>
                        </TableCell>
                      ))}
                      <TableCell key={index} className={classes.tableCells}>
                        <Button
                          className={classes.actionButtons}
                          variant="contained"
                          aria-label="expand row"
                          size="small"
                          onClick={() => {
                            setSelectedCourse([row[0], row[1]]);
                            setOpenDropCourseAlert(true);
                          }}
                          color="error"
                        >
                          DROP
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}

              {/*selected rows*/}
              {!isLab && selectedRows
                ? selectedRows.map((row, index) => (
                    <TableRow key={index}>
                      {row.map((cell, index) => (
                        <TableCell key={index} className={classes.tableCells}>
                          <Typography
                            textAlign="center"
                            sx={{ fontSize: 9, fontWeight: "500" }}
                          >
                            {cell}
                          </Typography>
                        </TableCell>
                      ))}
                      <TableCell key={index} className={classes.tableCells}>
                        <Button
                          className={classes.actionButtons}
                          variant="contained"
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleRemove(row[0], row[1])}
                          color="warning"
                        >
                          REMOVE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AlertUser
        open={openDropCourseAlert}
        onClose={() => setOpenDropCourseAlert(false)}
        message={`Are you sure you want to drop ${
          selectedCourse
            ? `this already scheduled course ? ${selectedCourse[0]}`
            : "this class?"
        }`}
        titleLabel="Drop Course?"
        acceptLabel="Drop Course"
        onAccept={() =>
          handleRemove(selectedCourse[0], selectedCourse[1], true)
        }
      />
    </>
  );
}
