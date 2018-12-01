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
        computers.forEach(computer => {
          computer.disabled = true;
        })
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

  changeInputStatus = (allComputers,computerId) => {
    const computers = [];
    allComputers.forEach(computer => {
      if (computer.id === computerId) {
        computer.disabled = !computer.disabled;
        computers.push(computer);
      } else {
        computers.push(computer);
      }
    })
    this.setState({computers});
  };

  render() {
    return (
      <div>
        <h1>Computer</h1>
        <ComputerGrid 
          computers = {this.state.computers}
          updateState = {this.updateState}
          changeInputStatus = {this.changeInputStatus}
        />
      </div>
    );
  }
}