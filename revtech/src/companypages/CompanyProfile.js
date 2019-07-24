import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Label from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';

import firebase from "../firebase/firebase";
import Navbar from '../components/Navbar.js';
import { Typography } from '@material-ui/core';

let modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}
let modalFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '50%',
    width: '50%',
    backgroundColor: 'white'
}
export default class CompanyProfile extends React.Component {
    state = {
        // List of all Contracts
        contracts : [],
        companies : [],
        authUser: null, 
        companyName : "",
        companyEmail : "",

        // Editing Contracts
        editing : false,
        editContract: [],
        editContractName : "",
        editContractDescription : ""
    }
    
    componentDidMount() {

        const contractsRef = firebase.database().ref('contracts');
        const companyRef = firebase.database().ref('/companies');
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let id = user.uid;
                this.setState({ authUser : id});

                companyRef.on("value", snap => {
                    const tempCompanies = snap.val();
                    // console.log(id);
                    for (let company in tempCompanies) {
                        if (id == tempCompanies[company].companyid) {
                            let name = tempCompanies[company].name
                            let email = tempCompanies[company].email
                            // console.log("found a match in companies database");
                            this.setState({
                                companyName: name,
                                companyEmail: email
                            })
                            // console.log(this.state.companyName);
                        }
                    }
    
                });
                console.log("company Name" + this.state.companyName)
                contractsRef.on('value', (snapshot) => {
                    let contracts = [];
                    let allContracts = snapshot.val();
                    
                    for (let contract in allContracts) {
                        if (allContracts[contract].companyid === this.state.authUser) {
                            let trimmed = "";
                            if (allContracts[contract].description.length >= 75) {
                                trimmed = allContracts[contract].description.substring(0, 75) + "..."
                            } else {
                                trimmed = allContracts[contract].description
                            }
                            let companyName = this.state.companyName
                            let companyEmail = this.state.companyEmail
                            let pushContract = {
                                contractid: contract,
                                companyid: allContracts[contract].companyid,
                                companyName: companyName,
                                companyEmail: companyEmail,
                                date: allContracts[contract].date,
                                time: allContracts[contract].time,
                                
                                project: allContracts[contract].project,
                                description: allContracts[contract].description,
                                trimmedDescription: trimmed,
                                status: allContracts[contract].approved, // not approved yet
                            }
                            contracts.push(pushContract);
                            // console.log(pushContract.companyEmail);
                            // console.log(pushContract.companyName);
                            // console.log(pushContract);
                        }
                    }
                    this.setState({
                        contracts : contracts
                    })
                })
                
            } else {
               console.log("i have no user");
            }
        });

            // Displays All Contracts for every user
        // contractsRef.on('value', (snapshot) => {
        //     // console.log(snapshot.val())
        //      let items = snapshot.val();
        //      const entries = Object.entries(items)
        //      console.log(entries)
        //      for (const [id, contracts] of entries) {
        //      
        //             const contractArray = Object.values(contracts)
        //             this.setState({contracts : contractArray})
        //          
        //        }
        // });
        // console.log(this.state.contracts)
        // console.log(this.state.authUser);
    }

    handleDelete = (contractid) => {
        return firebase.database().ref('contracts/').child(contractid).remove();
    }

    handleCloseEdit = () => {
        console.log("closed edits")
        this.setState ({
            editing: false
        })
        
    }

    handleEditClick = (contractid) => {
       let editContract = this.state.contracts[contractid]
       let editContractName = this.state.contracts[contractid].project
       let editContractDescription = this.state.contracts[contractid].description
       this.setState({
        editing : true,
        editContract : editContract,
        editContractName : editContractName,
        editContractDescription : editContractDescription
       })
    }

    submitEdits = (e) => {
        e.preventDefault();
        let contractId = this.state.editContract.contractid
        const contractRef = firebase.database().ref('contracts/').child(contractId);
        contractRef.update({
            project: this.state.editContractName,
            description: this.state.editContractDescription
        })
        this.setState({
            editing : false,
        })
        // console.log("edits submitted")
    }

    updateField = (field, value) => {
        this.setState({
         [field]: value
        })
    }

    render() {
        return (
        
        <div>
        <Navbar/>
        <Container component="main">
            <h1>{this.state.companyName} Contracts</h1>
            <Table>
            <TableBody>
            <TableRow>
                {/* <TableCell component="th"> Time</TableCell> */}
                <TableCell  component="th"> Date </TableCell>
                <TableCell  component="th"> Name </TableCell>
                <TableCell  component="th"> Description </TableCell>
                <TableCell  component="th"> Status </TableCell>
                <TableCell  component="th" align="center"> Edit </TableCell>
                <TableCell  component="th" align="center"> Delete </TableCell>
            </TableRow>
            {this.state.contracts.map((contract, id) => (
                <TableRow key={id}>
                    {/* <TableCell>{contract.time}</TableCell> */}
                    <TableCell>{contract.date}</TableCell>
                    <TableCell>{contract.project}</TableCell>
                    <TableCell>{contract.trimmedDescription}</TableCell>
                    <TableCell>{contract.status}</TableCell>
                    <TableCell><Button onClick={() => this.handleEditClick(id)}><i class="material-icons">create</i></Button></TableCell>
                    <TableCell><Button onClick={() => this.handleDelete(contract.contractid)}><i class="material-icons">delete_forever</i></Button></TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
            {/* Can be made into a new component called Profile View */}
            <Modal className="modal"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.editing}
                onClose={this.handleCloseEdit}
                style={modalStyle}
            >
                <form style={modalFormStyle}>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    label="Name"
                    placeholder={this.state.editContractName} 
                    value={this.state.editContractName} 
                    onChange={e => this.updateField("editContractName", e.target.value)}>
                    </TextField>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    label="Description"
                    multiline
                    rows="10"
                    placeholder={this.state.editContractDescription} value={this.state.editContractDescription} onChange={e => this.updateField("editContractDescription", e.target.value)}></TextField>
                    <Button onClick={this.submitEdits}>Submit</Button>
                    <Button onClick={this.handleCloseEdit}>X</Button>
                </form>
            </Modal>
        </Container>
        </div>
        );
    }
   }