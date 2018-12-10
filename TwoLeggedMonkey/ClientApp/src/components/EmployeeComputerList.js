import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';

export class EmployeeComputerList extends Component {

  componentDidMount = () => {
    computerRequest.GetAllAvailableAndOperableComputers()
    .then((computers) => {
      this.props.updateComputers(computers);
    })
    .catch((err) => {
      console.error('Error adding an employee types: ', err);
    })
  };

  printComputers = () => {
    const computers = this.props.computers;
    if (computers.length) {
      return computers.map((computer) => {
        return (<option value={computer.id} key={computer.id}>{computer.serialNumber}</option>);
      });
    }
  };

  render() {
    return (
      <select onChange={this.props.assignedComputerChange}>
        <option value="Choose here">Choose here</option>
        {this.printComputers()}
      </select>
    );
  }
}