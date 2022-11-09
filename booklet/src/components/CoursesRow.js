import {useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import {Button, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
  actionButtons: {
    borderRadius: '15px !important',
    width: '68px',
    fontSize: '8px !important',
    fontWeight: '700 !important'
  },
  rowCell: {
  }
});

export default function CoursesRow({row, isAdded}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  console.log(row, isAdded)

  return (
    <>
      <TableRow sx={{ '& > *': { border: '.5px solid lightgrey', width:'fit-content' }}}>
        {
          Object.entries(row).map( (data, index) => {
            const rowContent = data[1]
            if (index+1 < Object.entries(row).length) {
              return (
                <TableCell className={classes.rowCell} align='center' key={index}>
                  <Typography fontSize={11}>
                    {rowContent}
                  </Typography>
                </TableCell>
              )
            }
          })
        }
        <TableCell className={classes.rowCell} align="center">
          <Grid container direction='row'>
            <Grid item xs={5.5}>
              <Button
                className={classes.actionButtons}
                variant="contained"
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                color="info"
              >
                {open ? 'close': 'See More'}
              </Button>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={5.5}>
              <Button
                className={classes.actionButtons}
                variant="contained"
                aria-label="expand row"
                size="small"
                onClick={() => console.log("ADD_CLASS_WAS_CLICKED")}
                color="success"
                disabled={isAdded}
              >
                Add Class
              </Button>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.moreInfo.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

CoursesRow.propTypes = {
  row: PropTypes.shape({
    availability: PropTypes.number.isRequired,
    enrollment: PropTypes.number.isRequired,
    courseNum: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    section: PropTypes.number.isRequired,
    credits: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    days: PropTypes.string.isRequired,
    building: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    isAdded: PropTypes.bool,
    moreInfo: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};