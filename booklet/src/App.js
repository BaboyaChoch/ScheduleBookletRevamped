import './App.css';
import {useEffect, useState} from "react";
import {Grid, useTheme} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    width: '100vw',
    height: '100vh',
  },
  appBar: {
    backgroundColor: 'purple',
    height: '8vh',
  },
  options: {
    backgroundColor: 'gray',
    height: '7vh',
  },
  sideBar: {
    backgroundColor: 'green',
    height: '100vh',
  },
  main: {
    backgroundColor: 'blue',
    height: '100vh',
  }
})

const Label = ({children}) => {
  return <Typography style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
    {children}
  </Typography>
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
    <>
      <Grid className={classes.root} container spacing={2}>
        <Grid className={classes.appBar} item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Label>APP BAR</Label>
        </Grid>
        <Grid className={classes.options} item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Label>QUERY OPTIONS</Label>
        </Grid>
        <Grid className={classes.sideBar} item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Label>FILTER SIDEBAR</Label>
        </Grid>
        <Grid className={classes.main} item xs={10} sm={10} md={10} lg={10} xl={10}>
          <Label>INTERACTIVE TABLE</Label>
        </Grid>
      </Grid>
    </>
  );
}
