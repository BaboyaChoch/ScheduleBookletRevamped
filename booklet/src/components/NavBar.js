import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {},
    logo:{
        height: 50,
    }
})

export default function DemoNav() {
    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <div sx={{flexGrow: 1}}>
                        <img src="https://logos-world.net/wp-content/uploads/2021/09/Louisiana-State-University-LSU-Emblem.png" className={classes.logo}/>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
