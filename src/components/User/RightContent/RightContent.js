
const RightContent = (props) => {
    const { dataQuiz } = props;
    return (
        <>
            <div className="main-timer">
                10:10
            </div>
            <div className="main-questions">
                {
                    dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div className="question" key={item.id}>{index + 1}</div>
                        )

                    })
                }


            </div >
        </>
    )
}
export default RightContent;