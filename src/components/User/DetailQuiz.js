import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import './DetailQuiz.scss';
import Question from "./Question";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        if (res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers: answers, questionDescription, image }
                })
                .value()
            console.log(data);
            setDataQuiz(data);
        }
    }
    console.log(">>> check dataQuiz: ", dataQuiz);

    const handlePrev = () => {
        if (index - 1 < 0) {
            return;
        }
        setIndex(index - 1);
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); // react hool doesn't merge state
        let question = dataQuizClone.find(item => +item.questionId === +questionId);

        // Đoạn mã này kiểm tra xem question có tồn tại và có answers không. Nếu có, nó sẽ sử dụng map để duyệt qua các câu trả lời
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;
        }
        // Dòng này tìm chỉ mục (index) của câu hỏi trong mảng dataQuizClone dựa trên questionId.
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        // Kiểm tra xem chỉ mục của câu hỏi có tồn tại trong mảng không trước khi cập nhật.
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId} {location?.state?.quizTitle}
                    <hr />
                </div>

                <div className="q-content">
                    <Question
                        data={
                            dataQuiz && dataQuiz.length > 0 ?
                                dataQuiz[index] : []
                        }

                        handleCheckbox={handleCheckbox}
                        index={index} />
                </div>
                <div className="footer">
                    <button className="btn btn-primary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-secondary" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={() => handleNext()}>Finish</button>
                </div>
            </div>

            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz;