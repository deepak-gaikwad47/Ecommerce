import React, { useState } from "react";
import { Button, Card, CardContent, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../Actions/userAction";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickHandler = () => {
        setShowPassword(showPassword !== true);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(RegisterUser(user))
        navigate('/login');
    }
    const onChangeHandler = (field, event) => {
        if (field === 'name') {
            setUser(prev => ({ ...prev, name: event.target.value }));
            setLoading(false);
        }
        if (field === 'email') {
            setUser(prev => ({ ...prev, email: event.target.value }));
            setLoading(false);
        }
        if (field === 'password') {
            setUser(prev => ({ ...prev, password: event.target.value }));
            setLoading(false);
        }
    }
    const spinner = {
        marginLeft: '5px',
    };
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px',
        }}
        >
            <Card variant="outlined">
                <CardContent style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                }}
                >
                    <Typography sx={{
                        color: 'rgb(235 64 52)'
                    }}> Register </Typography>
                    <br />
                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                        }}
                        value={user.name}
                        onChange={(event) => { onChangeHandler('name', event) }}
                        id="outlined-basic"
                        fullWidth
                        label="Name"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                        }}
                        value={user.email}
                        onChange={(event) => { onChangeHandler('email', event) }}
                        id="outlined-basic"
                        fullWidth
                        label="Email"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        InputProps={{
                            startAdornment:
                                <InputAdornment onClick={onClickHandler} position="start">
                                    <IconButton aria-label="toggle password visibility" edge="end">
                                        {true ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>,
                        }}
                        value={user.password}
                        onChange={(event) => { onChangeHandler('password', event) }}
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        style={{ marginRight: '5px' }}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                    />
                    <br />
                    <Button
                        fullWidth
                        sx={{
                            bgcolor: 'rgb(235 64 52)'
                        }}
                        variant="contained"
                        onClick={(e) => handleRegister(e)}
                    >
                        Register
                        {loading && (
                            <CircularProgress size={20} style={spinner} />
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

}

export default SignUp;