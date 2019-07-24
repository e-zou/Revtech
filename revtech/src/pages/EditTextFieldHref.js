import React from 'react';
import { Input, Button, Icon } from 'antd';
import firebase from '../firebase/firebase.js';






class EditTextFieldHref extends React.Component {
    state = {
        value: this.props.text,
        editMode: false
    }
    componentWillReceiveProps(){
        
        if(this.state.value==undefined){
        this.setState({
            value:this.props.text
        })
    }

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
       
        newText = document.getElementById("textInputVal").value
        
        console.log(newText)
        this.setState({
            editMode: false,
            value: newText
        })

        //update firebase
        console.log(this.props.userId)
        const userRef = firebase.database().ref("students/"+this.props.userId+"/"+this.props.src);
        userRef.set(newText)
        userRef.on('value', (snapshot) => {
            let tasks = snapshot.val();
            console.log(tasks)
            
        });
       
        

    }

    //renders the edit text view
    renderEditView = () => {
        
        return <div style = {{display: 'flex', flexDirection:'column', marginTop: '10px', marginLeft: 50}}>
        
            <Input
                defaultValue={this.state.value}
                
                autosize={{ minRows: 1, maxRows: 2  }}
                style = {{width:'300px'}}
                id = "textInputVal"
            />
            
             
            {/* the X button cancels the changes by changing the editmode to false without updating the value in state */}
            <div style = {{display: 'flex', flexDirection:'row',  justifyContent: 'start'}}>
            <Button onClick={this.changeEditMode} >cancel</Button>
          
            {/* the OK button updates state and changes the edit mode */}
            <Button onClick={this.updateValue}>submit</Button>
            </div>
        </div>
    }

    // renders a regular text field
    renderDefaultView = () => {
        console.log("rendering default")
        console.log(this.state.value)
        return <div >
            <div style = {{display: 'flex', flexDirection:'row',  justifyContent: 'start'}}>
            <a  href = {this.state.value} style={{ marginLeft: 50, marginTop: 10 }}>{this.state.value}</a>
            <Button  icon="edit" size = "small" style={{ marginLeft: "5px", marginTop: "5px" }} onClick={this.changeEditMode}/>
            </div>
        </div>


    }
    render() {
        return (
             this.state.editMode ? this.renderEditView() : this.renderDefaultView()
            
        );
    }
}
export default EditTextFieldHref;


