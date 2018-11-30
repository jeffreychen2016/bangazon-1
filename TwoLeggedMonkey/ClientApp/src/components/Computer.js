import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';
import { ComputerGrid } from './ComputerGrid';

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
        <ComputerGrid 
          computers = {this.state.computers}
        />
      </div>
    );
  }
}