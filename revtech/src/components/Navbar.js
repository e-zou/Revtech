import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase'
import { signOut } from "../firebase/firebase";


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

// const handleSignOut = () => setUser(null);

function Navbar(props){
    const classes = useStyles();
    const [user, setUser] = useState(null); // sees if someone is logged in

    function handleLogOut() {
      setUser(null);
      signOut().catch(e => console.error("Sign out error:", e));
    }

    function logoutButton() {
      if (user == null) {
        return <Button color="inherit" onClick={handleLogOut}><Link to="/">Sign Outtt</Link></Button>;
      }
    }

    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit"><Link to="/">RevTek</Link></Button>
          <Button color="inherit"><Link to="/Companies">Companies</Link></Button>
          <Button color="inherit"><Link to="/Students">Students</Link></Button>
          <Button color="inherit"><Link to="/SignIn">Login</Link></Button>
          {user == null ? null : <Button color="inherit" onClick={handleLogOut}><Link to="/">Sign Out</Link></Button>}
        </Toolbar>
      </AppBar>
    </div>
    );

}
export default Navbar;