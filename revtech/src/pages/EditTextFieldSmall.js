import React from 'react';
import { Input, Button, Icon } from 'antd';
import firebase from '../firebase/firebase.js';






class EditTextFieldSmall extends React.Component {
    state = {
        value: this.props.text,
        editMode: false
    }
   
   

    changeEditMode = () => {
        this.setState({ editMode: !this.state.editMode })
        console.log("editMode")

    }

    updateValue = () => {
        //set state to be the value in the text field
        console.log("in updateValue")
        console.log(document.getElementById("textInputVal").value.length)
        let newText;
        if(document.getElementById("textInputVal").value.length==0){
            newText = "empty"
        }
        else{
            newText = document.getElementById("textInputVal").value
        }
        console.log(newText)
        this.setState({
            editMode: false,
            value: newText
        })

        //update firebase
        console.log(this.props.userId)
        const userRef = firebase.database().ref("students/"+this.props.userId+"/skills");
        userRef.set(newText)
        userRef.on('value', (snapshot) => {
            let tasks = snapshot.val();
            console.log(tasks)
            
        });
       
        

    }

    //renders the edit text view
    renderEditView = () => {
        let text;
        if(this.state.value=="empty"){
            text = "";
        }else{
            text = this.state.value;
        }

        return <div style = {{display: 'flex', flexDirection:'row', marginTop: '10px'}}>
            {/* <input type="text" defaultValue={this.state.value} ref = "textInputVal">
            </input> */}
           
            <Input
                defaultValue={text}
                placeholder="skill 1, skill 2, skill 3, ..."
                autosize={{ minRows: 1, maxRows: 2  }}
                style = {{width:'350px'}}
                id = "textInputVal"
            />
            
            {/* the X button cancels the changes by changing the editmode to false without updating the value in state */}
            
            <Button onClick={this.changeEditMode} >cancel</Button>
          
            {/* the OK button updates state and changes the edit mode */}
            <Button onClick={this.updateValue}>submit</Button>
           
        </div>
    }

    // renders a regular text field
    renderDefaultView = () => {
        console.log("rendering default")
        console.log(this.state.value)
        return <div onDoubleClick={this.changeEditMode}>
            <p style={{ fontSize: 15, marginTop: 20, textAlign: 'left', maxWidth: 550 }}>
            {this.state.value=="empty"?"Double Click Me To Add Skills!":this.state.value}</p>
        </div>


    }
    render() {
        return (
            this.state.editMode ? this.renderEditView() : this.renderDefaultView()

        );
    }
}
export default EditTextFieldSmall;


