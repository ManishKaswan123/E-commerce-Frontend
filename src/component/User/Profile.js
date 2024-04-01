import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user && user.name}'s Profile`} />
          <div className="profileContainer">
            {user && (
              <div>
                <h1>My Profile</h1>
                {user.avatar && (
                  <>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link to={`/me/update/${user._id}`}>Edit Profile</Link>
                  </>
                )}
              </div>
            )}
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user && user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user && user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{user && String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div className="Buttons">
                <Link to="/orders">My Orders</Link>
                <Link to={`/password/update/${user && user._id}`}>Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
