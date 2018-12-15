import React, { Component } from 'react';
import computerRequest from '../../DBRequests/computer';
import {Button, Glyphicon } from 'react-bootstrap';

export class ComputerUpdate extends Component {

  unlockInputFields = () => {
    this.props.changeInputStatus(this.props.computers,this.props.computerId);
  };

  updateComputer = (e) => {
    computerRequest.updateComputer(e.target.id,this.props.computer)
    .then((res) => {
      this.props.updateState();
    })
    .catch((err) => {
      console.error('Error deleting a computer: ', err);
    });

    this.props.updateState();
  }

  renderButton = () => {
    if (this.props.computer.disabled) {
      return <button className="btn btn-default" onClick={this.unlockInputFields}><Glyphicon glyph="pencil" /></button>;
    } else {
      return <button className="btn btn-default" id={this.props.id} onClick={this.updateComputer}><Glyphicon glyph="floppy-save" /></button>;
    }
  }

  render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    );
  }
}