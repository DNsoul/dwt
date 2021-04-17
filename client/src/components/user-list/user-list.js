import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";

export default function UserList({io}) {

    const [users, setUsers] = useState([]);

    useEffect( () => {
            io.receiveUserList(updateUserList);
        }, [ ]
    );

    const updateUserList = (list) => {
        setUsers(list);
    };

    return (
        <div>
            <Accordion square style={{overflow: "hidden"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{margin: 0}}
                >
                    <Typography>Пользователи:</Typography>
                </AccordionSummary>
                <AccordionDetails style={{margin: 0, padding: 0}}>
                        <List style={{width: "100%"}}>
                            {
                                users.map( (user, index) => {
                                    return (
                                        <ListItem key={index} style={{paddingTop: 0, paddingBottom: 0}}>
                                            <ListItemText
                                                primary={user.name}
                                            />
                                            <ListItemSecondaryAction>
                                                {user.host ? <StarIcon/> : <StarBorderIcon/>}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}