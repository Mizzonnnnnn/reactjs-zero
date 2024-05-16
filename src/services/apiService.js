
import axios from '../utils/axiosCustomize';
const postCreateNewUser = async (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return await axios.post('/api/v1/participant', data)
}

const getAllUser = async () => {
    return await axios.get('/api/v1/participant/all')
}

const putUpdateUser = async (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return await axios.put('/api/v1/participant', data)
}
const delDeleteUser = async (userId) => {
    let config = {
        data: { id: userId }
    }
    return await axios.delete('/api/v1/participant', config)
}

const getUserWithPaginate = async (page, limit) => {
    return await axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = async (email, password, delay) => {
    return await axios.post(`/api/v1/login`, {
        email,
        password,
        delay: 5000,
    })
}

const postRegister = async (email, username, password) => {
    return await axios.post(`/api/v1/register`, { email, username, password });
}
const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant');
}
export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    delDeleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
}