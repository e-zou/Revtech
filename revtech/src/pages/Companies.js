import React, { Component, useEffect, useState } from 'react';
import Navbar from './../components/Navbar.js'
import Footer from './../components/Footer.js'

import Grid from '@material-ui/core/Grid';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import avatar from './avatar.png'
import chip from './chip.jpg'
import hack from './hackcville.jpg'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import firebase from '../firebase/firebase';
import axios from 'axios';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';

function Companies(){
    const [companies, setCompanies] = useState([]);

    const titleStyle = {
        marginTop: "5%",
        marginBottom: '5%',
    }
    const style1 ={
        marginLeft: '10%',
        marginRight: '10%',
        justifyContent: 'center'
    }

    useEffect(() => {
      const compRef = firebase.database().ref('/companies');
       let returnComp = [];
      compRef.on("value", snap => {
          snap.forEach(company => {

            returnComp.push(company.val())});
  
      });
      var timeout = setInterval(()=>{
        if(returnComp.length!==0) { 
            clearInterval(timeout); 
            console.log(returnComp); 

            setCompanies(returnComp);
        } 
      }, 100);
    }, []);

    const renderCompanies = () => {
      const compDisplay = companies.map(company => {
        return (
          
          <Grid item md={4} key={Math.random()}>
            <MediaCard company={company} />
          </Grid>
        )
      });
      return compDisplay;
    }
    return (
          <div>
            <Navbar/>
            <Typography 
                variant="h2"
                style={titleStyle}
            >
                Companies
            </Typography>
            <Grid
              container
              spacing={3}
              style={{
                width: "70%",
                textAlign: "center",
                marginLeft: "15%"
              }}
            >
            {renderCompanies()}
            </Grid>
            <Footer/>
        </div>
      );
    

}
export default Companies;





function MediaCard(props) {
    const useStyles = makeStyles({
        card: {
          maxWidth: 345,
         
        },
        media: {
          height: 140,
        },
      });
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [picUrl, setPicUrl] = React.useState(hack);

  


  function handleExpandClick() {
    setExpanded(!expanded);
  }


  return (
    <Box
    
    boxShadow = {7}
    >

    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
           className={classes.media}
           image={picUrl}
           style={{
             height: '300px',
           }}
           //title="Student Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              {props.company.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href={props.company.link} size="small" color="primary" >
          Learn More
        </Button>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>


      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
          <Typography>
            {props.company.email}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Box>
  );
}