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

export default function SearchModel() {
  return (
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
          rows={[
            ["CSC 1350", 3, "1.0", "9:30AM-10:20AM", "M W F", ""],
            ["CSC 1253", 1, "3.0", "12:00PM-1:20PM", "T TH", ""],
            ["CSC 1240", 1, "3.0", "11:30AM-12:30AM", "M W ", ""],
          ]}
        />
        <Button
          variant="contained"
          size="small"
          sx={{
            justifyContent: "right",
            margin:1,
            color: "white",
            borderRadius: 3,
            textTransform: "capitalize",
            fontWeight: "bold",
            backgroundColor: "#54c470",
            "&:hover": { backgroundColor: "#4eb568" },
          }}
        >
          Schedule Selected courses
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
