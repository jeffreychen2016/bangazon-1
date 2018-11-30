import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';
import { Grid } from './Grid';

export class Computer extends Component {
  state = {
    computers: []
  };

  componentDidMount () {
    computerRequest.getAllComputers()
      .then((computers) => {
        this.setState({computers});
      })
      .catch((err) => {
        console.error('Error getting all computers: ', err);
      });
  }

  render() {
    return (
      <div>
        <h1>Computer</h1>
        <Grid 
          computers = {this.state.computers}
        />
      </div>
    );
  }
}