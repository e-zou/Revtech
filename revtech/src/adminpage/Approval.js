import React, {Component} from 'react';
import Navbar from '../components/Navbar.js';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


import firebase from "../firebase/firebase";
import AdminComment from "./AdminComment";

const companyName = {
    fontWeight: 'bold'
}

const expansionDetails = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
}
export default class Approval extends React.Component {

    state = {
        contracts : [],
        approved : "",
        showComments : false,
        clickedContract : null,
    }

    handleDelete = (contractid) => {
        firebase.database().ref('contracts/').child(contractid).remove();
        this.getContracts();
    }

    handleApprove = (contractid) => {
        let contractsRef = firebase.database().ref('contracts/').child(contractid);
        contractsRef.on('value', (snapshot) => {
            let approvedStatus = snapshot.val().approved
            // Have to set the information to a state otherwise contractsRef will run infinite loops calling itself
            this.setState ({ 
                approved : approvedStatus
            })
            console.log("from: " + this.state.approved);
            if (this.state.approved === "pending") {
                contractsRef.update({
                    approved: "approved"
                })
                this.setState({
                    approved: "approved",
                })
                // console.log(this.state.approved);
            } else { // (this.state.approved === "approved")
                contractsRef.update({
                    approved: "pending"
                })
                this.setState({
                    approved: "pending",
                })
                console.log(this.state.approved);
            }
            console.log("changed to: " + this.state.approved)
            // console.log(snapshot.val().approved);
        })

        
    }

    updateField = (field, value) => {
        this.setState({
         [field]: value
        })
    }

    displayComments(contract) {
        this.setState({showComments: true});
        this.setState({clickedContract: contract});
    }

    getContracts = () => {
        const contractsRef = firebase.database().ref('contracts');
        //Displays All Contracts for every user
        contractsRef.on('value', (snapshot) => {
            // console.log(snapshot.val())
             let contracts = []
             let allContracts = snapshot.val();
             for (let contract in allContracts) {
                let trimmed = "";
                if (allContracts[contract].description.length >= 75) {
                    trimmed = allContracts[contract].description.substring(0, 75) + "..."
                } else {
                    trimmed = allContracts[contract].description
                }
                let pushContract = {
                    contractid: contract,
                    companyName: allContracts[contract].companyName,
                    commpanyEmail: allContracts[contract].companyEmail,
                    companyid: allContracts[contract].companyid,
                    date: allContracts[contract].date,
                    time: allContracts[contract].time,
                    project: allContracts[contract].project,
                    description: allContracts[contract].description,
                    trimmedDescription: trimmed,
                    status: allContracts[contract].approved, // not approved yet
                }
                contracts.push(pushContract);
                
            }
            this.setState({
                contracts : contracts,
            })
        });
        console.log(this.state.contracts)
        console.log(this.state.authUser);
    }

    componentDidMount() {
       this.getContracts();
    }

    render() {
        console.log(this.state.contracts);
        if (this.state.showComments) {
            return <AdminComment contractDesc={this.state.clickedContract.description}/>
        }
        return (
            <div>
            <Navbar/>
            <h1 style={{
                marginTop: '3%'
            }}
            >
                Contracts
            </h1>
            
            <Table style={{
                width: '70%',
                marginLeft: '15%'
            }}>
            <TableBody>
            <TableRow>
                {/* <ExpansionPanel>
                    <ExpansionPanelSummary> */}
                    {/* <TableCell component="th"> Time</TableCell> */} 
                    <TableCell  component="th"> Date </TableCell>
                    <TableCell  component="th"> Name </TableCell>
                    <TableCell  component="th"> Description </TableCell>
                    <TableCell  component="th"> Status </TableCell>
                    <TableCell  component="th" align="center"> Approve </TableCell>
                    <TableCell  component="th" align="center"> Delete </TableCell> 
                {/* </ExpansionPanelSummary>
                </ExpansionPanel> */}
            </TableRow>
            {this.state.contracts.map((contract, id) => (
                <TableRow key={id}>
                    {/* <TableCell>{contract.time}</TableCell> */}
                    <TableCell>{contract.date}</TableCell>
                    <TableCell onClick={() => this.displayComments(contract)}>{contract.project}</TableCell>
                    <TableCell>{contract.trimmedDescription}</TableCell>
                    <TableCell>{contract.status}</TableCell>
                    <TableCell><Button onClick={() => this.handleApprove(contract.contractid)}> Approve </Button></TableCell>
                    <TableCell><Button onClick={() => this.handleDelete(contract.contractid)}><i className="material-icons">delete_forever</i></Button></TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            
            </div>
        );
    }
}