import { Collapse, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export default function CollapsableContainer({
  children,
  label,
  open,
  setOpen,
}) {
  return (
    <div>
      <Grid container sx={{ p: 0.3 }}>
        <Grid
          item
          xs={9}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Typography color="primary" fontWeight={500}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ExpandMoreIcon
            sx={{ transform: open ? "rotate(180deg)" : "" }}
            color="primary"
            onClick={() => setOpen(!open)}
          />
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ marginTop: 1 }}>
        {children}
      </Collapse>
    </div>
  );
}
