import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropdownIcon from "@mui/icons-material/ArrowDownward";
import NotificationIcon from "@mui/icons-material/Notifications";
import AppIcon from "@mui/icons-material/Apps";
import { Avatar, IconButton } from "@mui/material";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectuser } from "./features/userSlice";
import { auth } from "./firebase";
const Header = () => {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Gmail2020.logo.png"
          alt=""
        />
      </div>

      <div className="header__middle">
        <SearchIcon />
        <input placeholder="Search meil" type="text" />
        <ArrowDropdownIcon className="header__inputCaret" />
      </div>

      <div className="header__right">
        <IconButton>
          <AppIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        <Avatar onClick={signOut} src={user?.photoUrl} />
      </div>
    </div>
  );
};

export default Header;
