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
  },
  typography: {
    fontFamily: font,
  },
});
