import React, { Component } from 'react';
import { ComputerDelete } from './ComputerDelete';
import { ComputerAdd} from './ComputerAdd';
import { ComputerUpdate } from './ComputerUpdate';

export class ComputerGrid extends Component {

  state = {
    allComputers: []
  }

  static getDerivedStateFromProps (nextProps,prevState) {
    if (nextProps.computers !== prevState.computers) {
      nextProps.computers.forEach(computer => {
        computer.disabled = true;
      });
      return { allComputers: nextProps.computers };
    } else return null;
  }

  changeInputStatus = (allComputers,computerId) => {
    allComputers.forEach(computer => {
      if (computer.id === computerId) {
        // console.error(computer.id);
        // console.error(computerId);
        console.error(computer.disabled);
        computer.disabled = !computer.disabled;
        console.error(computer.disabled);
        console.error(allComputers);
      } 
    })
    console.error(allComputers);
    this.setState({allComputers});
  };

  printGrid = () => {
    return this.state.allComputers.map((computer) => {
      return (
        <tr key={computer.id}>
          <td><input value={computer.serialNumber} disabled={computer.disabled} /></td>
          <td><input value={computer.dateOfPurchase} disabled={computer.disabled} /></td>
          <td><input value={computer.decommissionedDate} disabled={computer.disabled} /></td>
          <td><input value={computer.isOperable ? 'Yes' : 'No'} disabled={computer.disabled} /></td>
          <td>
            <ComputerDelete
              computerId = {computer.id}
              updateState = {this.props.updateState}
            />
            <ComputerUpdate
              computerId = {computer.id}
              computers = {this.state.allComputers}
              changeInputStatus = {this.changeInputStatus}
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
              <th>Serial Number</th>
              <th>Date Purchased</th>
              <th>Date Decommission</th>
              <th>Is Operable?</th>
              <th>Action</th>
            </tr>
            {this.printGrid()}
            <ComputerAdd 
              updateState = {this.props.updateState}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
