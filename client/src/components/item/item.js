import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function Item({selectUrl, title}) {

    return (
        <ListItem button onClick={selectUrl}>
            <ListItemText primary={title} />
        </ListItem>
    )
}