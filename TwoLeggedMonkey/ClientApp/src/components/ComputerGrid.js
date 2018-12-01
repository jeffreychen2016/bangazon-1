import React, { Component } from 'react';
import { ComputerDelete } from './ComputerDelete';
import { ComputerAdd} from './ComputerAdd';
import { ComputerUpdate } from './ComputerUpdate';

export class ComputerGrid extends Component {

  printGrid = () => {
    return this.props.computers.map((computer) => {
      return (
        <tr key={computer.id}>
          <td><input value={computer.serialNumber} disabled={computer.disabled} /></td>
          <td><input value={computer.dateOfPurchase} disabled={computer.disabled} /></td>
          <td><input value={computer.decommissionedDate} disabled={computer.disabled} /></td>
          <td><input value={computer.isOperable ? 'Yes' : 'No'} disabled={computer.disabled} /></td>
          <td>
            <ComputerDelete
              computerId = {computer.id}
              updateState = {this.props.updateState}
            />
            <ComputerUpdate
              computerId = {computer.id}
              computers = {this.props.computers}
              changeInputStatus = {this.props.changeInputStatus}
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
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
