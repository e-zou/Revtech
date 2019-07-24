import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { withRouter } from "react-router-dom";

import Navbar from './../components/Navbar.js';
import code from './code.jpg'
import red from '@material-ui/core/colors/red';
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

 buttonStyle: {
  backgroundColor: '#73C2FB',

  fontSize: '20px',
  color: 'white',
  
  borderRadius: '5%',
  marginTop: '15px',
  marginBottom: '50px',
  border: '3px solid white',
 
 
 },

 imageStyle :{
  height:'auto',
  width: '100%',
  filter: 'brightness(65%)',
  // filter: 'blur(1px)',
  position: 'absolute',
  top: '0',
  left: '0'
},
heroTagline : {
  fontWeight: 'normal',
  color: 'white',
  fontSize: '32px',
  fontWeight: 'normal'
},
imageBoxStyle : {
  height:'650px',
  overflow: 'hidden',
  position: 'relative',
},

overlayBoxText : {
  position: 'relative',
  paddingLeft: '10%',
  paddingRight: '10%',
  color: 'white',
  zIndex: '5',
  textAlign: 'left',
  // top: '25%',
  // left: '15%',
},

overlayBoxStyle : {
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: '2',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
  // top: '13%',
  // left: '30%',
  // backgroundImage: 'linear-gradient(to top, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 100%)',
  // background: 'rgba(61, 92, 119, 0.6)'
}


}));



function SignUp(props) {
const { history } = props;
 const classes = useStyles();

 const handleCompany = () =>{
     history.push('/SignUpCompany')
 }
 const handleStudent = () =>{
    history.push('/SignUpStudent')
}


 

 return (
   <div>
    <Navbar/>
    <Box className={classes.imageBoxStyle}>
        <Box className={classes.overlayBoxStyle}>
          <Box className={classes.overlayBoxText}>
   <Container component="main">
   
     <CssBaseline />
     <div className={classes.paper}>
     
     <h2 className={classes.heroTagline}>Are you a company looking to recruit talented interns for new projects?</h2>

         <Button
          // type="submit"
           
          //  variant="contained"
           //color='primary'
          
          
           className={classes.buttonStyle}
           onClick={handleCompany}
         >
           Sign up as a company!
         </Button>

         <h2 className={classes.heroTagline}>Are you a student looking to gain hands-on industry experience?</h2>

         <Button 
        
          //  type ="submit"
           
           //variant="contained"
          //color="primary"
           className={classes.buttonStyle}
           onClick={handleStudent}
         >
           Sign up as a student!
         </Button>
          

     </div>

   </Container>

   </Box>
   </Box>
   <img alt="code" src={code} className={classes.imageStyle}></img>
   </Box>
   </div>
 );
}

export default withRouter(SignUp)
