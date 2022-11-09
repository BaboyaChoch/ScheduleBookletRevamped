import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CoursesRow from "./CoursesRow";
import {Grid, TableFooter, TextField} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {CoursesTablePaginationActions} from "./CoursesTablePaginationActions";
import {useState} from "react";

function createData(availability, enrollment, courseNum, courseName, type,
                    section, credits, time, days, building, instructor, isAdded) {
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
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

const rows = [
  {
    data: createData(69, 16, 'CSC 1240', 'Stats & Graph MatLab', 'Lec & Lab',
      1, 3,'11:30-12:00PM','M-W','Patrick Taylor','Brener N',false),
    isAdded: true,
    lab: {
      labTime: '1130-0120PM',
      labDays: 'F',
      labInstructor: 'Brener N'
    }
  },
  {
    data:   createData(34, 72, 'CSC 1253', 'COMP SCI WITH C++', 'Lec',
      1, 3,'12:00-1:20PM','T-TH','Patrick Taylor','Duncan W'),
    isAdded: false,
    lab: false
  },
  {
    data: createData(69, 16, 'CSC 1350', 'COMP SCI I-MJRS', 'Lec & Lab',
      2, 4,'9:30-10:20PM','M-W-F','Patrick Taylor','Donze D'),
    isAdded: false,
    lab: {
      labTime: '500-0750PM',
      labDays: 'M',
      labInstructor: 'Donze D'
    }
  },
  {
    data: createData(0, 131, 'CSC 1350', 'COMP SCI I-MJRS', 'Lec & Lab',
      1, 4,'10:30-11:20PM','M-W-F','Patrick Taylor','Aymond P'),
    isAdded: true,
    lab: {
      labTime: '4:30-0720PM',
      labDays: 'TH',
      labInstructor: 'Aymond P'
    }
  }
];

const tableHeaders = [
  'Availability','Enrollment','Course Num.',
  'Course Name','Type','Section','Credits','Time',
  'Days','Building','Instructor','Actions'
]

export default function CoursesTable() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(1)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{width:'100%'}}>
      <Box sx={{padding: '5px 0px 5px'}}>
        <Grid container>
          <Grid item xs={9} sx={{display:'flex', justifyContent:'flex-start', alignItems:'end'}}>
            <Typography fontSize={12} fontWeight={700} color={'#674EA7'}>
              Results for “Fall 2022 Computer Science” (150 Courses)
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{display:'flex', justifyContent:'flex-end'}}>
            <TextField
              label="Search Table"
              id="outlined-size-small"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper} sx={{height: 'fit-content', minWidth: 500}}>
        <Table aria-label="collapsible table" size='small'>
          <TableHead>
            <TableRow style={{}}>
              {
                tableHeaders.map( (headerName, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{fontSize:10, fontWeight: 700}}
                  >
                    {headerName}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <CoursesRow
                key={`${row.data.courseNum}-${row.data.section}`}
                row={row.data}
                isAdded={row.isAdded}
              />
            ))}
          </TableBody>
          {/*<TableFooter>*/}
          {/*  <TableRow>*/}
          {/*    <TablePagination*/}
          {/*      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}*/}
          {/*      colSpan={3}*/}
          {/*      count={rows.length}*/}
          {/*      rowsPerPage={rowsPerPage}*/}
          {/*      page={page}*/}
          {/*      SelectProps={{*/}
          {/*        inputProps: {*/}
          {/*          'aria-label': 'rows per page',*/}
          {/*        },*/}
          {/*        native: true,*/}
          {/*      }}*/}
          {/*      onPageChange={handleChangePage}*/}
          {/*      onRowsPerPageChange={handleChangeRowsPerPage}*/}
          {/*      ActionsComponent={TablePaginationActions}*/}
          {/*    />*/}
          {/*  </TableRow>*/}
          {/*</TableFooter>*/}
        </Table>
      </TableContainer>
    </Box>
  );
}