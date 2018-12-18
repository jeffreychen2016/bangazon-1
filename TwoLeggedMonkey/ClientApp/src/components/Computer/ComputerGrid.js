import React, { Component } from 'react';
import { ComputerDelete } from './ComputerDelete';
import { ComputerAdd } from './ComputerAdd';
import { ComputerUpdate } from './ComputerUpdate';
import moment from 'moment';
import './ComputerGrid.css';

export class ComputerGrid extends Component {

  printGrid = () => {
    return this.props.computers.map((computer,index) => {
      return (
        <tr key={computer.id}>
          <td>
            <input 
              value={computer.serialNumber} 
              disabled={computer.disabled} 
              onChange={this.props.serialNumberChange} 
              // id is used to indentify the record that is being editing on
              className={index}
            />
          </td>
          <td>
            <input 
              value={moment(computer.dateOfPurchase).format('YYYY-MM-DD')} 
              // value='2018-01-01'
              disabled={computer.disabled} 
              onChange={this.props.dateOfPurchaseChange}
              className={index}
              type='date'
            />
          </td>
          <td>
            <input 
              value={moment(computer.decommissionedDate).format('YYYY-MM-DD')}
              disabled={computer.disabled} 
              onChange={this.props.decommissionedDateChange}  
              className={index}
              type='date'
            />
          </td>
          <td>
            <input 
              value={computer.isOperable} 
              disabled={computer.disabled} 
              onChange={this.props.isOperableChange}   
              className={index}
            />
          </td>
          <td>
            <ComputerDelete
              computerId = {computer.id}
              updateState = {this.props.updateState}
            />
            <ComputerUpdate
              computerId = {computer.id}
              computers = {this.props.computers}
              computer = {computer}
              changeInputStatus = {this.props.changeInputStatus}
              updateState = {this.props.updateState}
              id={computer.id}
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="computer-grid container">
        <table className="table">
          <tbody>
            <tr>
              <th>Serial Number</th>
              <th>Date Purchased</th>
              <th>Date Decommission</th>
              <th>Is Operable?</th>
              <th>Action</th>
            </tr>
            {this.printGrid()}
            <ComputerAdd 
              updateState = {this.props.updateState}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
