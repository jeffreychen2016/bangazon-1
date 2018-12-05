import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';

export class ComputerList extends Component {
  state = {
    computers: []
  }

  componentDidMount = () => {
    computerRequest.getAllComputers()
      .then((computers) => {
        this.setState({computers});
      })
      .catch((err) => {
        console.error('Error adding an employee types: ', err);
      })
  };

  printComputers = () => {
    const computers = this.state.computers;
    if (computers.length) {
      return computers.map((computer) => {
        return (<option key={computer.id}>{computer.serialNumber}</option>);
      });
    }
  };

  render() {
    return (
      <select>
        {this.printComputers()}
      </select>
    );
  }
}