import React, { Component } from 'react';
import './EmployeeFilterForm.css';

export class EmployeeFilterForm extends Component {

  render() {
    return (
      <div className="employee-filter-form">
        <div className="filter-option">
          <div className="input-group">
            <span className="input-group-addon">First Name</span>
            <input type="text" className="form-control"  />
          </div>
        </div>
        <div className="filter-option">
          <div className="input-group">
            <span className="input-group-addon">Last Name</span>
            <input type="text" className="form-control"  />
          </div>
        </div>
        <div className="filter-option">
          <div className="input-group">
            <span className="input-group-addon">Department Name</span>
            <input type="text" className="form-control"  />
          </div>
        </div>
        <div className="filter-option">
          <div className="input-group">
            <span className="input-group-addon">Employee Type</span>
            <input type="text" className="form-control"  />
          </div>
        </div>
        <div className="filter-option">
          <div className="input-group">
            <span className="input-group-addon">Assigned Computer</span>
            <input type="text" className="form-control"  />
          </div>
        </div>
      </div>
    );
  }
}
