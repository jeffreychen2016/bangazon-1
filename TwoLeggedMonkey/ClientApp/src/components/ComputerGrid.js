import React, { Component } from 'react';
import { ComputerDelete } from './ComputerDelete';
import { ComputerAdd} from './ComputerAdd';

export class ComputerGrid extends Component {

  printGrid = () => {
    const allComputers = this.props.computers;
    return allComputers.map((computer) => {
      return (
        <tr key={computer.id}>
          <td>{computer.serialNumber}</td>
          <td>{computer.dateOfPurchase}</td>
          <td>{computer.decommissionedDate}</td>
          <td>{computer.isOperable ? 'Yes' : 'No'}</td>
          <td>
            <ComputerDelete
              computerId = {computer.id}
              updateState = {this.props.updateState}
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
