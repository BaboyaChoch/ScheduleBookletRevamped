import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableCells: {
    backgroundColor: "#f6f4f1",
  },
});

export default function MiniCoursesTable({ sx, rows, isLab = false }) {
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

  return (
    <Box sx={{ width: "100%", ...sx, border: isLab ? "1px solid #674EA7" : '' }}>
      <TableContainer component={Paper} sx={{boxShadow:0}}>
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
            {rows.map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, index) => (
                  <TableCell key={index} className={classes.tableCells}>
                    <Typography sx={{ fontSize: 9, fontWeight: "500" }}>
                      {index ? cell : `${cell} Lab`}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
