import Select from 'react-select';
import './ManageQuestion.scss';
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FiPlusCircle, FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { FcAddImage } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _, { values } from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuetion } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const ManageQuestion = (props) => {
    const initQuestion = [
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
    const [questions, setQuestion] = useState(initQuestion);
    const [previewImage, setPreviewImage] = useState({
        title: '',
        url: ''
    });
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
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

    const handlwAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            let newQuestion = {
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
            };
            setQuestion([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let quesionClone = _.cloneDeep(questions);
            quesionClone = quesionClone.filter(item => item.id !== id);
            setQuestion(quesionClone);
        }
    };

    const handleAddRemoveAnswer = (type, answerId, questionId) => {
        let quesionClone = _.cloneDeep(questions);
        let index = quesionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            if (type === 'ADD') {
                let newAnswer = {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                };
                quesionClone[index].answers.push(newAnswer);
                setQuestion(quesionClone)
            }
            if (type === 'REMOVE') {
                quesionClone[index].answers = quesionClone[index].answers.filter(item => item.id !== answerId);
                setQuestion(quesionClone);
            }

        }
    };

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let quesionClone = _.cloneDeep(questions);
            let index = quesionClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                quesionClone[index].description = value;
                setQuestion(quesionClone);
            }
        }
    };

    const handleOnChangeFile = (questionId, event) => {
        let quesionClone = _.cloneDeep(questions);
        let index = quesionClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files[0]) {
            quesionClone[index].imageFile = event.target.files[0];
            quesionClone[index].imageName = event.target.files[0].name;
            setQuestion(quesionClone);
        }
    };

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let quesionClone = _.cloneDeep(questions);
        let index = quesionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            quesionClone[index].answers = quesionClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            });
            setQuestion(quesionClone);
        }
    };

    const handlePreviewImage = (questionId) => {
        let quesionClone = _.cloneDeep(questions);
        let index = quesionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setPreviewImage({
                title: quesionClone[index].imageName,
                url: URL.createObjectURL(quesionClone[index].imageFile)
            });
            setIsPreviewImage(true);
        }
    };

    const handleSubmitQuestionForQuiz = async () => {
        // todo
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz")
            return;
        }

        // validate answer
        let isValidAnswer = true;
        let indexQ = 0; let indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    indexA = j
                    isValidAnswer = false;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
            return;
        }

        // validate question
        let isValidQ1 = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ1 = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValidQ1 === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`);
            return;
        }

        // validate data
        // submit question
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            )
            // submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuetion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }
        }
        toast.success('Create questions and answers succed!')
        setQuestion(initQuestion);
    };
    // console.log('check answer', questions)
    return (
        <div className="questions-container">
            <div className="title">
                <b>Manage Questions</b>
            </div>
            <hr />

            <div className="add-new-question mt-4">
                <div className='form-group'>
                    Select Quiz
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>

                <div className='mt-4'>Add questions: </div>
                {questions && questions.length > 0 && questions.map((question, index) => (
                    <div key={question.id} className='q-main mb-4'>
                        <div className='questions-content'>
                            <div className="form-floating description">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="description"
                                    value={question.description}
                                    onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                />
                                <label>Question {index + 1} 's description</label>
                            </div>

                            <div className='group-upload'>
                                <label className='uploadFile' htmlFor={`${question.id}`}>
                                    <FcAddImage className='icon-upload' />
                                </label>
                                <span className='upload'>
                                    {question.imageName ?
                                        <span className='uploadName' onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                        : "0 file is upload"
                                    }
                                </span>
                                <input
                                    id={`${question.id}`}
                                    type="file"
                                    hidden
                                    onChange={(event) => handleOnChangeFile(question.id, event)}
                                />
                            </div>

                            <div className='icon'>
                                <span onClick={() => handlwAddRemoveQuestion('ADD', '')}>
                                    <FiPlusCircle className='icon-add' />
                                </span>
                                {questions.length > 1 && (
                                    <span onClick={() => handlwAddRemoveQuestion('REMOVE', question.id)}>
                                        <AiOutlineMinusCircle className='icon-remove' />
                                    </span>
                                )}
                            </div>
                        </div>

                        {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => (
                            <div key={answer.id} className="answer-content">
                                <div className='iscorrect'>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={answer.isCorrect}
                                        checked={answer.isCorrect}
                                        onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                    />
                                </div>

                                <div className="form-floating answer-name">
                                    <input
                                        value={answer.description}
                                        type="text"
                                        className="form-control"
                                        // is-invalid
                                        placeholder="description answer"
                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                    />
                                    <label>Answer {index + 1}</label>
                                </div>

                                <div className='btn-group'>
                                    <span onClick={() => handleAddRemoveAnswer('ADD', '', question.id)}>
                                        <FiPlusSquare className='icon-add' />
                                    </span>
                                    {question.answers.length > 1 && (
                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', answer.id, question.id)}>
                                            <FiMinusSquare className='icon-remove' />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                {isPreviewImage && (
                    <Lightbox
                        image={previewImage.url}
                        title={previewImage.title}
                        onClose={() => setIsPreviewImage(false)}
                    />
                )}
                {questions && questions.length > 0 && (
                    <div>
                        <button
                            className='btn btn-success'
                            onClick={handleSubmitQuestionForQuiz}
                        >
                            Save Question
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageQuestion;
