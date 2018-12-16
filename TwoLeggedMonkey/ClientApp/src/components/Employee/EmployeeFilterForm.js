import React, { Component } from 'react';
import { EmployeeSearchButton } from './EmployeeSearchButton';
import { EmployeeDepartmentList } from './EmployeeDepartmentList'; 
import { EmployeeTypeList } from './EmployeeTypeList';
import { EmployeeComputerList } from './EmployeeComputerList';
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
              {/* <input 
                type="text" 
                className="form-control"
                value={this.state.departmentId}
                onChange={this.departmentIdChange}  
              /> */}
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
              <input 
                type="text" 
                className="form-control"  
                value={this.state.employeeTypeId}
                onChange={this.employeeTypeIdChange}  
              />
            </div>
          </div>
          <div className="filter-option">
            <div className="input-group">
              <span className="input-group-addon">Assigned Computer</span>
              <input 
                type="text" 
                className="form-control"  
                value={this.state.assignedComputer}
                onChange={this.assignedComputerChange}  
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
