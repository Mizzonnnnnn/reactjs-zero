import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target && event.target && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }
    const emptyForm = () => {
        setName('')
        setDescription('')
        setType(null);
        document.getElementById('fileInput').value = '';
    }
    const handleSubmit = async () => {
        // validate
        if (!name || !description) {
            toast.error("Name/Description is required");
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            emptyForm()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0" >
                    <Accordion.Header className="title">Manage Quizes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3 ">Add New Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <Select
                                        id='tt'
                                        value={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type..."}
                                        isClearable={true}
                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input
                                        type='file'
                                        className='form-control'
                                        id="fileInput"
                                        onChange={(event) => handleChangeFile((event))}
                                    />
                                </div>

                                <div className='mt-3'>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => handleSubmit()}
                                    >Save</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" >
                    <Accordion.Header className="title">Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" >
                    <Accordion.Header className="title">Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ManageQuiz;