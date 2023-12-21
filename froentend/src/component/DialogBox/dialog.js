import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers, updateUserDetail } from "../../Actions/userAction";
import { SnackContext } from "../SnackbarContext/Snackbar";


const DialogBox = ({ open, handleClose, user }) => {
    const [role, setRole] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const dispatch = useDispatch();
    const openSnackBar = useContext(SnackContext)

    const handleChange = (e) => {
        setRole(e.target.value)
    }
    const handleUpdate = (id) => {
        try {
            dispatch(updateUserDetail(id, { name, email, role }));
            openSnackBar({ message: 'User updated succesfully', status: 'success' });
            handleClose();
            dispatch(getAllUsers());
        } catch (error) {
            openSnackBar({ message: error, status: 'error' })
        }
    }
    useEffect(() => {
        if (user) {
            setRole(user.role)
            setName(user.name);
            setEmail(user.email);
        }
    }, [user])
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update User Details</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="name"
                    label="Name"
                    type="name"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br />
                <br />
                <InputLabel htmlFor="demo-dialog-native">Role</InputLabel>
                <Select
                    fullWidth
                    value={role}
                    onChange={handleChange}
                    input={<OutlinedInput label="Role" id="demo-dialog-native" />}
                >
                    <MenuItem value='user'>User</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={() => handleUpdate(user?._id)}
                >Update</Button>
            </DialogActions>
        </Dialog>
    )

}

export default DialogBox;