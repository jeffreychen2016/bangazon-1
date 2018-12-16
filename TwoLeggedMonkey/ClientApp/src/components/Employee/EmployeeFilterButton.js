import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Modal, Glyphicon } from 'react-bootstrap';
import './EmployeeFilterButton.css';

export class EmployeeFilterButton extends Component {
  render() {
    return (
      <div className="employee-filter-button container">
        <Button onClick = {this.props.toggleFilterForm}>Filter Employee</Button>
      </div>
    );
  }
}
