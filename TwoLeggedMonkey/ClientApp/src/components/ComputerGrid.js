import React, { Component } from 'react';

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
            </tr>
            {this.printGrid()}
          </tbody>
        </table>
      </div>
    );
  }
}
