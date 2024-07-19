import { Tooltip, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import './DashBoard.scss'
import { getOverview } from '../../../services/apiService';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const DashBoard = (props) => {
    const { t } = useTranslation()
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchData()
    }, [t])

    const fetchData = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            //pprocess chart data
            console.log(res)
            let Qz = 0, Qs = 0, As = 0;;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": t('dashboard.title1'),
                    "Qz": Qz,
                },
                {
                    "name": t('dashboard.title2'),
                    "Qs": Qs,
                },
                {
                    "name": t('dashboard.title3'),
                    "As": As,
                }
            ]
            setDataChart(data)
            console.log(data)
        }
    }
    return (
        <div className="dashboard-container">
            <div className="title">
                {t('dashboard.title4')}
            </div>
            <div className="content">
                <div className='c-left'>
                    <div className='child'>
                        <span className='title-1'>{t('dashboard.title5')}</span>
                        <span className='title-2'>
                            {
                                dataOverview && dataOverview.users &&
                                    dataOverview.users.total ? <>{dataOverview.users.total}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='title-1'>{t('dashboard.title6')}</span>
                        <span className='title-2'>
                            {
                                dataOverview && dataOverview.others &&
                                    dataOverview.others.countQuiz ? <>{dataOverview.others.countQuiz}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='title-1'>{t('dashboard.title7')}</span>
                        <span className='title-2'>
                            {
                                dataOverview && dataOverview.others &&
                                    dataOverview.others.countQuestions ? <>{dataOverview.others.countQuestions}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='title-1'>{t('dashboard.title8')}</span>
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
                            <YAxis />
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