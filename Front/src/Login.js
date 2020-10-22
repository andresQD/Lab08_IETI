import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import './Login.css';
import axios from 'axios';


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (

            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h3">Task Planner</Typography>
                        <form onSubmit={this.handleSubmit} className="form" >
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                    autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input required
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    autoFocus
                                />
                            </FormControl>
                            <Link to={this.state.redirect} id="redirect" name="redirect" style={{ textDecoration: 'none' }}>
                                <Button
                                    onClick={this.handleSubmit}
                                    type='button'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    className='submit'>
                                    Login
                                    </Button>
                            </Link>
                            <br />
                            <br />
                            <div >
                                <Grid>
                                    <Grid item xs >
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <br />
                                    <Grid item xs >
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>

                            </div>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>

        );
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(e) {
        axios.post('http://localhost:8080/user/login', {
            email: this.state.email,
            password: this.state.password
        },
            { headers: { "Content-ype": "application/json" } })
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("name", "test");
                localStorage.setItem("email", this.state.email);
                window.location.href = "/";
            })
            .catch(error => {
                console.log(error);
                alert("Invalid username or password")
            });
    }
}