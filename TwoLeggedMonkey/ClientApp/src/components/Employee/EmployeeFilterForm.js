import React, { Component } from 'react';
import { EmployeeSearchButton } from './EmployeeSearchButton';
import { EmployeeDepartmentList } from './EmployeeDepartmentList'; 
import { EmployeeTypeList } from './EmployeeTypeList';
import { EmployeeComputerFullList } from './EmployeeComputerFullList';
import './EmployeeFilterForm.css';

export class EmployeeFilterForm extends Component {

  state = {
    firstName : '',
    lastName : '',
    department : '',
    employeeType : '',
    assignedComputer : ''
  }

  firstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };

  lastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  }

  departmentIdChange = (e) => {
    this.setState({ department: e.target.value });
  }

  employeeTypeIdChange = (e) => {
    this.setState({ employeeType: e.target.value });
  }

  assignedComputerChange = (e) => {
    this.setState({ assignedComputer: e.target.value });
  }

  render() {
    return (
      <div className="employee-filter-form">
        <div className="employee-filter-form-container">
          <div className="filter-option">
            <div className="input-group">
              <span className="input-group-addon">First Name</span>
              <input 
                type="text" 
                className="form-control"  
                value={this.state.firstName}
                onChange={this.firstNameChange}
                />
            </div>
          </div>
          <div className="filter-option">
            <div className="input-group">
              <span className="input-group-addon">Last Name</span>
              <input 
                type="text" 
                className="form-control"  
                value={this.state.lastName}
                onChange={this.lastNameChange}  
              />
            </div>
          </div>
          <div className="filter-option">
            <div className="input-group">
              <span className="input-group-addon">Department Name</span>
              <EmployeeDepartmentList 
                updateDepartments = {this.props.updateDepartments}
                departments = {this.props.departments}
                departmentIdChange={this.departmentIdChange}
              />
            </div>
          </div>
          <div className="filter-option">
            <div className="input-group">
              <span className="input-group-addon">Employee Type</span>
              <EmployeeTypeList 
                employeeTypeIdChange={this.employeeTypeIdChange}
                updateEmployeeTypes = {this.props.updateEmployeeTypes}
                employeeTypes = {this.props.employeeTypes}
              />
            </div>
          </div>
          <div className="filter-option">
            <div className="input-group">
              <span className="input-group-addon">Assigned Computer</span>
              <EmployeeComputerFullList 
                assignedComputerChange={this.assignedComputerChange}
                updateComputers={this.props.updateComputers}
                computers={this.props.computers}
              />
            </div>
          </div>
        </div>
        <EmployeeSearchButton 
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          department={this.state.department}
          employeeType={this.state.employeeType}
          assignedComputer={this.state.assignedComputer}
          updateEmployees={this.props.updateEmployees}
        />
      </div>
    );
  }
}
