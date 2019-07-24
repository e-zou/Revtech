import React, {Component} from 'react';
import Navbar from '../components/Navbar.js';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


import firebase from "../firebase/firebase";

const companyName = {
    fontWeight: 'bold'
}

const expansionDetails = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
}
export default class Approval extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }
    }

    handleDelete = (contractid) => {

    }

    componentDidMount() {
       const contractDesc = this.props.contractDesc;
       console.log(contractDesc);
       const commentRef = firebase.database().ref('/comments');
       commentRef.on("value", snap => {
           const commentObj = snap.val();
           const commentKeys = Object.keys(commentObj);

           const comments = commentKeys.map(key => commentObj[key])
           const associated = [];
           
           const contractRef = firebase.database().ref('/contracts');
           contractRef.on("value", snap => {
               let currCon;
                const contractObj = snap.val();
                const contractKeys = Object.keys(contractObj);
                contractKeys.forEach(key => {
                    if (contractObj[key].description === contractDesc) {
                        currCon = key;
                    }
                });
                commentKeys.forEach(key => {
                    if (commentObj[key].parentContract === currCon){
                        associated.push(commentObj[key]);
                    }
                });
                console.log(currCon);
                console.log(associated);
                this.setState({
                    comments: associated,
                });
           });

       });

    }

    
    render() {

        return (
            <div>
            <Navbar/>
            <h1 style={{
                marginTop: '3%'
            }}
            >
                Interest
            </h1>
            
            <Table style={{
                width: '70%',
                marginLeft: '15%'
            }}>
            <TableBody>
            <TableRow>
                    <TableCell  component="th"> Name </TableCell>
                    <TableCell  component="th"> Description </TableCell>
                    <TableCell  component="th" align="center"> Delete </TableCell> 
            </TableRow>
                {this.state.comments.map(comment => {
                        return (
                            <TableRow key={Math.random()}>
                                <TableCell>{comment.userEmail}</TableCell>
                                <TableCell>{comment.commentBody}</TableCell>
                                <TableCell><Button onClick={() => this.handleDelete()}><i className="material-icons">delete_forever</i></Button></TableCell>
                            </TableRow>
                        );
                })}
               
            </TableBody>
            </Table>
            </div>
        );
    }
}