import { createTheme } from "@mui/material";

const font = "Raleway, Arial, sans-serif";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#674ea7',
        },
        secondary: {
            main: '#ffd966',
        },
    },
    typography: {
        fontFamily: font ,
    },
});