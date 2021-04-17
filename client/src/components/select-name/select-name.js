import React, {useRef, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {toggleName} from "../../actions";
import FormControl from "@material-ui/core/FormControl";
export default function SelectName({io}) {

    const isOpen = useSelector(state => state.isOpenName);

    const nameRef = useRef(null);
    const roomRef = useRef(null);

    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const sendData = () => {
        if (nameRef.current.value.length === 0 || roomRef.current.value.length < 4) {
            setError(true);
            return;
        }

        io.sendUserData({name: nameRef.current.value, room: roomRef.current.value});
        dispatch(toggleName());
    }

    return (
        <Dialog  disableBackdropClick disableEscapeKeyDown aria-labelledby="dialog-title" open={isOpen}>
            <DialogTitle id="dialog-title">
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <span color="secondary">Вход</span>
                </div>
            </DialogTitle>
            <DialogContent>
                <FormControl style={{marginBottom: "15px"}}>
                    <TextField
                        inputRef={nameRef}
                        error={error}
                        inputProps={{style: { textAlign: 'center'}}}
                        label="Ваше имя"
                        fullWidth
                        color="primary"
                    />
                    <TextField
                        inputRef={roomRef}
                        error={error}
                        inputProps={{maxLength: 4, style: { textAlign: 'center' }}}
                        label="ID комнаты"
                        color="primary"
                        fullWidth
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={sendData} color="primary">
                    Принять
                </Button>
            </DialogActions>
        </Dialog>
    )
}