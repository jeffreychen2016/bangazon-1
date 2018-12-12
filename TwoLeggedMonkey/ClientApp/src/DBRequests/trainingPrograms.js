import axios from 'axios';

const getTrainingPrograms = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/TrainingProgram/GetTrainingPrograms?completed=true`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getEmployeesByProgram = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/TrainingProgram/GetTrainingProgram/${id}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default { getTrainingPrograms, getEmployeesByProgram };