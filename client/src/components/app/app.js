import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import store from "../../store";

import SocketIOServices from "../../services/socketIO-services";

import {createMuiTheme, Grid} from "@material-ui/core";
import Chat from "../chat";
import SelectionBar from "../selection-bar";
import Player from "../player";
import SelectName from "../select-name/select-name";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import cyan from "@material-ui/core/colors/cyan";
import pink from "@material-ui/core/colors/pink";
import {makeStyles} from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: cyan,
        secondary: pink,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

const useStyle = makeStyles((theme) => ({
    player: {
        [theme.breakpoints.down(700)]: {
            height: "30vh",
        },
        [theme.breakpoints.up(700)]: {
            height: "100vh",
        },
    },
    chat: {
        [theme.breakpoints.down(700)]: {
            height: "70vh",
        },
        [theme.breakpoints.up(700)]: {
            height: "100vh",
        },
    },
}));

const io = new SocketIOServices();

function App() {

    const classes = useStyle();

    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <SelectName io={io}/>
                <Grid container>
                    <SelectionBar io={io}/>
                    <Grid className={classes.player} item xl={10} lg={9} sm={8} xs={12}>
                        <Player io={io}/>
                    </Grid>
                    <Grid className={classes.chat}  item xl={2} lg={3} sm={4} xs={12}>
                        <Chat io={io}/>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
