import Select from 'react-select';
import './ManageQuestion.scss'
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { FiMinusSquare } from "react-icons/fi";
import { FcAddImage } from "react-icons/fc";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _, { values } from 'lodash';
import Lightbox from "react-awesome-lightbox";

const ManageQuestion = (props) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [questions, setQuestion] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    )
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [previewImage, setPreviewImage] = useState({
        title: '',
        url: ''
    })
    const handlwAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            let newQuestion = {
                id: uuidv4(),
                description: 'question 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestion([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let quesionClone = _.cloneDeep(questions);
            quesionClone = quesionClone.filter(item => item.id !== id);
            setQuestion(quesionClone)
        }
    }

    const handleAddRemoveAnswer = (type, answerId, questionId) => {
        let quesionClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            let newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = quesionClone.findIndex(item => item.id === questionId);
            quesionClone[index].answers.push(newAnswer);
            setQuestion(quesionClone);
        }
        if (type === 'REMOVE') {
            let index = quesionClone.findIndex(item => item.id === questionId);
            quesionClone[index].answers = quesionClone[index].answers.filter(item => item.id !== answerId);
            setQuestion(quesionClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let quesionClone = _.cloneDeep(questions);
            let index = quesionClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                quesionClone[index].description = value;
                setQuestion(quesionClone)
            }
        }
    }
    const handleOnChangeFile = (questionId, event) => {
        let quesionClone = _.cloneDeep(questions);
        let index = quesionClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target && event.target.files[0]) {
            quesionClone[index].imageFile = event.target.files[0];
            quesionClone[index].imageName = event.target.files[0].name;
            setQuestion(quesionClone)
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let quesionClone = _.cloneDeep(questions);
        let index = quesionClone.findIndex(item => item.id === questionId);
        // console.log(type, questionId, answerId, value)
        if (index > -1) {
            quesionClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            })
            setQuestion(quesionClone)
        }
    }

    const handleSubmitQuestionForQuiz = () => {
        console.log('quesion: ', questions);
    }
    const handlePreviewImage = (questionId) => {
        let quesionClone = _.cloneDeep(questions);
        let index = quesionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setPreviewImage({
                title: quesionClone[index].imageName,
                url: URL.createObjectURL(quesionClone[index].imageFile)
            })
            setIsPreviewImage(true)
            setQuestion(quesionClone)
        }
    }
    return (
        <div className="questions-container">
            <div className="title">
                <b>Manage Questions</b>
            </div> <hr />

            <div className="add-new-question mt-4">
                <div className='form-group'>
                    Select Quiz
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>

                <div className='mt-4'>Add questions: </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content' >
                                    <div className="form-floating description">
                                        <input
                                            type="type"
                                            className="form-control"
                                            placeholder="description"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} 's description</label>
                                    </div>

                                    <div className='group-upload'>
                                        <label className='uploadFile'
                                            htmlFor={`${question.id}`}>
                                            <FcAddImage className='icon-upload' />

                                        </label>
                                        <span className='upload'>{question.imageName ?
                                            <span className='uploadName' onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                            : "0 file is upload"
                                        }</span>

                                        <input
                                            id={`${question.id}`}
                                            type={'file'}
                                            hidden
                                            onChange={(event) => handleOnChangeFile(question.id, event)}
                                        />
                                    </div>

                                    <div className='icon'>
                                        <span onClick={() => handlwAddRemoveQuestion('ADD', '')} >
                                            <FiPlusCircle className='icon-add' />
                                        </span>
                                        {questions.length > 1 && (
                                            <span onClick={() => handlwAddRemoveQuestion('REMOVE', question.id)}>
                                                <AiOutlineMinusCircle className='icon-remove' />
                                            </span>
                                        )}

                                    </div>
                                </div>

                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answer-content" >
                                                <div className='iscorrect'>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={answer.isCorrect}
                                                        checked={answer.isCorrect}
                                                        onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                    />
                                                </div>

                                                <div className="form-floating answer-name ">
                                                    <input
                                                        value={answer.description}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="description answer"
                                                        // onChange={(event) => handleOnChange('ANSWER', answer.id, event.target.value)}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label >Answer {index + 1}</label>
                                                </div>

                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', '', question.id)}>
                                                        <FiPlusSquare className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', answer.id, question.id)}>
                                                            <FiMinusSquare className='icon-remove' />
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        )
                    })
                }
                {
                    isPreviewImage === true &&
                    <Lightbox
                        image={previewImage.url}
                        title={previewImage.title}
                        onClose={() => setIsPreviewImage(false)}>
                    </Lightbox>
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            className='btn btn-success'
                            onClick={() => handleSubmitQuestionForQuiz()}
                        >
                            Save Question</button>
                    </div>
                }

            </div>


        </div >
    )
}


export default ManageQuestion;