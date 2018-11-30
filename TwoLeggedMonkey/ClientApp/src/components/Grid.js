import React, { Component } from 'react';

export class Grid extends Component {

  printGrid = () => {
    const allComputers = this.props.computers;
    return allComputers.map((computer) => {
      return (
        <tr key={computer.id}>
          <td>{computer.serialNumber}</td>
          <td>{computer.dateOfPurchase}</td>
          <td>{computer.decommissionedDate}</td>
          <td>{computer.isOperable}</td>
        </tr>
      );
    });
  };

  render() {
    console.error(this.props.computers);
    return (
      <div className="container">
        <table className="table">
          <tbody>
            <tr>
              <th>serialNumber</th>
              <th>dateOfPurchase</th>
              <th>decommissionedDate</th>
              <th>isOperable</th>
            </tr>
            {this.printGrid()}
          </tbody>
        </table>
      </div>
    );
  }
}
