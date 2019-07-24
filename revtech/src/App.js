import React from 'react';
import './App.css';
import Home from './pages/Home.js'
import Approval from './adminpage/Approval.js'
import Companies from './pages/Companies.js'
import CompanyProfile from './companypages/CompanyProfile.js'
import Contract from './companypages/Contract.js'
import Students from './pages/Students.js'
import SignIn from './pages/SignIn'
import SignUpNew from './pages/signUpTesting.js'
import SignUp from './pages/SignUp.js'

import SignUpChoice from './pages/SignUpChoice.js'

import ProfilePage from './pages/ProfilePage'


import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import firebase from "./firebase/firebase.js";
import Marketplace from './userpages/Marketplace';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      test: "",
      user: null,
      loading: true,
      permission: null
    }
  }

  // example of how to access the database
  componentDidMount(){
  
    firebase.auth().onAuthStateChanged(data => {
      if (!data){  this.setState({user: null});
        this.setState({permission: null});
        this.setState({loading: false})
    
      } else {
        this.setState({ user: data}, ()=> {
        
        let permission = null;
        
        let id = this.state.user.uid
        console.log(id)
        console.log(this.state.user.uid);
        



        
          const companiesRef = firebase.database().ref('companies')
          companiesRef.orderByChild('companyid').equalTo(this.state.user.uid).on("value", function(snapshot) {
    
          snapshot.forEach(function(child) { 
            permission = (child.val().permission);
              // this.setState({permission: permission}, ()=> {this.setState({loading: false})})
            console.log(child.val().permission)
          
            });
          });

          var ref = firebase.database().ref("students");
          ref.on("value",
            (function(snapshot) {
              console.log(snapshot.child(id).val())
              if(snapshot.child(id).val() !==null){
                console.log(snapshot.child(id).val())
              permission = snapshot.child(id).val().permission}
     
          }))
          if (id === 'ROLEjTfVWdba8LJYDC6PfsVEZhz2'){
            permission = 'admin'
          }
          var timeout = setInterval(()=>{
            if(permission!==null) { 
                clearInterval(timeout); 
             
                this.setState({permission: permission}, () => {
                  console.log("current permission: "+this.state.permission);
                  this.setState({loading: false})
                });
            } 
          }, 100);
        });
      }
      this.setState({loading: false})
    });
  }

  

  render() {
 
    if(this.state.loading){
      return <div></div>
    }
    return (
      <div className="App">


             <Router>
        <Route exact path="/" component={Home}/>

        <PrivateRoute path="/Approval" exact component = {Approval} user={this.state.user} permission = {this.state.permission} permissionType="admin"/>
       
       

        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/SignUpCompany" exact component={SignUp} />
        <Route path="/SignUpStudent" exact component={SignUpNew} />
        <Route path="/SignUp" exact component={SignUpChoice} />
   


        <PrivateRoute path="/CompanyProfile" exact component = {CompanyProfile} user={this.state.user} permission = {this.state.permission} permissionType="company"/>
        <PrivateRoute path="/Contract" exact component = {Contract} user={this.state.user} permission = {this.state.permission} permissionType="company"/>
        <PrivateRoute path="/Students" exact component = {Students} user={this.state.user} permission = {this.state.permission} permissionType="all"/>
        <PrivateRoute path="/Companies" exact component = {Companies} user={this.state.user} permission = {this.state.permission} permissionType="all"/>
        <PrivateRoute path="/Marketplace" exact component = {Marketplace} user={this.state.user} permission = {this.state.permission} permissionType="student"/>
        <PrivateRoute path="/ProfilePage" exact component = {ProfilePage} user={this.state.user} permission = {this.state.permission} permissionType="student"/> 
      </Router>

      </div>
    );
  }
}



const PrivateRoute = ({ component: Component, user, permission, permissionType, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      
      if (user){
        if(permission){
        if (permission === 'admin' || permission === permissionType || permissionType ==="all"){
        return <Component user={user} {...props} />;}}
      } else {

        return <Redirect to="/" />;
      }
      
    }
  }
  />
);



export default App;
