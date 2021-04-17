import React from "react";
import {List} from "@material-ui/core";

import Item from "../item";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

export default function ListItem({loading, list, onChangeUrl}) {
    const useStyles = makeStyles((theme) => ({
        root: {
            overflow: "auto",
            flex: "auto",
        },
        progress: {
            margin: "150px",
            width: "70px",
            height: "70px"
        },
        list: {
            width: "350px",
            height: "100%",
            flex: "auto"
        },
    }));

    const classes = useStyles();

    list = list.data || list.results;
    const element = loading ?
        <CircularProgress className={classes.progress} color="secondary"/> :
        <List className={classes.list}>
            {
                list.map( (el) => {
                    return <Item key={el.id || el.kinopoisk_id} selectUrl={() => onChangeUrl(el.iframe_src || el.link)} title={el.ru_title || el.info.rus}/>
                })
            }
        </List>;

    return (
        <div className={classes.root}>
            {element}
        </div>
    )
}