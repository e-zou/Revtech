import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from "./../firebase/firebase";
import Snackbar from "@material-ui/core/Snackbar";
import { Link, withRouter } from "react-router-dom";

import Navbar from './../components/Navbar.js';


const useStyles = makeStyles(theme => ({
 '@global': {
   body: {
     backgroundColor: theme.palette.common.white,
   },
 },
 paper: {
   marginTop: theme.spacing(8),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
 },
 avatar: {
   margin: theme.spacing(1),
   backgroundColor: theme.palette.secondary.main,
 },
 form: {
   width: '100%', // Fix IE 11 issue.
   marginTop: theme.spacing(1),
 },
 submit: {
   margin: theme.spacing(3, 0, 2),
 },
}));



function SignIn(props) {
const { history } = props;
 const classes = useStyles();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");


 const handleEmail = (e) => {
    setEmail(e.target.value);

  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [message, setMessage] = useState("");


  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    if(email ==="" || password ===""){
      setMessage("Please enter all the required fields")
    }

    else{

    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.then((result)=>{
        console.log("done")
        history.push('/')
        
      },
      (error)=>{
        console.log(error.message);
        setMessage(error.message);
      })

    }
  }

 return (
   <div>
    <Navbar/>
   <Container component="main" maxWidth="xs">
     
     <CssBaseline />
     <div className={classes.paper}>
       <Avatar className={classes.avatar}>
         <LockOutlinedIcon />
       </Avatar>
       <Typography component="h1" variant="h5">
         Sign in
       </Typography>
       <form className={classes.form} noValidate>
         <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           id="email"
           label="Email Address"
           name="email"
           autoComplete="email"
           autoFocus
           onChange={handleEmail}
         />
         <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="password"
           label="Password"
           type="password"
           id="password"
           autoComplete="current-password"
           onChange={handlePassword}
         />
         <FormControlLabel
           control={<Checkbox value="remember" color="primary" />}
           label="Remember me"
         />
         <Button
           type="submit"
           fullWidth
           variant="contained"
           color="primary"
           className={classes.submit}
           onClick={handleSignIn}
         >
           Sign In
         </Button>
           <Grid item>

           <Grid item>
           <Link className={classes.link} to="/SignUp">
               {"Don't have an account? Sign Up"}
             </Link>
           </Grid>
         </Grid>
       </form>

       <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={!!message}
        autoHideDuration={5000}
        onClose={() => setMessage(null)}
        message={<div>{message}</div>}
      />
     </div>

   </Container>
   </div>
 );
}

export default withRouter(SignIn)
