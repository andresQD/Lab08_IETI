import React, { Component } from 'react';
import moment from "moment";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from "./Login"
import Vista from "./Vista"
import ResponsiveDrawer from './ResponsiveDrawer';
import { UserProfile } from './UserProfile';
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const items = [{
      description: "some description text ",
      responsible: {
        name: "Santiago Carrillo",
        email: "sancarbar@gmail"
      },
      status: "ready",
      dueDate: moment(new Date(156464645646))
    }]
    
    const LoginView = () => (
      <div>
        {localStorage.getItem('isLoggedIn') ? <div><ResponsiveDrawer /><Vista cList={items} /> </div> : <Login />}
      </div>
    );

    const TodoView = () => (
      <div>
        {localStorage.getItem('isLoggedIn') ? <div><ResponsiveDrawer /><Vista cList={items} /> </div> : <Login />}
      </div>
    )

    const UpdateProfileView = () => (
      <div>
        {localStorage.getItem('isLoggedIn') ? <div><UserProfile /> </div> : <Login />}
      </div>
    )

    return (

      <Router>
        <div className="App">

          <div>
            
            <Switch>
              <Route exact path="/" component={LoginView} />
              <Route exact path="/login" component={LoginView} />
              <Route exact path="/tasks" component={TodoView} />
              <Route exact path="/profile" component={UpdateProfileView} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }

}
