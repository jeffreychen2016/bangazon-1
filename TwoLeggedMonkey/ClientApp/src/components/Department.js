import React, { Component } from 'react';
import departmentRequest from '../DBRequests/department';
//import { DepartmentGrid } from './DepartmentGrid';
//import { Panel, Button } from 'react-bootstrap';
import { Modal, Button, Glyphicon } from 'react-bootstrap';

const plainDept =
{
    departmentName: ""
};

export class Department extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

  state = {
      departments: [],
      employees: [],
      newDept: plainDept
    };


  componentDidMount () {
    departmentRequest.getAllDepartments()
      .then((departments) => {
        this.setState({departments});
      })
      .catch((err) => {
        console.error('Error getting all department: ', err);
        });
    }

        //gettingEmployees() {
    //    departmentRequest.getDeptEmployees()
    //        .then((employees) => {
    //            this.setState({ employees });
    //        })
    //        .catch((err) => {
    //            console.error('Error getting employees', err);
    //        });
    // }

  postDept = (e) =>
  {
    departmentRequest.postNewDepartment(this.state.newDept);
    this.handleClose();
    this.componentDidMount();
  }

  orderState = (name, e) =>
  {
    const tempDept = {...this.state.newDept};
    tempDept[name] = e.target.value;
    this.setState({newDept : tempDept});
  }

  departmentNameCreate = (e) =>
  {
    this.orderState("departmentName", e);
  }


  handleClose () {
    this.setState({ show: false });
  }

  handleShow () {
    this.setState({ show: true });
  }

    render() {
        const printGrid = this.state.departments.map((department) => {
            return (
                <tr key={department.id}>
                    <td>{department.departmentName}</td>
                    <td><button>See Employees</button></td>
                </tr>
            );
        });
    return (
      <div>
        <h1>Department</h1>
        <button onClick={this.handleShow}>Post</button>
            <div>
                <div className="container">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Department</th>
                            </tr>
                            {printGrid}
                        </tbody>
                    </table>
                </div>
            </div>
              <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>New Department</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input placeholder="Department Name" onChange={this.departmentNameCreate}/>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.postDept}><Glyphicon glyph="floppy-save" /></Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
