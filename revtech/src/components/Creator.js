import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    link: {
        color: '#73C2FB',
        // textDecoration: 'underline'
    },
    name: {
        fontSize: '18px'
    }
}));



function Creator(props){
    const classes = useStyles();

    return (
        <Box>
            <Typography className={classes.name}>{props.name}</Typography>
            <Typography><a alt="github" href={props.github} target="_blank" className={classes.link}>Github</a></Typography>
            <Typography><a alt="linkedin" href={props.linkedin} target="_blank" className={classes.link}>Linkedin</a></Typography>
        </Box>
    );

}
export default Creator;