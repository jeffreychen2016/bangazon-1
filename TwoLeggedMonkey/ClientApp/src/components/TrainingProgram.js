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

    handleShow(id, name) {
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
                    programClicked: name,
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
                            onClick={() => this.handleShow(program.id, program.programName)}>
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

        let employeesComponents;
        const {employees} = this.state;

        if (employees[0] != null) {
            employeesComponents = employees.map((employee) => {
                return (
                    <li key={employee}>{employee}</li>
                )
            })
        } else {
            employeesComponents = <li>None yet!</li>
        }
        
        return (
            <div>
                <h1>Training Programs</h1>
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
                        <Modal.Title><strong>{this.state.programClicked}</strong></Modal.Title>
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