import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';

export class ComputerUpdate extends Component {

  unlockInputFields = () => {
    // computerRequest.updateComputer(this.props.computerId)
    // .then((res) => {
    //   this.props.updateState();
    // })
    // .catch((err) => {
    //   console.error('Error deleting a computer: ', err);
    // });

    this.props.changeInputStatus(this.props.computers,this.props.computerId);
  };

  updateComputer = () => {
    this.props.updateState();
  }

  renderButton = () => {
    if (this.props.computer.disabled) {
      return <button onClick={this.unlockInputFields}>Unclock</button>;
    } else {
      return <button onClick={this.updateComputer}>Update</button>;      
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