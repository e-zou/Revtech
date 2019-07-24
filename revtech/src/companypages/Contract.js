import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from "../firebase/firebase";
import Snackbar from "@material-ui/core/Snackbar";
import { Link, withRouter } from "react-router-dom";

import Navbar from '../components/Navbar.js';


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
   
   
   
export default function Contracts(props) {
   const { history } = props;
    const classes = useStyles();
    // Contract
    // const [clientName, setClientName] = useState("");
    const [authUser, setAuthUser] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");


    useEffect(() => {
      const companyRef = firebase.database().ref('/companies');
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              let id = user.uid;
              setAuthUser(id);
              companyRef.on("value", snap => {
                  const tempCompanies = snap.val();
                  // console.log(id);
                  for (let company in tempCompanies) {
                      if (id == tempCompanies[company].companyid) {
                          let name = tempCompanies[company].name
                          let email = tempCompanies[company].email
                          // console.log("found a match in companies database");
                          setCompany(name);
                          setEmail(email);
                          // console.log(this.state.companyName);
                      }
                  }
  
              });
          } 
      });
    },[]);

   
    const handleClick = (e) => {
       e.preventDefault();
       let today = new Date();
       // Date & Time
       let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let date = mm + '-' + dd + '-' + yyyy;
        let time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, })

       var userId = firebase.auth().currentUser.uid;
       const contracts = firebase.database().ref("contracts/");

       const contract = {
          companyid : userId,
          companyName: company,
          companyEmail: email,
          date : date,
          time : time,
          project: projectName,
          description: description,
          approved: "pending", // for admin to approve / disapprove
       }
       if (
       projectName != "" 
       && description != "") {
        contracts.push(contract);
        setProjectName("");
        setDescription("");
       } else {
         setError("Please fill out all input fields.");
       }
       
    };
   
    return (
      <div>
       <Navbar/>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contract Form
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="projectName"
              label="Project Name"
              type="projectName"
              autoComplete="projectName"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="description"
              autoComplete="description"
              multiline
              rows="10"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <FormHelperText id="my-helper-text">{error}</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              Upload
            </Button>
          </form>
        </div>
   
      </Container>
      </div>
    );
   }
    

    