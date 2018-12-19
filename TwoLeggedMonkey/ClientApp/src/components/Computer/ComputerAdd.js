import React, { Component } from 'react';
import computerRequest from '../../DBRequests/computer';
import './ComputerAdd.css';

export class ComputerAdd extends Component {
  state = {
    newComputer:{
      SerialNumber: '',
      DateOfPurchase: '',
      DecommissionedDate: '',
      IsOperable: ''
    }
  }

  SerialNumberChange = (e) => {
    const tempNewComputer = { ...this.state.newComputer };
    tempNewComputer.SerialNumber = e.target.value;
    this.setState({ newComputer: tempNewComputer });
  };

  DateOfPurchaseChange = (e) => {
    const tempNewComputer = { ...this.state.newComputer };
    tempNewComputer.DateOfPurchase = e.target.value;
    this.setState({ newComputer: tempNewComputer });
  }

  DecommissionedDateChange = (e) => {
    const tempNewComputer = { ...this.state.newComputer };
    tempNewComputer.DecommissionedDate = e.target.value;
    this.setState({ newComputer: tempNewComputer });
  }

  IsOperableChange = (e) => {
    const tempNewComputer = { ...this.state.newComputer };
    tempNewComputer.IsOperable = e.target.value;
    this.setState({ newComputer: tempNewComputer });
  }

  addComputer = () => {
    computerRequest.addComputer(this.state.newComputer)
    .then((res) => {
      this.props.updateState();
    })
    .catch((err) => {
      console.error('Error adding a computer: ', err);
    });
  };

  render() {
    return (
      <tr>
        <td>
          <input 
            onChange={this.SerialNumberChange} 
            value={this.state.newComputer.SerialNumber}
          />
        </td>
        <td>
          <input 
            onChange={this.DateOfPurchaseChange} 
            value={this.state.newComputer.DateOfPurchase}
            type='date'
          />
        </td>
        <td>
          <input 
            onChange={this.DecommissionedDateChange} 
            value={this.state.newComputer.DecommissionedDate}
            type='date'
          />
        </td>
        <td>
          <select onChange={this.IsOperableChange} className="isOperatable-list">
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </td>
        <td><button onClick={this.addComputer}>Add</button></td>
      </tr>
    );
  }
}