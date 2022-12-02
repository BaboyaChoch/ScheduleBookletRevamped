import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const font = "Raleway, Arial, sans-serif";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#674EA7",
    },
    secondary: {
      main: "#FCCF22",
    },
    success: {
      main: "#66BB6A",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ff9800",
    },
  },
  typography: {
    fontFamily: font,
  },
});
