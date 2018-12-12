import React, { Component } from 'react';
import programRequests from '../DBRequests/trainingPrograms';
import { Glyphicon } from 'react-bootstrap';

export class TrainingProgram extends Component {

    state = {
        trainingPrograms: [],
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
                            onClick={() => this.handleShowEdit(program)}>
                            <Glyphicon glyph="pencil" />
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
            </div>
        );
    }
}