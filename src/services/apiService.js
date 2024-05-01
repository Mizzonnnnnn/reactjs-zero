
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
export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser
}