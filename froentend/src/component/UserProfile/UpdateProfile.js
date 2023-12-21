import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from '@mui/icons-material/Email';
import { Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, updateUser } from "../../Actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../Constants/UserConstant";
import { SnackContext } from "../SnackbarContext/Snackbar";
import './UpdateProfile.css'

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openSnackBar = useContext(SnackContext)
    const { user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    const spinner = {
        marginLeft: '5px',
    };
    const updateProfile = (e) => {
        e.preventDefault();
        dispatch(updateUser({ name, email }))
    }
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
        if (isUpdated) {
            openSnackBar({ message: 'Account updated succesfully', status: 'success' })
            dispatch(loadUser())
            navigate("/myProfile")
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [isUpdated, user, dispatch])
    return (
        <Fragment>
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    <h2 className="updateProfileHeading">Update Profile</h2>
                    <br />
                    <br />
                    <div className="updateProfileName">
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                            }}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="outlined-basic"
                            fullWidth
                            label="Name"
                            variant="outlined"
                        />
                    </div>
                    <br />
                    <div className="updateProfileEmail">
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                            }}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="outlined-basic"
                            fullWidth
                            label="Email"
                            variant="outlined"
                        />
                    </div>
                    <br />
                    <Button
                        fullWidth
                        sx={{
                            bgcolor: 'rgb(235 64 52)',
                            marginTop: "5%",
                            width: "80%",
                            marginLeft: "10%"
                        }}
                        variant="contained"
                        onClick={(e) => updateProfile(e)}
                    >
                        Update Profile
                        {loading && (
                            <CircularProgress size={20} style={spinner} />
                        )}
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile;

