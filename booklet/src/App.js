import './App.css';
import DemoTable from "./components/DemoTable";
import DemoNav from "./components/DemoNav";
import { AppBar, Button, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh"
  }
})

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DemoNav />
      <DemoTable />
    </div>
  );
}
