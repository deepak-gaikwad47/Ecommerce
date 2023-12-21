// import React from "react";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logo.png";

// const options = {
//     burgerColorHover: "#eb4034",
//     logo,
//     logoWidth: "20vmax",
//     navColor1: "white",
//     logoHoverSize: "10px",
//     logoHoverColor: "#eb4034",
//     link1Text: "Home",
//     link2Text: "Products",
//     link3Text: "Contact",
//     link4Text: "About",
//     link1Url: "/",
//     link2Url: "/products",
//     link3Url: "/contact",
//     link4Url: "/about",
//     link1Size: "1.3vmax",
//     link1Color: "rgba(35, 35, 35,0.8)",
//     nav1justifyContent: "flex-end",
//     nav2justifyContent: "flex-end",
//     nav3justifyContent: "flex-start",
//     nav4justifyContent: "flex-start",
//     link1ColorHover: "#eb4034",
//     link1Margin: "1vmax",
//     profileIconUrl: "/login",
//     profileIconColor: "rgba(35, 35, 35,0.8)",
//     searchIconColor: "rgba(35, 35, 35,0.8)",
//     cartIconColor: "rgba(35, 35, 35,0.8)",
//     profileIconColorHover: "#eb4034",
//     searchIconColorHover: "#eb4034",
//     cartIconColorHover: "#eb4034",
//     cartIconMargin: "1vmax",
// };

// const Header = () => {
//     return <ReactNavbar {...options} />;
// };

// export default Header;

import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../Actions/userAction';
import { SnackContext } from '../../SnackbarContext/Snackbar';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openSnackBar = useContext(SnackContext);
    const { user } = useSelector(state => state.user);
    const logout = () => {
        dispatch(logoutUser())
        openSnackBar({ message: 'Logged out succesfully', status: 'success' })
        navigate('/')
    }
    return (
        <Box sx={{ flexGrow: 1 }} style={{ backgroundColor: "black" }}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Ecommerce Portal
                    </Typography>
                    {!user ? <>
                        <Button><Link style={{ color: 'black', textDecoration: 'none' }} to="/signup">SIGNUP</Link></Button>
                        <Button><Link style={{ color: 'black', textDecoration: 'none' }} to="/login">LOGIN</Link></Button>
                    </> : ''
                    }
                    <Button><Link style={{ color: 'black', textDecoration: 'none' }} to="/products">PRODUCTS</Link></Button>
                    {user ?
                        <Button onClick={logout} style={{ marginLeft: '30px', color: 'black' }}>LOGOUT</Button>
                        : ''
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
