import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUser } from '../../../../services/apiService';

const AssignQuiz = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                };
            });
            setListQuiz(newQuiz);
        }
    };
    const fetchUser = async () => {
        let res = await getAllUser();
        console.log(res);
        if (res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username}`
                }
            })
            setListUser(newUser)
        }
    }
    return (
        <div className="assign-quiz-container row">
            <div className='form-group col-6'>
                <label className='mb-1'>Select Quiz</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                    placeholder={"Select..."}
                    isClearable={true}
                />
            </div>

            <div className='form-group col-6'>
                <label className='mb-1'>Select User</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    placeholder={"Select..."}
                    isClearable={true}
                />
            </div>
            <div className='mt-3'>
                <button className='btn btn-warning'>Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz;