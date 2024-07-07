import React, { useState, useRef } from "react";
import CountDown from "./CountDown"

const RightContent = (props) => {
    const { dataQuiz, handleFinshQuiz, show } = props;
    const [isPaused, setIsPaused] = useState(false);
    const refDiv = useRef([])

    const onTimeUp = () => {
        handleFinshQuiz();
    }
    const onTimeMust = () => {
        setIsPaused(!isPaused)
    }

    const getClassQuestion = (question, index) => {
        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.some(a => a.isSelected !== false);
            if (isUnAnswered === true) {
                return "question selected"
            }
        }
        return "question"
    }

    const handleClickQuestion = (question, index) => {
        props.setIndex(index)
        if (refDiv.current) {
            console.log(refDiv.current)
            refDiv.current.forEach(item => {
                if (item && item.className === "question click") {
                    item.className = "question";
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.some(a => a.isSelected !== false);
            if (isUnAnswered === true) {
            }
        }
        refDiv.current[index].className = "question click"
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                    onTimeMust={onTimeMust}
                    show={show}
                />
            </div>
            <div className="main-questions">
                {
                    dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                className={getClassQuestion(item, index)}
                                key={index}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}
                            >{index + 1}</div>

                        )

                    })
                }
            </div >
        </>
    )
}
export default RightContent;