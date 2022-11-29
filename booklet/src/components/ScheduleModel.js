import * as React from "react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//File Imports
import MiniCoursesTable from "./MiniCoursesTable";
import { DEFAULT_USER } from "../config/user";
import AlertUser from "./AlertUser";

export default function SearchModel({
  selectedCourses,
  setSelectedCourses,
  scheduledCourses,
  setScheduledCourses,
}) {
  const CURRENT_SCHEDULE = DEFAULT_USER.schedule;
  const [randTableKey, setRandTableKey] = useState(0);

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
          selectedCourses.splice(i, 1);
          setSelectedCourses(selectedCourses);
          setRandTableKey(Math.random());

          window.dispatchEvent(onRemoveEvent);
        }
      }
    }
  };

  useEffect(() => {
    setRandTableKey(Math.random());
  }, [selectedCourses, scheduledCourses]);

  return (
    <>
      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: "#674EA7",
            borderTop: { borderRadius: "10px 10px 0px 0px" },
          }}
          expandIcon={<ExpandMoreIcon style={{ fill: "#fdd023" }} />}
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
          >
            Schedule Selected courses
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
