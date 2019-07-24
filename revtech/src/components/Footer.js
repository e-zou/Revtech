import React, { useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Creator from './Creator.js';
import { withTheme } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#3E5D78',
      color: 'white',
      paddingBottom: '20px',
      paddingTop: '20px',
      marginTop: '150px'
    },
    creatorInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',

    },
    title: {
      width: '80%',
      textAlign: 'left',
      color: 'white',
      // borderBottom: 'solid 1px white'
    },
    line: {
      width: '25%',
      height: '2px',
      backgroundColor: 'white',
      marginTop: '5px',
      marginBottom: '15px'
    },
    creators: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'left',
      width: '80%'
    },
    year: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '80%',
      marginTop: '20px',
    }
   
}));


function Footer(props){
    const classes = useStyles();
    
    const [year, setYear] = useState();

    let getYear = () => {
      let year = new Date().getFullYear();
      setYear(year);
    }

    useEffect(() => {
      getYear();
    },[])
    
    return (
        <Box className={classes.footer}>
          <Box className={classes.creatorInfo}>
            <Box className={classes.title}>
              <Typography variant="h5" style={{color: 'white'}}>Creators</Typography>
              <Box className={classes.line}></Box>
            </Box>
            <Box className={classes.creators}>
              <Creator name="Maggie Bujor" github="https://github.com/maggiebujor" linkedin="https://www.linkedin.com/in/maggie-bujor-33917916b/"/>
              <Creator name="Sammy Hecht" github="https://github.com/samhecht" linkedin="https://www.linkedin.com/in/samuel-hecht-287901152/"/>
              <Creator name="Max Rifkin" github="https://github.com/mfrifkin" linkedin="https://www.linkedin.com/in/max-rifkin-26438b14a/"/>
              <Creator name="Emily Zou" github="https://github.com/e-zou" linkedin="https://www.linkedin.com/in/emily-zou/"/>
            </Box>
          </Box>
          <Box className={classes.year}>
            <Typography>&copy; {year}</Typography>
          </Box>
        </Box>
    );

}
export default Footer;