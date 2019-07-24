import React, {useState, useEffect} from 'react';
import Posting from './Posting';
import { Box, Typography } from '@material-ui/core';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import firebase from '../firebase/firebase';

export default function Marketplace() {
    const [postings, setPostings] = useState([]);

    const titleStyle = {
        marginTop: "5%",
    }

    useEffect(() => {
        const contractRef = firebase.database().ref('/contracts');
        let tempPostings = [];
        contractRef.on("value", snapshot => {
            let contracts = snapshot.val();
            let keys = Object.keys(contracts);
            keys.forEach(key => {
                tempPostings.push(<Posting key={Math.random()} contract={contracts[key]} parentId={key} leftMargin={'20%'} width={'60%'} height={'250px'} arrow/>);
            })
            setPostings(tempPostings);
        });
    },[]);

    return (
        <div>
            <Navbar/>
            <Typography 
                variant="h2"
                style={titleStyle}
            >
                Marketplace
            </Typography>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
            >

                {postings}

            </Box>
            <div style={{
                marginTop: '20%',
                marginBottom: '5%'
            }}>
                <p>Copyright 2019 the dream team!</p>
            </div>
            <Footer/>
        </div>
    );
}