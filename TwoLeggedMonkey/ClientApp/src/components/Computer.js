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

  SerialNumberChange = (e) => {
    const tempComputers = [ ...this.state.computers ];
    tempComputers[e.target.className].serialNumber = e.target.value;
    this.setState({ computers: tempComputers });
  };

  DateOfPurchaseChange = (e) => {
    const tempComputers = [ ...this.state.computers ];
    tempComputers[e.target.className].dateOfPurchase = e.target.value;
    this.setState({ computers: tempComputers });
  }

  DecommissionedDateChange = (e) => {
    const tempComputers = [ ...this.state.computers ];
    tempComputers[e.target.className].decommissionedDate = e.target.value;
    this.setState({ computers: tempComputers });
  }

  IsOperableChange = (e) => {
    const tempComputers = [ ...this.state.computers ];
    tempComputers[e.target.className].isOperable = e.target.value;
    this.setState({ computers: tempComputers });
  }

  render() {
    return (
      <div>
        <h1>Computer</h1>
        <ComputerGrid 
          computers = {this.state.computers}
          updateState = {this.updateState}
          changeInputStatus = {this.changeInputStatus}
          serialNumberChange = {this.SerialNumberChange}
          dateOfPurchaseChange = {this.DateOfPurchaseChange}
          decommissionedDateChange = {this.DecommissionedDateChange}
          isOperableChange = {this.IsOperableChange}
        />
      </div>
    );
  }
}