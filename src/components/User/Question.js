import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
    const { data, index } = props
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    if (_.isEmpty(data)) {
        return (<></>);
    }

    const handleCheckbox = (event, aid, qid) => {
        props.handleCheckbox(aid, qid);
    }
    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img
                        src={`data:image/jpeg;base64,${data.image}`}
                        alt="" style={{ cursor: "pointer" }}
                        onClick={() => setIsPreviewImage(true)} />
                    {isPreviewImage && (
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question-image"}
                            onClose={() => setIsPreviewImage(false)}
                        />
                    )}
                </div>
                :
                <div className="q-image"></div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription}?</div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, idx) => {
                        return (
                            <div
                                key={`answer-${idx}`}
                                className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected}
                                        onChange={(event) => handleCheckbox(event, a.id, data.questionId)} />
                                    <label className="form-check-label" >
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

        </>
    );
};

export default Question;
