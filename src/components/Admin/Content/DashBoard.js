import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import './DashBoard.scss'
import { Tooltip } from 'react-bootstrap';
import { getOverview } from '../../../services/apiService';
import { useState, useEffect } from 'react';
const DashBoard = (props) => {

    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            //pprocess chart data
            let Qz = 0, Qs = 0, As = 0;;
            Qz = res.DT.others.countQuiz;
            Qs = res.DT.others.countQuestions;
            As = res.DT.others.countAnswers;;
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                }
            ]
            setDataChart(data)
        }
        console.log(res)
    }
    return (
        <div className="dashboard-container">
            <div className="title">
                Analytics Dashboard
            </div>
            <div className="content">
                <div className='c-left'>
                    <div className='child'>
                        <span className='title-1'>Total Users</span>
                        <span className='title-2'>
                            {
                                dataOverview && dataOverview.users &&
                                    dataOverview.users.total ? <>{dataOverview.users.total}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='title-1'>Total Quizzes</span>
                        <span className='title-2'>
                            {
                                dataOverview && dataOverview.others &&
                                    dataOverview.others.countQuiz ? <>{dataOverview.others.countQuiz}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='title-1'>Total Questions</span>
                        <span className='title-2'>
                            {
                                dataOverview && dataOverview.others &&
                                    dataOverview.others.countQuestions ? <>{dataOverview.others.countQuestions}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='title-1'>Total Answers</span>
                        <span className='title-2'>
                            {
                                dataOverview && dataOverview.others &&
                                    dataOverview.others.countAnswers ? <>{dataOverview.others.countAnswers}</> : <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height="95%" >
                        <BarChart width={730} height={300} data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#FFC708" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;