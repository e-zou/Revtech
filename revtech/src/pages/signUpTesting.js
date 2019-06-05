
// for stepper
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



function SignUpNew() {
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

  const steps = getSteps();

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
        return 'Uknown stepIndex';
    }
  }

  function handleNext() {
    if (activeStep === 0) {
        // need to do some input validation
        firebase.auth().createUserWithEmailAndPassword(email, pwd).then(() => {
            // console.log(firebase.auth().currentUser);
        })
        .catch(() => {
            console.log("error creating user");
        })
    }
    if (activeStep === 2) {
      let currUser = {
        userId: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
        first: firstName,
        last: lastName,
        github: github,
        linkedIn: linkedIn,
        bio: bio,
        permissions: "student",
      }
      const userRef = firebase.database().ref("students");
      userRef.push(currUser);
      setFinished(true);
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
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
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
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
    </div>
  );
}

export default SignUpNew;