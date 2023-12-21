import React, { Fragment, useContext, useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logoutUser } from "../../../Actions/userAction";
import { SnackContext } from "../../SnackbarContext/Snackbar";

const UserOption = ({ user }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openSnackBar = useContext(SnackContext);
    const profile = () => {
        navigate('/myProfile')
    }
    const logout = () => {
        dispatch(logoutUser())
        openSnackBar({ message: 'Logged out succesfully', status: 'success' })
        navigate('/')
    }
    const dashboard = () => {
        navigate('/dashboard')
    }
    return (<Fragment>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={() => setOpen(false)}
            open={open}
            onClick={() => setOpen(true)}
        >
            <SpeedDialAction
                icon={<AccountCircleIcon />}
                tooltipTitle='Profile'
                onClick={profile}
            /><SpeedDialAction
                icon={<LogoutIcon />}
                tooltipTitle='Logout'
                onClick={logout}
            />
            {(user.role === 'admin') && <SpeedDialAction
                icon={<DashboardIcon />}
                tooltipTitle='Dashboard'
                onClick={dashboard}
            />}
        </SpeedDial>
    </Fragment>)
}

export default UserOption;