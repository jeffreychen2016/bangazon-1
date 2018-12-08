import React, { Component } from 'react';
import computerRequest from '../DBRequests/computer';
import {Button, Glyphicon } from 'react-bootstrap';

export class ComputerDelete extends Component {
  deleteComputer = () => {
    computerRequest.deleteComputer(this.props.computerId)
    .then((res) => {
      this.props.updateState();
    })
    .catch((err) => {
      console.error('Error deleting a computer: ', err);
    });
  };

  render() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.deleteComputer}><Glyphicon glyph="trash" /></button>
      </div>
    );
  }
}