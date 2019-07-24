import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SignUpForm from './SignUpForm';
import InfoForm from './InfoForm';
import BioForm from './BioForm';
import firebase from '../firebase/firebase.js';
import { Redirect } from 'react-router-dom';
import Navbar from './../components/Navbar.js';
import Snackbar from "@material-ui/core/Snackbar";



const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Create account', 'Include websites', 'Add a bio'];
}



function SignUpNew(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState("");
  const steps = getSteps();

  const { history } = props;

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      // Login with email and password
      case 0:
        return (<SignUpForm 
                  setParentEmail={setEmail} 
                  setParentPwd={setPwd} 
                  setParentFirstName={setFirstName}
                  setParentLastName={setLastName}
                />);
      case 1:
        return <InfoForm setParentLinkedIn={setLinkedIn} setParentGithub={setGithub} />;
      case 2:
        return <BioForm setParentBio={setBio} />;
      default:
        return 'Unknown stepIndex';
    }
  }

  function handleNext(props) {



    if(email !== "" && pwd !== "" && firstName !== "" && lastName !==""){
      if(activeStep == 0){
      const promise = firebase.auth().createUserWithEmailAndPassword(email, pwd);
      promise.then((result)=>{
          console.log("done")
          setActiveStep(prevActiveStep => prevActiveStep + 1);
          
        },
        (error)=>{
          console.log(error.message);
          setMessage(error.message);
        })
      }
      if (activeStep ==1){
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    if (activeStep === 2) {
      firebase.auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        
        // firebase.auth().createUserWithEmailAndPassword(email, pwd)
        // .then(() => {
          let git;
          if(github==""){
            git = "https://github.com/samhecht";
          }
          else{
            git = github;
          }
          let linked;
          if(linkedIn==""){
            linked = "https://www.linkedin.com/in/cwransleriv/";
          }
          else{
            linked = linkedIn;
          }
          // created a user now add everything to the db and redirect
          let currUser = {
            email: firebase.auth().currentUser.email,
            first: firstName,
            last: lastName,
            github: git,
            linkedIn: linked,
            bio: bio,
            permission: "student",
            skills: "empty"
          }
          const userRef = firebase.database().ref("students/"+firebase.auth().currentUser.uid);
          userRef.update(currUser);
          setFinished(true);
          history.push('/')

        // })
        // .catch(() => {
        //     console.log("error creating user");
        // });
      });
      
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    
    
  }
  else{
    setMessage("Please enter all the required fields")
  }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  if (finished) {
    return <Redirect to="/Marketplace" />;
  }
  return (
    <div>
    <Navbar/>
    <div className={classes.root} style={{marginLeft: "5%"}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed. Redirect. . .</Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0 || activeStep === 1}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              <div style={{paddingTop: "8%"}}></div>
            </div>
          </div>
        )}
      </div>
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
    </div>
  );
}

export default SignUpNew;