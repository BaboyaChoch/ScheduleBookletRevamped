import './App.css';
import {useEffect, useState} from "react";
import {Divider, Grid, useTheme} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F6F4F1',
  },
  navBar: {
    backgroundColor: 'brown',
    height: '5vh'
  },
  content: {
    backgroundColor: '#F6F4F1',
    height:'100vh',
  },
  search: {
    backgroundColor: 'black',
  },
  main: {
  },
  filters: {
    backgroundColor: 'orange'
  },
  table: {
    backgroundColor: 'grey'
  },
  schedule: {
    width: 577,
    height: 36,
    backgroundColor: 'green',
    position:'fixed',
    bottom: 0,
    right: 0
  }
})

const Label = ({children}) => {
  return (
    <Typography style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        width:'100%'
    }}>
      {children}
    </Typography>
  )
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    setIsDarkMode(theme.palette.mode == 'dark')
  })

  useEffect(() => {
    console.log(`CURRENT_THEME_MODE: ${theme.palette.mode}`, `IS_DARK_MODE: ${isDarkMode}`);
    theme.palette.mode = isDarkMode ? 'dark' : 'light'
  }, [isDarkMode])

  return (
    <Box>
      <Grid container className={classes.root} direction="column">
        <Grid item className={classes.navBar}>
          <Label>THIS IS THE NAV BAR</Label>
        </Grid>
        <Grid item container className={classes.content}>
          <Grid item xs={1.25} />
          <Grid item container direction="column" xs={9.5}>
            <Grid item container xs={1} className={classes.search}>
                <Label >
                  SEARCH OPTIONS [SEMESTER/DEPARTMENT/'Search Courses' BUTTON]
                </Label>
            </Grid>
            <Grid item container xs={11} className={classes.main}>
              <Grid  item container xs={2.25} className={classes.filters}>
                <Label>
                  FILTERING OPTIONS
                </Label>
              </Grid>
              <Grid item xs={.25} display='flex' justifyContent='center'>
                <Divider orientation="vertical" sx={{backgroundColor: '#E0E0E0'}}/>
              </Grid>
              <Grid item container xs={9.50} className={classes.table}>
                <Label>
                  INTERACTIVE TABLE
                </Label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1.25} />
        </Grid>
      </Grid>
      <Box>
        <div className={classes.schedule} >
          <Label>
            SCHEDULE MODAL
          </Label>
        </div>
      </Box>
    </Box>
  );
}
