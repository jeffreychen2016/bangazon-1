import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';

export class ComputerUpdate extends Component {

  unlockInputFields = () => {
    this.props.changeInputStatus(this.props.computers,this.props.computerId);
  };

  updateComputer = (e) => {
    computerRequest.updateComputer(e.target.id,this.props.computer)
    .then((res) => {
      this.props.updateState();
    })
    .catch((err) => {
      console.error('Error deleting a computer: ', err);
    });

    console.error(this.props.computer);
    this.props.updateState();
  }

  renderButton = () => {
    if (this.props.computer.disabled) {
      return <button onClick={this.unlockInputFields}>Unclock</button>;
    } else {
      return <button id={this.props.id} onClick={this.updateComputer}>Update</button>;      
    }
  }

  render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    );
  }
}