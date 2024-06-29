
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

const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data });
}

const postCreateNewQuiz = async (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return await axios.post('/api/v1/quiz', data)
}

const getAllQuizForAdmin = async () => {
    return await axios.get(`/api/v1/quiz/all`)
}

const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}

const deleteQuizForAdmin = (id) => {
    return axios.delete(`/api/v1/quiz/${id}`);
}

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('/api/v1/question', data)
}

const postCreateNewAnswerForQuetion = (description, correct_answer, question_id) => {

    return axios.post('/api/v1/answer', {
        description,
        correct_answer,
        question_id
    })
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post('/api/v1/quiz-assign-to-user', { quizId, userId })
}
const getQuizWithQA = (quizId) => {
    return axios.get(`/api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post(`/api/v1/quiz-upsert-qa`, { ...data })
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
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    putUpdateQuizForAdmin,
    deleteQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuetion,
    postAssignQuiz,
    getQuizWithQA,
    postUpsertQA,
}