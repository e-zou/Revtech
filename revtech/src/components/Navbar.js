import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase'
import { signOut } from "../firebase/firebase";
import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import logo from '../images/logo-white.png';


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



function Navbar(props){
    const classes = useStyles();
    const [user, setUser] = useState(null); // sees if someone is logged in
    const [perm, setPerm] = useState(null);

    const studentLinks = {

    }

    function handleLogOut() {
      setUser(null);
      signOut().catch(e => console.error("Sign out error:", e));
    }

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        if(user.uid ==='ROLEjTfVWdba8LJYDC6PfsVEZhz2'){
          setPerm('admin');
          setUser(user);
        }
        else{
        let studRef = firebase.database().ref(`/students/${user.uid}`);
        const compRef = firebase.database().ref('/companies');
        compRef.on("value", snap => {
          const compObj = snap.val();
          const compKeys = Object.keys(compObj);
          const isComp = compKeys.some(key => {
            return compObj[key].companyid === user.uid;
          });
          if (isComp) {
            setPerm('company');
            studRef = null;
          }
        });
        if (studRef) {
          setPerm('student');
        } 
        setUser(user);
      }
      } else {
        setUser(null);
      }


    });

    const navBarStyle = {
      backgroundColor: '#73C2FB',
      padding: "1% 1%",
    }

    const linkStyle = {
      color: 'white',
      textDecoration: 'none',
    }

    const specialButtonStyle = {
      border: '3px solid white',
      color:'white',
      width: '100px',
      height: '40px',
      borderRadius: '5%',
      textDecoration: 'none',
    }
    console.log(user);

    const logoStyle = {
      color: 'white'
    }

    return (
    <div className={classes.root}>
      <Box
        display='flex'
        flex-direction='row'
        justifyContent='space-between'
        style={navBarStyle}
      >
        <Box
          marginLeft="5%"
          display='flex'
          flex-direction='row'
        >
          <Avatar alt="logo" src={logo}></Avatar>
          <Link style={linkStyle} to="/">
            <Typography variant="h4" to="/" style={logoStyle}>
              RevTek
            </Typography>
          </Link>
        </Box>
        
        <Box
          display='flex'
          flex-direction='row'
          justifyContent='space-evenly'
          color="inherit"
          width="45%"
        >

          {(user && perm === "student") 
            ? <React.Fragment>
            
            <Button color="inherit"><Link style={linkStyle} to="/ProfilePage">My Profile</Link></Button>
            <Button color="inherit"><Link style={linkStyle} to="/Marketplace">Marketplace</Link></Button>

            </React.Fragment>
            : null
          }
          {(user && perm === "company") 
            ? <React.Fragment>
                <Button color="inherit"><Link style={linkStyle} to="/Contract">Contract</Link></Button>
                <Button color="inherit"><Link style={linkStyle} to="/CompanyProfile">Profile</Link></Button>
              </React.Fragment>
            : null
          }
          {(user && perm === "admin")
            ? <React.Fragment>
                <Button color="inherit"><Link style={linkStyle} to="/Marketplace">Marketplace</Link></Button>
                <Button color="inherit"><Link style={linkStyle} to="/Approval">Approval</Link></Button>
              </React.Fragment>
            : null
          }
          {(user) 
            ? <React.Fragment>
                <Button color="inherit"><Link style={linkStyle} to="/Companies">Companies</Link></Button>
                <Button color="inherit"><Link style={linkStyle} to="/Students">Students</Link></Button>
                <Button color="inherit" style={specialButtonStyle} onClick={handleLogOut}><Link style={linkStyle} to="/">Logout</Link></Button>
              </React.Fragment>
            : <React.Fragment>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <Button color="inherit" style={specialButtonStyle}><Link style={linkStyle} to="/SignIn">Login</Link></Button>
              </React.Fragment>
            
          }
        </Box>
      </Box>
    </div>
    );

}
export default Navbar;