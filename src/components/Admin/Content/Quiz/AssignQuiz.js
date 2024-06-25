import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

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
                    label: `${item.id} - ${item.name}`
                };
            });
            setListQuiz(newQuiz);
        }
    };
    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newUser)
        }
    }

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setSelectedQuiz(null)
            setSelectedUser(null)
        } else {
            toast.error(res.EM)
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
                <button
                    className='btn btn-warning'
                    onClick={() => handleAssign()}
                >Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz;