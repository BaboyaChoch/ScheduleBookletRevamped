import { createTheme } from "@mui/material";

const font = "Raleway, Arial, sans-serif";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#674EA7',
        },
        secondary: {
            main: '#FCCF22',
        },
    },
    typography: {
        fontFamily: font ,
    },
});