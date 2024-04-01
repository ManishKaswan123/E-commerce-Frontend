import React, { Fragment,useState, useEffect } from "react";
import './UpdateProfile.css';
import { useDispatch, useSelector } from "react-redux";
import {updateProfile, loadUser} from "../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-hot-toast";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(
        (state) => state.user
    );
    console.log("User is this :-", user);
    const {error , isUpdated , loading} = useSelector(
        (state) => state.profile
    );
    
    console.log("Profile data :-", error , " " , isUpdated , " " , loading);
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");

    const [avatar , setAvatar] = useState("");
    const [avatarPreview , setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        let myForm = {};

        myForm.name = name;
        myForm.email = email;
        myForm.avatar = avatar;

        dispatch(updateProfile(myForm));
        console.log("Profile data later:-", error , " " , isUpdated , " " , loading);
        if(myForm.name)
            user.name = myForm.name;

        if(myForm.email)
            user.email = myForm.email;

        if(avatar !== "")
            user.avatar = myForm.avatar;

        toast.success("Profile Updated Successfully");
        navigate(`/account/${user._id}`);
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        console.log("Profile data in useEffect :-", error , " " , isUpdated , " " , loading);
        if (!user) {
            navigate("/login");
        }

        if(error) 
            toast.error(error);
        
        if(user) {
            setName(user.name);
            setEmail(user.email);
            {user && user.avatar && 
                (   
                    setAvatarPreview(user.avatar.url)
                )
            };
        }
        if(isUpdated) {
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type: UPDATE_PROFILE_RESET
            });
        }
    } , [dispatch, user, isUpdated, error, updateProfile]);
    return(
        <Fragment>
            {loading ? 
                <Loader /> :
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>
                            <form className="updateProfileForm"  encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileImage">
                                    <img className="circularImage" src={avatarPreview} alt = "Avatar Preview" />
                                    <input 
                                        className="chooseFile"
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                    // disabled={loading ? true : false}
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

export default UpdateProfile;