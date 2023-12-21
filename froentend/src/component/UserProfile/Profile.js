import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import './Profile.css'
import { deleteProfile, loadUser } from "../../Actions/userAction";
import { SnackContext } from "../SnackbarContext/Snackbar";
import { useContext } from "react";


const Profile = () => {
    const { loading, user = {} } = useSelector(state => {
        return state.user
    });
    const { isDeleted } = useSelector(state => {
        return state.profile
    });
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const openSnackBar = useContext(SnackContext)
    dayjs.extend(localizedFormat)
    const date = dayjs(user?.createdAt).format('LL');
    useEffect(() => {
        console.log('isDeleted?.success', isDeleted?.success);
        if (isDeleted?.success === true) {
            openSnackBar({ message: 'Account deleted succesfully', status: 'success' })
            // navigate("/")
        }
    }, [isDeleted?.success])
    const handleDelete = () => {
        dispatch(deleteProfile(user._id))
    }
    return (
        <Fragment>
            {loading ? <Loader /> :
                (<Fragment>
                    <MetaData title={`${user?.name}'s Profile`} />
                    <div className="profileContainer">
                        <div className="userProfile">
                            <h1>My Profile</h1>
                            <img src={user?.avatar?.url} alt={user?.name} />
                            <Link to='/update'>Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name:</h4>
                                <p>{user?.name}</p>
                            </div>
                            <div>
                                <h4>Email:</h4>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <h4>Joined on:</h4>
                                <p>{date}</p>
                            </div>
                            <button style={{ width: '40%', backgroundColor: 'black', color: 'white' }} onClick={handleDelete}>Delete my account</button>
                        </div>
                    </div>
                </Fragment>)}
        </Fragment>
    )
}

export default Profile; 