import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors, register } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import UserOptions from "../layout/Header/UserOptions";
import { toast } from "react-hot-toast";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const [currentTab, setCurrentTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = users;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar" && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUsers({ ...users, [e.target.name]: e.target.value });
    }
  };

  let redirectPath = location.search ? location.search.split("=")[1] : `/account/${user?._id}`;
  if (isAuthenticated && location.pathname === '/login' && redirectPath) {
    redirectPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      toast.success("User LoggedIn Successfully");
      navigate(redirectPath);
    } else if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, user, navigate , redirectPath]);

  const switchTabs = (e, tab) => {
    setCurrentTab(tab);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button
                  className={
                    currentTab === "register" ? "switchToRight" : "switchToLeft"
                  }
                ></button>
              </div>
              {currentTab === "login" && (
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                  <div className="loginEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockOpenIcon />
                    <button
                        className="passwordVisibilityBtn"
                        type="button"
                        onClick={togglePasswordVisibility}
                        onMouseDown={(e) => e.preventDefault()} // This prevents the button from triggering a form submission
                        >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <div className="forgetPassword">
                    <Link to="/password/forgot">Forget Password ?</Link>
                  </div>
                  <input type="submit" value="Login" className="loginBtn" />
                </form>
              )}
              {currentTab === "register" && (
                <form
                  className="signUpForm"
                  ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  <div className="signUpName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="signUpPassword">
                    <LockOpenIcon />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                    <button
                      className="passwordVisibilityBtn"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                  <div className="registerImage">
                    <img className="circularImage" src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>
                  <input type="submit" value="Register" className="signUpBtn" />
                </form>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
