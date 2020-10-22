import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import React, { Component } from 'react';
import { List } from "./List";
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Fab } from '@material-ui/core';
import axios from 'axios';

export default class Vista extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], description: '', status: '', dueDate: moment(), name: '', email: '', open: false, openFilter: false, filter: {name: '', status: '', dueDate: null}};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.hanldeNameResponsibleChange = this.hanldeNameResponsibleChange.bind(this);
        this.hanldeEmailResponsibleChange = this.hanldeEmailResponsibleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCloseFilter = this.handleCloseFilter.bind(this);
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleNameFilterChange = this.handleNameFilterChange.bind(this);
        this.handleStatusFilterChange = this.handleStatusFilterChange.bind(this);
        this.handleDueDateFilterChange = this.handleDueDateFilterChange.bind(this);
        this.handleClean = this.handleClean.bind(this);
    }

    render() {

        return (
            <div >
                <List cList={this.state.items} />

                <Fab onClick={this.handleOpen} color="primary" style={{ position: "absolute", right: "0px", bottom: "0", margin: "10px" }}>
                    <AddIcon></AddIcon>   
                </Fab>
                <Fab onClick={this.handleOpenFilter} color="secondary" style={{position:"absolute",right: "0px", bottom: "75px", margin: "10px" }}>
                    <FilterListIcon></FilterListIcon>   
                </Fab>
                {/*<div>
                    <React.Fragment>
                        <input type="text" onChange={this.filterList} />
                        <ul>
                            {this.state.newitems.map((item,i) => {
                                return <li key={i}>{item.description}</li>
                            })}
                        </ul>
                    </React.Fragment>
                        </div>*/}
                <Dialog className="App" onClose={this.handleCloseFilter} aria-labelledby="simple-dialog-title" open={this.state.openFilter}>
                    <form onSubmit={this.handleSubmitFilter} className="todo-form" style={{ width: "100%" }}>
                        <h3>Filter</h3>
                        <TextField
                            id="textFilter"
                            label="Name"
                            value={this.state.filter.name}
                            onChange={this.handleNameFilterChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="statusFilter"
                            label="Status"
                            value={this.state.filter.status}
                            onChange={this.handleStatusFilterChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="due-date"
                            label="Due Date"
                            type="date"
                            defaultValue={ this.state.filter.dueDate ? this.state.filter.dueDate.format('YYYY-MM-DD'): null}
                            onChange={this.handleDueDateFilterChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                            <br/><br/>
                        <Button variant="outlined" color="secondary" type="submit" style={{marginLeft:"5px"}}>
                            Find
                        </Button>
                        <Button onClick={this.handleClean} variant="outlined" color="primary" style={{marginLeft:"5px"}}>
                            Clean
                        </Button>
                    </form>
                </Dialog>
                <Dialog className="App" onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <form onSubmit={this.handleSubmit} className="todo-form" style={{ width: "100%" }}>
                        <h3>New Task</h3>
                        <TextField
                            id="text"
                            label="Description"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="name"
                            label="Responsible Name"
                            value={this.state.name}
                            onChange={this.hanldeNameResponsibleChange}
                            margin="normal" />

                        <TextField
                            id="email"
                            label="Responsible Email"
                            value={this.state.email}
                            onChange={this.hanldeEmailResponsibleChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="priority"
                            label="Status"
                            value={this.state.status}
                            onChange={this.handleStatusChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="due-date"
                            label="Due-Date"
                            type="date"
                            defaultValue={this.state.dueDate.format('YYYY-MM-DD')}
                            onChange={this.handleDateChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <br />
                        <Button variant="contained" color="primary" type="submit">
                            Add Task #{this.state.items.length + 1}
                        </Button>
                    </form>
                </Dialog>
            </div >
        );
    }

    handleOpenFilter() {
        this.setState({ openFilter: true });
    }

    handleCloseFilter() {
        this.setState({ openFilter: false });
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            dueDate: moment(e.target.value, 'YYYY-MM-DD')
        });
    }

    hanldeEmailResponsibleChange(e) {
        this.setState({ email: e.target.value });
    }

    hanldeNameResponsibleChange(e) {
        this.setState({ name: e.target.value });
    }

    updateSearch(e) {
        this.setState({ search: e.target.value });
    }

    handleNameFilterChange(e) {
        const fil = this.state.filter
        fil.name = e.target.value;
        this.setState({ filter: fil });
    }

    handleStatusFilterChange(e) {
        const fil = this.state.filter
        fil.status = e.target.value;
        this.setState({ filter: fil });
    }

    handleDueDateFilterChange(e) {
        const fil = this.state.filter
        fil.dueDate = moment(e.target.value, 'YYYY-MM-DD')
        this.setState({ filter: fil });
    }

    handleSubmitFilter(e) {
       /* e.preventDefault();
        this.setState({ filtering: this.state.filter });
        this.setState({openFilter:false});*/
    }

    handleClean(){
        this.setState({filter: { name: '', status: '', dueDate: null }})
        this.setState({filtering: { name: '', status: '', dueDate: null }})
    }

    handleSubmit(e) {
        let TodoApp =  this

        e.preventDefault();
        console.log(this.state);

        if (!this.state.description.length || !this.state.status.length || !this.state.dueDate)
            return;
        

        this.submitItem(TodoApp)

    }
    submitItem(TodoApp){
        const newItem = {
            description: TodoApp.state.description,
            status: TodoApp.state.status,
            dueDate: TodoApp.state.dueDate,
            responsible: { name: TodoApp.state.name, email: TodoApp.state.email },

        };

        TodoApp.axios.post('newtask', newItem)
        .then(function (response) {
            TodoApp.fetchTaks();
        })
        .catch(function (error) {
            console.log(error)
        });

        TodoApp.setState(prevState => ({
            description: '',
            status: '',
            dueDate: moment(),
            name: '',
            email: '',
            open: false
        }));
    }

    componentDidMount() {
        
        this.axios = axios.create({
            baseURL: 'http://localhost:8080/api/',
            //timeout: 1000,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("accessToken") }
        });
        this.fetchTaks();
    }
    fetchTaks(){
        let TodoApp =  this
        this.axios.get('task')
            .then(function (response) {
                console.log(response.data)
                let tasksList = [];
                response.data.forEach(function (task) {
                    task["dueDate"] = moment(task["dueDate"])
                    tasksList.push(task)
                });
                TodoApp.setState({ items: tasksList });
            })
            .catch(function (error) {
                alert("error al cargar las tareas");
                console.log(error);
            });
    }

}