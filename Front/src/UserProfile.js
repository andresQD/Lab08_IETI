import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';

import LockIcon from '@material-ui/icons/Lock';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import TextField from '@material-ui/core/TextField';



export class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: '',  password: '', confpassword: '' }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfpasswordChange = this.handleConfpasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="todo-form" style={{width:"100%"}}>
                    <br />
                    <br />
                    <TextField
                        
                        id="input-with-icon-textfield"
                        label="Full name"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        
                        id="input-with-icon-textfield"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        
                        id="input-with-icon-textfield"
                        label="Confirm Password"
                        type="password"
                        value={this.state.confpassword}
                        onChange={this.handleConfpasswordChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <br />
                    <br />
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                </form>
            </div>
        );
    }

    handleNameChange(e){
        this.setState({
            name: e.target.value
        })
    }


    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }

    handleConfpasswordChange(e){
        this.setState({
            confpassword: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.password != this.state.confpassword){
            alert("Las contraseñas no coinciden")
        }
        else if(this.state.name && this.state.password && this.state.confpassword){
            localStorage.setItem("name", this.state.name);
            localStorage.setItem("password", this.state.password);
            alert("Se actualizaron los datos correctamente")
            window.location.href = "/tasks";
            
        }
        
    }
}