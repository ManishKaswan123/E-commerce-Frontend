import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserOptions from './UserOptions';
import { loadUser } from '../../../actions/userAction';
import store from '../../../store';
import { FaShoppingCart } from "react-icons/fa";

const Header = ({ logo }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const {cartItems} = useSelector((state) => state. cart);

  const handleNavLinkClick = (path) => {
    setExpanded(false);
    navigate(path);
  };

  return (
    <Navbar variant="dark" expand="lg" expanded={expanded}>
      {!isAuthenticated && <Navbar.Brand href="/">{logo}</Navbar.Brand>}
      <div className='profile'>
        {isAuthenticated && <UserOptions user={user} />}
      </div>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <button onClick={() => handleNavLinkClick("/")}>Home</button>
          <button onClick={() => handleNavLinkClick("/products")}>Products</button>
          <div className="d-flex align-items-center">
            <button onClick={() => handleNavLinkClick("/cart")}>
              <FaShoppingCart style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>
            </button>
          </div>
          <div className="d-flex align-items-center">
            <button onClick={() => handleNavLinkClick("/search")}>
              <FaSearch />
            </button>
          </div>
          <div className="d-flex align-items-center">
            <button onClick={() => handleNavLinkClick("/login")}>
              <FaUser />
            </button>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
