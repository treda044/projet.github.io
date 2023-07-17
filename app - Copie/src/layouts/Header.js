import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "reactstrap";
import { useDispatch } from "react-redux";
import { logoutAction } from "../slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUser);
    console.log(storedUser);
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("bearerToken");

    // Reset user state in Redux
    dispatch(logoutAction());
    navigate("/login");
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobileMenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <Navbar color="white" dark expand="md">
      <div className="">
        <div
          style={{ cursor: "pointer" }}
          className="d-lg-none"
          onClick={showMobileMenu}
        >
          <i className="bi bi-list"></i>
        </div>
      </div>

      <Dropdown
        isOpen={dropdownOpen}
        className="ml-auto align-items-center"
        toggle={toggle}
      >
        <DropdownToggle color="" className="d-flex align-items-center">
          <span>
            {userData.firstName} {userData.lastName}
          </span>
          <img
            src="AB"
            alt="profile"
            className="rounded-circle ml-2"
            width="30"
          ></img>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
};

export default Header;
