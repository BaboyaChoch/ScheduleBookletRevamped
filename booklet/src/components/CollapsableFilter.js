import { Collapse, Grid, Typography } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; another potential icon for collapse/expand action
import React from "react";

export default function CollapsableFilter({children, label, open, setOpen}) {

  return (
    <div>
      <Grid container sx={{ p: .3}}>
        <Grid item xs={9} sx={{display: 'flex', justifyContent: 'flex-start'}}>
          <Typography color="primary" fontWeight={600} fontSize={12}>{label}</Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{display: 'flex', justifyContent: 'flex-end'}}
        >
          <ExpandCircleDownIcon
            sx={{transform: open ? 'rotate(180deg)' : ''}}
            color='primary'
            onClick={() => setOpen(!open)}
          />
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  )
}