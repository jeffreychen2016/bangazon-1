import React, { Component } from 'react';

export class EmployeeGrid extends Component {

  printGrid = () => {
    return this.props.employees.map((employee,index) => {
      return (
        <tr key={index}>
          <td>
            <input 
              value={employee.fullName} 
              disabled={employee.disabled} 
              className={index}
            />
          </td>
          <td>
            <input 
              value={employee.department} 
              disabled={employee.disabled}
              className={index}
            />
          </td>
          <td>
            <input 
              value={employee.computer}
              disabled={employee.disabled} 
              className={index}
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
              <th>Full Name</th>
              <th>Department</th>
              <th>Computer Assigned</th>
              <th>Action</th>
            </tr>
            {this.printGrid()}
          </tbody>
        </table>
      </div>
    );
  }
}
