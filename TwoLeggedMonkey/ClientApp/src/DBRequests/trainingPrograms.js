import axios from 'axios';

const getTrainingPrograms = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/TrainingProgram/`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default { getTrainingPrograms };