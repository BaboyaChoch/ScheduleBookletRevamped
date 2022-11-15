import {useEffect, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Button, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MiniCoursesTable from "./MiniCoursesTable";
import AlertAddClassWithLabModal from "./AlertAddClassWithLabModal";
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from "@mui/material/Tooltip";
import {DEFAULT_USER} from "../config/user";

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
  addClassModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
});

export default function CoursesRow({ row, isAdded, labInfo, moreInfo }) {
  const classes = useStyles();
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [openAddLabNoticeModal, setOpenAddLabNoticeModal] = useState(false);
  const [courseNotAddableReason, setCourseNotAddableReason] = useState(undefined);
  const [isNotAddable, setIsNotAddable] = useState(true)

  const LabeledText = ({ label, info }) => {
    label = MORE_INFO_LABEL_MAP[label];
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
              {info ? info : `No ${label} Available`}
            </Typography>
          </Grid>
          <Grid item xs={0.05} />
        </Grid>
      </Box>
    );
  };

  const handleAddLabNoticeModalOpen = () => setOpenAddLabNoticeModal(true);

  const handleAddLabNoticeModalClose = () => setOpenAddLabNoticeModal(false);

  // Todo: In the else statement, call function to add course to schedule modal
  const handleOnAddClass = (isClickedFromModalOrMoreInfo = false) => {
    if (!isClickedFromModalOrMoreInfo && labInfo) handleAddLabNoticeModalOpen();
    else console.log("ADD CLASS WAS CLICKED", isClickedFromModalOrMoreInfo);
  };

  const MORE_INFO_LABEL_MAP = {
    prereqs: "Prerequisites",
    notes: "Notes",
    desc: "Description",
  };

  const CLASS_NOT_ADDABLE_REASONS_MAP =  {
    ALREADY_ADDED : 'You have already added and or scheduled this course',
    NOT_PART_OF_MAJOR : 'Major does not match. You must be a major to take add this course',
    NOT_PART_OF_RES_HALL : 'Residental hall does not match. You must reside in the listed residental hall to add this course',
  }

  const getCourseCannotAddReason = () => {
    return "RANDOM CANNOT ADD REASON"
  }

  useEffect( () => {
    const courseDepartment = row.courseNum.split(' ')[0]

    if (isAdded) {
      setCourseNotAddableReason(CLASS_NOT_ADDABLE_REASONS_MAP.ALREADY_ADDED)
      setIsNotAddable(true)
    }
    else if (!DEFAULT_USER.majorDepartments.includes(courseDepartment)) {
      setCourseNotAddableReason(CLASS_NOT_ADDABLE_REASONS_MAP.NOT_PART_OF_MAJOR)
      setIsNotAddable(true)
    }
    else if (false) { // Todo: check if course is restricted by a res hall and check if the stundet's res hall is part of the list if it is
      setCourseNotAddableReason(CLASS_NOT_ADDABLE_REASONS_MAP.NOT_PART_OF_RES_HALL)
      setIsNotAddable(true)
    }
    else {
      setIsNotAddable(false)
    }

  }, [])

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
                onClick={() => setOpenMoreInfo(!openMoreInfo)}
                color="info"
              >
                {openMoreInfo ? "close" : "More Info"}
              </Button>
            </Grid>
            <Grid item xs={1} />
            <Grid item container xs={5.5} direction='row' flexWrap='nowrap'  >
              {/*Todo: Clearly communciate reason (text or icon) for class being unaddable instead of just disabling*/}
              <Grid item>
                <Button
                    className={classes.actionButtons}
                    variant="contained"
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleOnAddClass()}
                    color="success"
                    disabled={isNotAddable || (openMoreInfo && labInfo)}
                    sx={{ color: "white" }}
                >
                  Add Class
                </Button>
              </Grid>
              {/*Todo: Possibly consider how we notify the user the reason a course may not be addable */}
              <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                {isNotAddable ? <Tooltip title={courseNotAddableReason}><InfoIcon sx={{fontSize: 15, color: 'red'}} /></Tooltip> : ''}
              </Grid>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={openMoreInfo} timeout="auto" unmountOnExit>
            <Box className={classes.moreInfoCont}>
              <Grid container direction="column">
                <Grid item>
                  <Box>
                    <Stack
                      direction="row"
                      spacing={1}
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
                      {labInfo ? (
                        <Typography
                          gutterBottom
                          component="div"
                          sx={{
                            fontSize: 10,
                            color: "red",
                            border: "1px solid red",
                            p: 0.2,
                          }}
                        >
                          This class has a lab
                        </Typography>
                      ) : (
                        ""
                      )}
                      {moreInfo.specialEnrollment ? (
                        <Typography
                          gutterBottom
                          component="div"
                          sx={{
                            fontSize: 10,
                            color: "red",
                            border: "1px solid red",
                            p: 0.2,
                          }}
                        >
                          {moreInfo.specialEnrollment
                            ? moreInfo.specialEnrollment
                            : ""}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Stack>
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
                    {Object.entries(moreInfo).map(([label, info], index) => {
                      if (label != "specialEnrollment") {
                        return (
                          <Grid key={index} item>
                            <LabeledText label={label} info={info} />
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </Grid>
                <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {labInfo ? (
                    <Button
                      variant="contained"
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleOnAddClass(true)}
                      color="success"
                      disabled={isAdded}
                      sx={{
                        borderRadius: "15px !important",
                        width: "fit-content",
                        fontSize: "8px !important",
                        fontWeight: "700 !important",
                        color: "white",
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
      {labInfo ? (
        <AlertAddClassWithLabModal
          rows={[
            [
              row.courseNum,
              labInfo.labTime,
              labInfo.labDays,
              labInfo.labInstructor,
            ],
          ]}
          open={openAddLabNoticeModal}
          onClose={() => handleAddLabNoticeModalClose()}
          onAddClass={() => handleOnAddClass(true)}
        />
      ) : (
        ""
      )}
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
  }).isRequired,
};