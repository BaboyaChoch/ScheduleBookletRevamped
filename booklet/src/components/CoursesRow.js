import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MiniCoursesTable from "./MiniCoursesTable";

const useStyles = makeStyles({
  actionButtons: {
    borderRadius: "15px !important",
    width: "68px",
    fontSize: "8px !important",
    fontWeight: "700 !important",
  },
  rowCell: {},
  moreInfoCont: {
    margin: 1,
    width: "100%",
  },
});

export default function CoursesRow({ row, isAdded, labInfo }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const MORE_INFO = {
    Prerequisites:
      "This is a test note This is a test prereq This is a test note This is a test prereqThis is a test note This is a " +
      "test prereqThis is a test note This is a test prereqThis is a test note This is a test prereq",
    Notes:
      "This is a test note This is a test note This is a test note This is a test note  This is a test note" +
      " This is a test note This is a test note This is a test note This is a test note This is a test note ",
    Description:
      "This is a test note This is a test desc This is a test note This is a test desc This is a test note This " +
      "is a test descThis is a test note This is a test desc",
  };

  const LabeledText = ({ label, info }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Grid container>
          <Grid item xs={1}>
            <Typography
              gutterBottom
              component="div"
              sx={{ fontSize: 12, fontWeight: 700 }}
            >
              {`${label}`}&nbsp;
            </Typography>
          </Grid>
          <Grid item xs={labInfo ? 0.25 : 0} />
          <Grid
            item
            xs={labInfo ? 10.7 : 10.95}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              gutterBottom
              component="div"
              sx={{ fontSize: 10, fontWeight: 500 }}
            >
              {`${info}`}
            </Typography>
          </Grid>
          <Grid item xs={0.05} />
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { border: ".5px solid lightgrey", width: "fit-content" },
        }}
      >
        {Object.entries(row).map((data, index) => {
          const rowContent = data[1];
          if (index + 1 < Object.entries(row).length) {
            return (
              <TableCell className={classes.rowCell} align="center" key={index}>
                <Typography fontSize={11} fontWeight={500}>
                  {rowContent}
                </Typography>
              </TableCell>
            );
          }
        })}
        <TableCell className={classes.rowCell} align="center">
          <Grid container direction="row">
            <Grid item xs={5.5}>
              <Button
                className={classes.actionButtons}
                variant="contained"
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                color="info"
              >
                {open ? "close" : "More Info"}
              </Button>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5.5}>
              {/*Todo: Clearly communciate reason (text or icon) for class being unaddable instead of just disabling*/}
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={classes.moreInfoCont}>
              <Grid container direction="column">
                <Grid item>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{ fontSize: 14, fontWeight: 700 }}
                    >
                      More Info&nbsp;
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{ fontSize: 10, color: "red" }}
                    >
                      {labInfo ? "This class has a lab" : ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item container direction="row">
                  {labInfo ? (
                    <>
                      {" "}
                      <Grid item xs={0.1} />
                      <Grid item xs={3.4}>
                        <MiniCoursesTable
                          isLab
                          rows={[
                            [
                              row.courseNum,
                              labInfo.labTime,
                              labInfo.labDays,
                              labInfo.labInstructor,
                            ],
                          ]}
                        />
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
                  <Grid item xs={0.1} />
                  <Grid
                    item
                    container
                    direction="column"
                    xs={labInfo ? 8.4 : 11.9}
                  >
                    {Object.entries(MORE_INFO).map(([label, info], index) => (
                      <Grid item>
                        <LabeledText label={label} info={info} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {labInfo ? (
                    <Button
                      variant="contained"
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        console.log("A CLASS WITH A LAB HAS BEEN ADDED")
                      }
                      color="success"
                      disabled={isAdded}
                      sx={{
                        borderRadius: "15px !important",
                        width: "fit-content",
                        fontSize: "8px !important",
                        fontWeight: "700 !important",
                      }}
                    >
                      Add Full Course
                    </Button>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
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
      })
    ).isRequired,
  }).isRequired,
};
