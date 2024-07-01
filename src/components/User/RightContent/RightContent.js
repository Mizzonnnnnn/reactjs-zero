import { useState } from "react";
import CountDown from "./CountDown"

const RightContent = (props) => {
    const { dataQuiz, handleFinshQuiz,show } = props;
    const [isPaused, setIsPaused] = useState(false);

    const onTimeUp = () => {
        handleFinshQuiz();
    }
    const onTimeMust = () => {
        setIsPaused(!isPaused)
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
                            <div className="question" key={index}>{index + 1}</div>
                        )

                    })
                }


            </div >
        </>
    )
}
export default RightContent;