import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Navbar from './../components/Navbar.js';
import { flexbox } from '@material-ui/system';
import { grey } from '@material-ui/core/colors';
import Posting from './../userpages/Posting.js';
import firebase from '../firebase/firebase.js';
import EditTextfield from './editTextField'
import EditTextfieldSmall from './EditTextFieldSmall'
import ProfilePosting from './../userpages/ProfilePosting.js'
import EditTextfieldHref from './EditTextFieldHref'

const text = "Immediately regret falling into bathtub woops poop hanging from butt must get rid run run around house drag poop on floor maybe it comes off woops left brown marks on floor human slave clean lick butt now yet meow for stare out the window. Lick yarn hanging out of own butt. Stuff and things knock over christmas tree meow meow, i tell my human yet find empty spot in cupboard and sleep all day but i'm going to lap some water out of my master's cup meow";
class ProfilePage extends React.Component {
  state = {
    bio: "",
    last: "",

    skills: "",
    commentIds: null, 
    contractInfo:[{}],
    github: null

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var userId = firebase.auth().currentUser.uid;
        const commentsRef = firebase.database().ref('comments');
        const userRef = firebase.database().ref('students/' + userId);
        console.log(userId)
        userRef.on('value', (snapshot) => {
          let data = snapshot.val();
          if(data!==null){
          this.setState({
            bio: data.bio,
            last: data.last,
            first: data.first,
            skills: data.skills,
            userId: userId,
            github: data.github,
            linkedIn: data.linkedIn
          })
        }
        });
        //fetch comments
        commentsRef.on('value', (snapshot) => {
          let tasks = snapshot.val();
          let commentIds = [];
          for (let task in tasks) {
            if (tasks[task].userId == userId){
                console.log(tasks[task].commentBody)
                commentIds = commentIds.concat(tasks[task].parentContract)
            }
            
          }

          const contractsRef = firebase.database().ref('contracts');
          contractsRef.on('value', (snapshot) => {
            let contracts = snapshot.val();
            let contractInfo = [];
            var keys = Object.keys(contracts);
           
            for (let i = 0; i<keys.length;i++) {
              
             if(commentIds.includes(keys[i])){
              
                console.log(contracts[keys[i]].companyName)
                let info = {
                  company: contracts[keys[i]].companyName,
                  description: contracts[keys[i]].description
                }
                contractInfo.push(info)
             }
             
            }
            
            console.log(contractInfo)
            this.setState({contractInfo})
          });
        });
      }
    });
  }

  mapContracts = () =>{
    
    let contracts = this.state.contractInfo;
    return contracts.map((item)=>{
      return <ProfilePosting leftMargin={'0%'} width={'90%'} height={'200px'} arrow={false} company = {item.company} description = {item.description}/>
    })

  }

  render() {
    return (
      <div className="appContainer " style={{ minHeight: 1000 }}>
        <Navbar />
        <div className="profile1">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', marginRight: '5%' }}>
            <img src="https://images.pexels.com/photos/259803/pexels-photo-259803.jpeg?cs=srgb&dl=adorable-animal-animal-photography-259803.jpg&fm=jpg" style={{ width: 300, height: 300, margin: 50 }} />
            <div style={{ marginLeft: 50, marginBottom: 20, color: 'grey', fontSize: 15 }}> Contact Info _________________________________</div>
            <div style={{ marginLeft: 50, fontSize: 20, display: 'flex', }}>
              LinkedIn
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" style={{ width: 20, height: 20, marginLeft: 5 }} />
            </div>
            {/* <a href="https://www.linkedin.com/in/cwransleriv/" style={{ marginLeft: 50, marginTop: 10 }}>https://www.linkedin.com/in/cwransleriv/</a> */}
            <div style={{ lineHeight: '16px' }}>{this.state.linkedIn!==undefined ? <EditTextfieldHref text={this.state.linkedIn} userId={this.state.userId} src = {'linkedIn'}/> : <div></div>}</div>
            <div style={{ marginLeft: 50, marginTop: 30, fontSize: 20, display: 'flex', }}>
              GitHub
              <img src="https://image.flaticon.com/icons/svg/25/25231.svg" style={{ width: 20, height: 20, marginLeft: 5 }} />
            </div>




            {/* <a href="https://github.com/mfrifkin" style={{ marginLeft: 50, marginTop: 10 }}>https://github.com/mfrifkin</a> */}
            <div style={{ lineHeight: '16px' }}>{this.state.github!==undefined ? <EditTextfieldHref text={this.state.github} userId={this.state.userId} src = {'github'}/> : <div></div>}</div>
          </div>

















          <div className="profile2" style={{ marginTop: 40, fontSize: 40, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
          {this.state.first} {this.state.last}
           <div style={{ fontSize: 10, display: 'flex', justifyContent: 'start' }}>HackCville Member</div>
            <div style={{ fontSize: 30, display: 'flex', justifyContent: 'start', marginTop: 20 }} >Bio</div>
            {this.state.bio.length > 0 ? <EditTextfield text={this.state.bio} userId={this.state.userId} /> : <div></div>}
            
            <div className="skillz" style={{ fontSize: 30, display: 'flex', justifyContent: 'start', flexDirection: 'row', height: '50px' }}>
              <div style={{ marginRight: '10px' }}>Skills: </div>
              <div style={{ lineHeight: '16px' }}>{this.state.skills.length > 0 ? <EditTextfieldSmall text={this.state.skills} userId={this.state.userId} /> : <div></div>}</div>

            </div>
            <div style={{ fontSize: 30, display: 'flex', justifyContent: 'start', marginTop: 20 }} >Active Contracts</div>

            <div>{this.mapContracts()}</div>
            
           
          </div>

        </div>
      </div>


    );
  }
}
export default ProfilePage;
