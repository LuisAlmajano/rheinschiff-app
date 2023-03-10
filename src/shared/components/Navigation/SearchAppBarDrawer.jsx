/* Inspiration from https://material-ui.com/components/drawers/ */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  },
});

const SearchAppBarDrawer = (props) => {
  const { classes } = props;
  const [enteredText, setEnteredText] = useState();
  const { currentUser, logout } = useAuth();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    console.log("HEY THERE! HandleLogut function was called");

    try {
      await logout();
      console.log("Logout was successful!!");
      setState({ ...state, [anchor]: false });
    } catch (error) {
      console.log("Failed to log out");
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key="Home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link to="/">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button key="Login">
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          {/* If user is logged in, show Logout option, alternatively show Login option  */}
          {currentUser ? (
            <Link to="/login">
              <span onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <ListItemText primary="Login" />
            </Link>
          )}
        </ListItem>
        <ListItem button key="Create new boat">
          <ListItemIcon>
            <DirectionsBoatIcon />
          </ListItemIcon>
          <Link to="/boats/new">
            <ListItemText primary="Create new boat" />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
    console.log("Text entered: ", enteredText);
  };

  const searchBoatHandler = (props) => {
    console.log("Triggered searchBoatHandler");
    console.log("Boat entered: ", enteredText);

    // const NewBoat = {
    //   _id: Math.random().toString(),
    //   name: enteredText,
    //   timeseen: Date.now(),
    //   countseen: 1,
    // };
    // console.log({NewBoat});
    // props.onNewBoat(NewBoat);

    // Search for given Boat in MongoDB

    // If Boat exists, display boat

    // If Boat does NOT exist, display option to include boat -> New Boat
  };
  const anchor = "left";

  // To fix the AppBar set position="fixed" below.
  // Also possible to include back to top button: https://material-ui.com/components/app-bar/#back-to-top

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(anchor, true)}
          >
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            RheinSchiff-App
          </Typography>
          {/* Added current user after log in  */}
          <Typography>{currentUser && currentUser.email}</Typography>
          <div className={classes.search} onClick={searchBoatHandler}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search???"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setEnteredText(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(useStyles, { withTheme: true })(SearchAppBarDrawer);
