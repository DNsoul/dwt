import React, {useEffect, useRef, useState} from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import SendIcon from '@material-ui/icons/Send';
import Paper from "@material-ui/core/Paper";
import EditIcon from '@material-ui/icons/Edit';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';

import {useDispatch} from "react-redux";

import {toggleMenu, toggleName} from "../../actions";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import UserList from "../user-list";
import Divider from "@material-ui/core/Divider";
import ChatMessage from "../chat-message";

import Visibility from "visibilityjs";
import useSound from 'use-sound';

import boop from "./sound/4.wav";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    title: {
        flexGrow: 1,
    },
    list: {
        overflow: "auto",
        height: "100%"
    },
    paper: {
        padding: '2px 8px',
        display: 'flex',
        alignItems: 'center',
    },
    divider: {
        height: 28,
        margin: 4,
    },
    item: {
        overflowWrap: "break-word"
    }
}));

export default function Chat({io}) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const divRef = useRef(null);

    const [text, setText] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [focusVisible, setVisiblePage] = useState(true);

    const [play] = useSound(boop, { volume: 0.5 });

    useEffect( () => {
            io.receiveMessageText(addMessageList);
			io.reconnectServer();

            Visibility.change(function (e, state) {
                setVisiblePage(state === "visible");
            });

        }, [ ]
    );

    useEffect( () => {
        if (!focusVisible) play();
        divRef.current.scrollIntoView({ behavior: 'smooth' });
        }, [messageList]
    );

    const addMessageList = (message) => {
        setMessageList(prevList => prevList.concat([message]));
    }

    const sendMessage = () => {
        io.sendMessageText(text);
        setText("");
    }

    const onEnter = (e) => {
        if (e.which === 13 && text.trim().length > 0) {
            sendMessage();
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        DWT v.987r
                    </Typography>
                    <Button color="inherit" onClick={() => dispatch(toggleName())}><EditIcon/></Button>
                    <Button color="inherit" onClick={() => dispatch(toggleMenu())}><QueuePlayNextIcon/></Button>
                </Toolbar>
            </AppBar>
            <UserList io={io}/>
            <Divider />
            <div className={classes.list}>
                <List variant="outlined">
                    {
                        messageList.map((message, index) => {
                            return (
                                <ChatMessage key={index} message={message}/>
                            )
                        })
                    }
                    <div ref={divRef}></div>
                </List>
            </div>
            <div style={{padding: "10px"}}>
                <Paper className={classes.paper}>
                    <InputBase onChange={(e) => setText(e.target.value)}
                               onKeyPress={onEnter}
                               fullWidth={true}
                               value={text}
                               size={'small'}
                               variant="outlined"
                               placeholder="Введите сообщение..."
                    />
                    <IconButton onClick={sendMessage} type="submit" aria-label="Отправить">
                        <SendIcon fontSize={"small"}/>
                    </IconButton>
                </Paper>
            </div>
        </div>
    )
}