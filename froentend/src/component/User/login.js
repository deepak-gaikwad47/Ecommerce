import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardContent, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/userAction";
import MetaData from "../layout/MetaData";
import { SnackContext } from "../SnackbarContext/Snackbar";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openSnackBar = useContext(SnackContext)
    const onClickHandler = () => {
        setShowPassword(showPassword !== true);
    };
    const { isAuthenticated, error } = useSelector(state => {
        return state.user
    })
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/products')
            openSnackBar({ message: 'Login successful', status: 'success' });
        }
        if (error) {
            openSnackBar({ message: error, status: 'error' });
        }
    }, [isAuthenticated, error])
    const handleLogin = () => {
        dispatch(loginUser(email, password))
    }
    const onChangeHandler = (field, event) => {
        if (field === 'email') {
            setEmail(event.target.value);
            setLoading(false);
        }
        if (field === 'password') {
            setPassword(event.target.value);
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
            <MetaData title='login' />
            <Card variant="outlined">
                <CardContent style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                }}
                >
                    <Typography sx={{
                        color: 'rgb(235 64 52)'
                    }}> Login </Typography>
                    <br />
                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                        }}
                        value={email}
                        onChange={(event) => { onChangeHandler('email', event); }}
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
                        value={password}
                        onChange={(event) => { onChangeHandler('password', event); }}
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
                        onClick={(e) => handleLogin(e)}
                    >
                        Sign In
                        {loading && (
                            <CircularProgress size={20} style={spinner} />
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

}

export default Login;