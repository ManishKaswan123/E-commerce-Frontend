import React, { useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../Logo';
import Avatar from '../../Avatar';
import { logout } from '../../../actions/userAction';
import { toast } from 'react-hot-toast';
import { FcBusinessContact } from "react-icons/fc";
import { FaCartShopping } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { BsBoxSeamFill, BsFillBoxSeamFill } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const handleNavLinkClick = (path) => {
    setExpanded(false);
    navigate(path);
  };

  const toggleSidebar = () => setExpanded(!expanded);

  const [menuOpenFirstAvatar, setMenuOpenFirstAvatar] = useState(false);
  const [menuOpenSecondAvatar, setMenuOpenSecondAvatar] = useState(false);

  const toggleFirstAvatarMenu = () => {
    setMenuOpenFirstAvatar(!menuOpenFirstAvatar);
  };

  const toggleSecondAvatarMenu = () => {
    setMenuOpenSecondAvatar(!menuOpenSecondAvatar);
  };


  const handleLogout = () => {
    toast.success("Logged out successfully");
    dispatch(logout());
  };

  const options = [
    { name: "Orders", func: () => navigate(`/orders/${user._id}`) },
    { name: "Profile", func: () => navigate(`/account/${user._id}`) },
    { name: `Cart (${cartItems.length})`, func: () => navigate(`/cart`) },
    { name: "Logout", func: handleLogout },
  ];

  console.log('menuOpen', menuOpen);
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="mx-auto flex justify-between items-center lg:px-[6%] px-[10%] py-2">
        <div className="flex items-center justify-start md:justify-center">
          <a href="/" className={` ${isAuthenticated ? 'hidden lg:block md:block' : 'block'}`}>
            <Logo className="logo w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 m-0" />
          </a>
          {isAuthenticated && (
            <div className='block lg:hidden md:hidden'>
            <div onClick={toggleFirstAvatarMenu}>
              <Avatar
                width={46}
                height={46}
                name={user.name}
                imageUrl={user.profile_pic}
                userId={user._id}
              />
            </div>
            {menuOpenFirstAvatar && (
        <div className="absolute left-6 mt-14 bg-[rgba(75,76,79,0.5)] backdrop-blur-lg backdrop-brightness-80 backdrop-saturate-150 shadow-lg rounded-2xl px-5 py-3 transform transition-opacity duration-400 ease-in-out opacity-100 z-[101]">
          <div className='flex flex-col items-center mb-2'>
            <div className='rounded-full p-3 bg-[rgba(109,109,246,0.1)]'>
              <Avatar
                width={42}
                height={42}
                name={user.name}
                imageUrl={user.profile_pic}
                userId={user._id}
              />
            </div>
          </div>
          <hr className='border-white' />
          <ul className="flex flex-col text-white px-8 mt-4">
            <li onClick={() => navigate(`/orders/${user._id}`)} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
              <BsBoxSeamFill className='mr-2 text-violet-400' size={22}/>
              <span>Orders</span>
            </li>
            <hr className='border-white' />
            <li onClick={() => navigate(`/account/${user._id}`)} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
              <FcBusinessContact className='mr-2' size={30}/>
              <span>Profile</span>
            </li>
            <hr className='border-white' />
            <li onClick={() => navigate(`/cart`)} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
              <FaCartShopping className='mr-2 text-purple-500' size={22}/>
              <span>Cart {cartItems.length ? cartItems.length : 0}</span>
            </li>
            <hr className='border-white' />
            <li onClick={handleLogout} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
              <HiOutlineLogout className='mr-2 text-red-500' size={22}/>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
          </div>
          )}
        </div>

        <nav className="hidden md:flex justify-center items-center flex-grow space-x-4">
          <button onClick={() => handleNavLinkClick("/")} className="text-white hover:text-yellow-400 mx-5 flex flex-row">
          <BsBoxSeamFill className='mr-2 text-violet-400' size={22}/>
            Home
          </button>
          <button onClick={() => handleNavLinkClick("/products")} className="text-white hover:text-yellow-400 mx-5 flex flex-row">
            <FcBusinessContact className='mr-2' size={30}/>
            Products
          </button>
          {isAuthenticated && (
                <>
                    <button onClick={() => handleNavLinkClick("/orders")} className="flex items-center text-left hover:text-purple-400 text-white">
                        <BsFillBoxSeamFill className='mr-2 text-violet-400 ' size={22} />
                        Orders
                    </button>
                </>
            )}
          <button onClick={() => handleNavLinkClick("/search")} className="text-white hover:text-yellow-400 mx-5 flex flex-row">
          <FaSearch className="mr-2 text-blue-400" size={22} />
            Search
          </button>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => handleNavLinkClick("/cart")} className="text-white hover:text-yellow-400 mx-7 flex flex-row">
          <FaCartShopping className='mr-2 text-purple-500' size={22}/>
            Cart ({cartItems.length ? cartItems.length : 0})
          </button>

          

          {!isAuthenticated ? (
            <button onClick={() => handleNavLinkClick("/login")} className="text-white hover:text-yellow-400 ml-10">
              <FaUser className="mr-2 text-green-400" size={20} />
            </button>
          ) : (
            <div className=''>
            <div onClick={toggleSecondAvatarMenu}>
              <Avatar
                width={46}
                height={46}
                name={user.name}
                imageUrl={user.profile_pic}
                userId={user._id}
              />
            </div>
            {menuOpenSecondAvatar && (
        <div className="absolute max-w-xs lg:mt-[5%] md:mt-[8%] right-[7%] bg-[rgba(75,76,79,0.5)] backdrop-blur-lg backdrop-brightness-80 backdrop-saturate-150 shadow-lg rounded-2xl px-5 py-3 transform transition-opacity duration-400 ease-in-out opacity-100 z-[101]">
          <div className='flex flex-col items-center mb-2'>
            <div className='rounded-full p-3 bg-[rgba(109,109,246,0.1)]'>
              <Avatar
                width={42}
                height={42}
                name={user.name}
                imageUrl={user.profile_pic}
                userId={user._id}
              />
            </div>
          </div>
          <hr className='border-white' />
          <ul className="flex flex-col text-white px-8 mt-4">
            <li onClick={() => navigate(`/orders/${user._id}`)} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
              <BsBoxSeamFill className='mr-2 text-violet-400' size={22}/>
              <span>Orders</span>
            </li>
            <hr className='border-white' />
            <li onClick={() => navigate(`/account/${user._id}`)} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
              <FcBusinessContact className='mr-2' size={30}/>
              <span>Profile</span>
            </li>
            <hr className='border-white' />
            <li onClick={() => navigate(`/cart`)} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
              <FaCartShopping className='mr-2 text-purple-500' size={22}/>
              <span>Cart ({cartItems.length ? cartItems.length : 0})</span>
            </li>
            <hr className='border-white' />

            {isAuthenticated && (
              <>
                <li onClick={() => handleNavLinkClick("/orders")} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
                  <BsFillBoxSeamFill className='mr-2 text-violet-400' size={22} />
                  Orders
                </li>
                <hr className='border-white' />
              </>
            )}
            
            <li onClick={handleLogout} className="flex items-center cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-md px-4 py-2.5">
              <HiOutlineLogout className='mr-2 text-red-500' size={22}/>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
          </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[rgba(75,76,79,0.5)] backdrop-blur-lg backdrop-brightness-80 backdrop-saturate-150 shadow-xl transition-transform duration-300 ease-in-out ${
          expanded ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center p-4 border-b border-white">
          <Avatar
            width={60}
            height={60}
            name={user?.name}
            imageUrl={user?.profile_pic}
            userId={user?._id}
          />
          <div className='flex flex-row mt-3'>
            <span className="text-lg font-bold text-white mx-4">Menu</span>
            <button onClick={toggleSidebar}>
              <FaTimes className="text-xl text-white items-center" />
            </button>
          </div>
        </div>

        <nav className="flex flex-col p-4 space-y-4 text-white">
          <button onClick={() => handleNavLinkClick("/")} className="flex items-center text-left hover:text-purple-400">
            <BsBoxSeamFill className='mr-2 text-violet-400' size={22}/>
            Home
          </button>
          <hr className='border-white' />
          
          <button onClick={() => handleNavLinkClick("/products")} className="flex items-center text-left hover:text-purple-400">
            <FcBusinessContact className='mr-2' size={30}/>
            Products
          </button>
          <hr className='border-white' />

          <button onClick={() => handleNavLinkClick("/search")} className="flex items-center text-left hover:text-purple-400">
            <FaSearch className="mr-2 text-blue-400" size={22} />
            Search
          </button>
          <hr className='border-white' />

          <button onClick={() => handleNavLinkClick("/cart")} className="flex items-center text-left hover:text-purple-400">
            <FaCartShopping className='mr-2 text-purple-500' size={22}/>
            Cart ({cartItems.length ? cartItems.length : 0})
          </button>
          <hr className='border-white' />

            {isAuthenticated && (
                <>
                    <button onClick={() => handleNavLinkClick("/orders")} className="flex items-center text-left hover:text-purple-400">
                        <BsFillBoxSeamFill className='mr-2 text-violet-400' size={22} />
                        Orders
                    </button>
                    <hr className='border-white' />
                </>
            )}

          {!isAuthenticated && (
            <>
              <button onClick={() => handleNavLinkClick("/login")} className="flex items-center text-left hover:text-purple-400">
                <FaUser className="mr-2 text-green-400" size={22} />
                Login
              </button>
              <hr className='border-white' />
            </>
          )}

          {isAuthenticated && (
            <>
              <button onClick={handleLogout} className="flex items-center text-left hover:text-purple-400">
                <HiOutlineLogout className='mr-2 text-red-500' size={22}/>
                Logout
              </button>
              <hr className='border-white' />
            </>
          )}
        </nav>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </header>
  );
};

export default Header;
