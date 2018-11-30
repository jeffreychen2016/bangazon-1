import React, { Component } from 'react';

export class DepartmentGrid extends Component {

  printGrid = () => {
    const allDepartments = this.props.departments;
    return allDepartments.map((department) => {
      return (
        <tr key={department.id}>
          <td>{department.departmentName}</td>
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
              <th>Department Name</th>
            </tr>
            {this.printGrid()}
          </tbody>
        </table>
      </div>
    );
  }
}
