import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';
import { ComputerGrid } from './ComputerGrid';

export class Computer extends Component {
  state = {
    computers: []
  };

  getAllComputers = () => {
    computerRequest.getAllComputers()
      .then((computers) => {
        this.setState({computers});
      })
      .catch((err) => {
        console.error('Error getting all computers: ', err);
      });
  }

  componentDidMount () {
    this.getAllComputers();
  }

  updateState = () => {
    this.getAllComputers();
  };

  render() {
    return (
      <div>
        <h1>Computer</h1>
        <ComputerGrid 
          computers = {this.state.computers}
          updateState = {this.updateState}
        />
      </div>
    );
  }
}