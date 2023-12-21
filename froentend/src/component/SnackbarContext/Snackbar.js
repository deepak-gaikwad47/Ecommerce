import { Alert, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import React, { createContext, useState } from "react";

export const SnackContext = createContext();


export const SnackBars = (props) => {
    const { open, message, onClose, status } = props;
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
                <Alert severity={status} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

const SnackBarProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState(false)
    const [status, setStatus] = useState('success')

    const handleChange = ({ message, status }) => {
        setOpen(true)
        setMessage(message);
        setStatus(status);
    }
    const handleClose = (event, reason) => {
        if (reason === 'click-away') {
            return;
        }
        setOpen(false);
    }
    return (<>
        <SnackContext.Provider value={handleChange}>
            {children}
        </SnackContext.Provider>
        <SnackBars
            open={open}
            message={message}
            status={status}
            onClose={handleClose}
        >
        </SnackBars>
    </>)
}
export default SnackBarProvider;
