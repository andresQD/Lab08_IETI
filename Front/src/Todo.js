import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

export class Todo extends React.Component{
  render(){
    return (
      <Container component="main" maxWidth="sm" fixed= "true">
        <Card style={{marginTop: "10px"}}>
            <CardContent>
                <p>{this.props.description}</p>
                <p>{this.props.status} - {this.props.dueDate.format('DD-MM-YYYY')} </p>
                <p>{this.props.responsible.name}</p>
            </CardContent>
        </Card>
      </Container>
    );
  }
} 