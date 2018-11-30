import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';

export class ComputerAdd extends Component {
  deleteComputer = () => {
    computerRequest.deleteComputer(this.props.computerId)
    .then((res) => {
      this.props.updateState();
    })
    .catch((err) => {
      console.error('Error deleting a computer: ', err);
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.deleteComputer}>Add</button>
      </div>
    );
  }
}