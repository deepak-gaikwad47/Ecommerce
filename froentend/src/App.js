import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./component/layout/Header/Header.js"
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from './component/Home/Products';
import Login from './component/User/login.js';
import SignUp from './component/User/Signup';
import { useEffect } from 'react';
import store from './store'
import { loadUser } from './Actions/userAction';
import UserOption from './component/layout/Header/UserOption.js'
import { useSelector } from 'react-redux';
import SnackBarProvider from './component/SnackbarContext/Snackbar';
import Profile from './component/UserProfile/Profile'
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/UserProfile/UpdateProfile.js';
import Dashboard from './component/admin/dashboard.js'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const { isAuthenticated, user } = useSelector(state => state.user)
  return (
    <Router>
      <SnackBarProvider>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        <ProtectedRoute exact path="/update" element={<UpdateProfile />} />
        <ProtectedRoute exact path="/products" element={<Products />} />
        <ProtectedRoute exact path="/myProfile" element={<Profile />} />
        <ProtectedRoute exact path="/dashboard" element={<Dashboard />} />

        <Footer />
      </SnackBarProvider>
    </Router>
  );
}

export default App;
