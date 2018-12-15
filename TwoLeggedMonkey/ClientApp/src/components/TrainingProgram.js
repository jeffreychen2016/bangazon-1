import React, { Component } from 'react';
import programRequests from '../DBRequests/trainingPrograms';
import { Glyphicon, Modal } from 'react-bootstrap';

export class TrainingProgram extends Component {

    state = {
        trainingPrograms: [],
        programClicked: [],
        employees: [],
        show: false
    }

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(id) {
        programRequests
            .getEmployeesByProgram(id)
            .then((employees) => {
                let allEmployees = [];
                employees.map((x) => {
                    if (allEmployees == null) {
                        allEmployees = x.employeeName
                    } else {
                        allEmployees.push(x.employeeName)
                    }
                })
                
                this.setState({
                    employees: allEmployees,
                    programClicked: id,
                    show: true
                });
            });
    }

    componentDidMount() {
        programRequests
            .getTrainingPrograms()
            .then((programs) => {
                this.setState({ trainingPrograms: programs });
            })
            .catch((err) => {
                console.error('there was an error getting the training programs ->', err);
            })
    }

    render() {
        const programComponents = this.state.trainingPrograms.map((program) => {
            return (
                <tr key={program.id}>
                    <td>{program.programName}</td>
                    <td>{program.startDate}</td>
                    <td>
                        <button
                            className="btn btn-default"
                            id={program.id}
                            onClick={() => this.handleShow(program.id)}>
                            View
                        </button>
                        &nbsp;
                        <button
                            className="btn btn-default"
                            id={program.id}
                            onClick={(e) => this.deactivateCustomer(e)}
                            >
                            <Glyphicon glyph="remove" />
                        </button>
                    </td>
                </tr>
            )
        })

        const employeesComponents = this.state.employees.map((employee) => {
            return (
                <li key={employee.id}>{employee}</li>
                )
        })

        return (
            <div>
                <h1>TrainingProgram</h1>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Program Name</th>
                            <th>Start Date</th>
                        </tr>
                        {programComponents}
                    </tbody>
                </table>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Employees Currently Enrolled</h4>
                        <ul>
                            {employeesComponents}
                        </ul>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}