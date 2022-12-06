import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//File Imports
import MiniCoursesTable from "./MiniCoursesTable";
import AlertUser from "./AlertUser";

// dayjs file imports
//import * as dayjs from "dayjs";

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
export default function SearchModel({
  selectedCourses,
  setSelectedCourses,
  scheduledCourses,
  setScheduledCourses,
}) {
  const [randTableKey, setRandTableKey] = useState(0);
  const [openScheduleCourseAlert, setOpenScheduleCourseAlert] = useState(false);
  const [conflictingCoursesList, setConflictingCoursesList] = useState([]);

  const ON_SCHEDULE_RESULT_MESSAGES = {
    TIME_CONFLICT:
      "Unfortunately there are some conflicts between the below courses. Please address them and reschedule :)",
    SUCCESS: "Your Schedule looks good to me! No Conflicts!!!!",
  };

  const handleOnRemove = (courseNum, courseSection, drop = false) => {
    const onRemoveEvent = new Event("onClassRemoved");

    if (drop) {
      for (let i = 0; i < scheduledCourses.length; i++) {
        if (
          scheduledCourses[i][0] == courseNum &&
          scheduledCourses[i][1] == courseSection
        ) {
          scheduledCourses.splice(i, 1);
          setScheduledCourses(scheduledCourses);
          setRandTableKey(Math.random());

          window.dispatchEvent(onRemoveEvent);
        }
      }
    } else {
      for (let i = 0; i < selectedCourses.length; i++) {
        if (
          selectedCourses[i][0] == courseNum &&
          selectedCourses[i][1] == courseSection
        ) {
          console.log("REMOVED", selectedCourses[i][0], selectedCourses[i][1]);
          selectedCourses.splice(i, 1);
          setSelectedCourses(selectedCourses);
          setRandTableKey(Math.random());

          window.dispatchEvent(onRemoveEvent);
        }
      }
    }
  };

  const compareTime = (a, b) => {
    if (a.isAfter(b)) return 1;

    if (b.isAfter(a)) return -1;

    return 0;
  };

  const handleOnSchedule = () => {
    const selectedCourse = [...scheduledCourses, ...selectedCourses];
    const courseConflictsList = [];

    const scheduleByDayBreakDown = {
      M: [],
      T: [],
      W: [],
      TH: [],
      F: [],
    };

    // build a list of time intrevals
    for (const course of selectedCourse) {
      // we will just check time conflicts. time is stored at index 3
      if (course[3] === "TBA") continue;

      const [start, end] = course[3].split("-");
      console.log("TIMES: ", start, end);

      // dayjs works with 24 hour times, so we must convert if 12H to 24H by adding 12 hours if it is PM
      const courseStartTime = start.includes("PM")
        ? dayjs(start, "hh:mm A").add(12, "hour")
        : dayjs(start, "hh:mm A");

      const courseEndTime = end.includes("PM")
        ? dayjs(end, "hh:mm A").add(12, "hour")
        : dayjs(end, "hh:mm A");

      // days are stored at index 4
      const courseDays = course[4].split(" ");

      for (const day of courseDays) {
        if (scheduleByDayBreakDown[day])
          scheduleByDayBreakDown[day].push([
            courseStartTime,
            courseEndTime,
            course[0],
          ]);
      }
    }
    console.log(scheduleByDayBreakDown);

    for (const day of Object.keys(scheduleByDayBreakDown)) {
      // if the schedule on that day has 1 class or none, there cant be no conflicts
      if (scheduleByDayBreakDown[day].length <= 1) continue;

      const sortedSchedule = scheduleByDayBreakDown[day].sort((a, b) =>
        compareTime(a[0], b[0])
      );

      for (let i = 0; i < sortedSchedule.length - 1; i++) {
        console.log("FS", sortedSchedule[i], sortedSchedule[i + 1]);
        const [firstStart, firstEnd, firstClass] = sortedSchedule[i];
        const [secondStart, secondEnd, secondClass] = sortedSchedule[i + 1];

        // a ------ b
        //          c ------ d

        if (
          firstStart.isBefore(secondStart) &&
          firstStart.isBefore(secondEnd) &&
          firstEnd.isSameOrBefore(secondStart) &&
          firstEnd.isBefore(secondEnd)
        ) {
          continue;
        } else {
          courseConflictsList.push({
            day: day,
            classA: firstClass,
            classB: secondClass,
          });
        }
      }
    }
    console.log("CONFLICTS: ", courseConflictsList);
    setConflictingCoursesList(courseConflictsList);
    setOpenScheduleCourseAlert(true);
  };

  useEffect(() => {
    setRandTableKey(Math.random());
  }, [selectedCourses, scheduledCourses]);

  return (
    <>
      <Accordion
        sx={{
          borderTopLeftRadius: "10px !important",
          borderTopRightRadius: "10px !important",
        }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#674EA7",
            borderTop: { borderRadius: "10px 10px 0px 0px" },
          }}
          expandIcon={
            <ExpandMoreIcon
              style={{ fill: "#fdd023", transform: "rotate(180deg)" }}
            />
          }
        >
          <Typography fontWeight="bold" color="white">
            Schedule
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          align="right"
          sx={{
            backgroundColor: "#f6f4f1",
            padding: 0,
            paddingRight: 0.3,
            border: "2px solid #674EA7",
          }}
        >
          <MiniCoursesTable
            key={randTableKey}
            scheduledRows={scheduledCourses}
            selectedRows={selectedCourses}
            handleRemove={handleOnRemove}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              justifyContent: "right",
              margin: 1,
              color: "white",
              textTransform: "capitalize",
              backgroundColor: "#54c470",
              "&:hover": { backgroundColor: "#4eb568" },
              borderRadius: "15px !important",
              fontSize: "10px !important",
              fontWeight: "700 !important",
            }}
            onClick={handleOnSchedule}
          >
            Schedule Selected courses
          </Button>
        </AccordionDetails>
      </Accordion>
      <AlertUser
        open={openScheduleCourseAlert}
        onClose={() => setOpenScheduleCourseAlert(false)}
        titleLabel={"Scheduling Selected Courses"}
        message={
          conflictingCoursesList.length >= 1
            ? ON_SCHEDULE_RESULT_MESSAGES.TIME_CONFLICT
            : ON_SCHEDULE_RESULT_MESSAGES.SUCCESS
        }
        acceptLabel={conflictingCoursesList.length >= 1 ? "Ok" : "Thanks! :)"}
        onAccept={() => setOpenScheduleCourseAlert(false)}
        scheduleConflicts={conflictingCoursesList}
        isScheduleAlert
      />
    </>
  );
}
