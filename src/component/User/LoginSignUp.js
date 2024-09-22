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
import { toast } from "react-hot-toast";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

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
      navigate('/');
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-700">
        <div className="flex flex-col md:flex-row bg-[rgba(50,61,109,0.5)] backdrop-blur-md rounded-2xl shadow-xl p-4 max-w-4xl">
            <div className="w-full md:w-1/2 rounded-2xl bg-gradient-to-r to-blue-400 from-purple-500 mb-4 md:mb-0">
                <img
                    src="https://designcode.io/images/illustrations/teamwork.svg"
                    alt="Illustration"
                    className="rounded-xl w-full h-full object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 pl-8">
                <h2 className="text-white text-4xl font-semibold mb-4">
                    {currentTab === "login" ? "Sign in" : "Sign up"}
                </h2>
                <p className="text-white mb-6">
                    Access to thousands of products across various categories.
                </p>
                <form onSubmit={currentTab === "login" ? loginSubmit : registerSubmit}>
                    {currentTab === "register" && (
                        <div className="mb-4">
                            <div className="flex items-center bg-gray-800 bg-opacity-30 rounded-full p-3">
                                <FaceIcon className="text-gray-400 mx-2" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                    className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <div className="flex items-center bg-gray-800 bg-opacity-30 rounded-full p-3">
                            <MailOutlineIcon className="text-gray-400 mx-2" />
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                value={currentTab === "login" ? loginEmail : email}
                                onChange={(e) =>
                                    currentTab === "login"
                                        ? setLoginEmail(e.target.value)
                                        : registerDataChange(e)
                                }
                                name={currentTab === "register" ? "email" : undefined}
                                className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center bg-gray-800 bg-opacity-30 rounded-full p-3">
                            <LockOpenIcon className="text-gray-400 mx-2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={currentTab === "login" ? loginPassword : password}
                                onChange={(e) =>
                                    currentTab === "login"
                                        ? setLoginPassword(e.target.value)
                                        : registerDataChange(e)
                                }
                                name={currentTab === "register" ? "password" : undefined}
                                className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="ml-auto text-gray-400 hover:text-white transition duration-300"
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>
                    </div>
                    {currentTab === "register" && (
                        <div className="mb-6 flex items-center justify-center bg-gray-800 bg-opacity-30 p-2 rounded-lg shadow-md">
                            <div className="flex flex-col items-center mr-4">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                    className="block w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-blue focus:ring-opacity hover:bg-gray transition duration ease-in-out"
                                />
                            </div>
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="rounded-full w-12 h-12 object-cover border border-blue shadow-lg"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`w-full py-2.5 ${
                            currentTab === "login"
                                ? 'bg-gradient-to-r from-blue-500 to-teal-400'
                                : 'bg-gradient-to-r from-teal-400 to-blue-500'
                        } text-white font-bold rounded-full shadow-lg hover:from-teal-400 hover:to-blue-500 transition duration-300 min-w-[150px] md:min-w-[200px]`}
                    >
                        {currentTab === "login" ? "Sign in" : "Register"}
                    </button>
                </form>
                <div className="mt text-white">
                    {currentTab === "login" ? (
                        <>
                            <p className="py-2 pt-4">
                                Don't have an account?{' '}
                                <span onClick={(e) => switchTabs(e, 'register')} className="text-blue hover:underline cursor-pointer">
                                    Sign up
                                </span>
                            </p>
                            <p className="py-2">
                                Forgot password?{' '}
                                <Link to="/password/forgot" className="text-blue hover:underline">
                                    Reset password
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="pt-4">
                                Already have an account?{' '}
                                <span onClick={(e) => switchTabs(e, 'login')} className="text-blue hover:underline cursor-pointer">
                                    Sign in
                                </span>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
);

};

export default LoginSignUp;



