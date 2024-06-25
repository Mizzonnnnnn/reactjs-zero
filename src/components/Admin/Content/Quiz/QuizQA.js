import Select from 'react-select';
import './QuizQA.scss';
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FiPlusCircle, FiPlusSquare, FiMinusSquare } from "react-icons/fi";
import { FcAddImage } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getQuizWithQA, getAllQuizForAdmin, postUpsertQA } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const QuizQA = (props) => {
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
    const [previewImage, setPreviewImage] = useState({
        title: '',
        url: ''
    });
    const [questions, setQuestion] = useState(initQuestion)
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz]);

    // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            // convert base64 to file object
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, `image/png`);
                }
                newQA.push(q);;
            }
            setQuestion(newQA)
        }
    };

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

        let quesionsClone = _.cloneDeep(questions);
        for (let i = 0; i < quesionsClone.length; i++) {
            if (quesionsClone[i].imageFile) {
                quesionsClone[i].imageFile = await toBase64(quesionsClone[i].imageFile)
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: quesionsClone
        })
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA();
        }
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    return (
        <div className="questions-container">
            <div className="add-new-question ">
                <div className='form-group'>
                    <label>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        placeholder={"Quiz..."}
                        isClearable={true}
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
                                    type="file" hidden
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

export default QuizQA;
