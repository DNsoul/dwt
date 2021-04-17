import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

export default function ChatMessage({message}) {

    return (
        <ListItem>
            <Paper style={{padding: "8px", width: "100%", wordBreak: "break-word"}} elevation={3}>
                <span style={{color: "#B9B384"}}>{message.name}</span>
                <br/>
                {message.text}
            </Paper>
        </ListItem>
    )
}