import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import './ListQuiz.scss';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }
    return (
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((item, index) => {
                    return (
                        <div className="card" key={`list-quizs-${index}`} style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`data:image/jpeg;base64,${item.image}`} alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{t('listquiz.title1')} {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })}
                                >{t('listquiz.title2')} </button>
                            </div>
                        </div>
                    )
                })
            }

            {
                arrQuiz && arrQuiz.length === 0 &&
                <div>{t('listquiz.title3')}</div>
            }
        </div >
    )
};

export default ListQuiz;