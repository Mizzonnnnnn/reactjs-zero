import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation } from 'react-i18next';

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);
    const { t } = useTranslation();
    const options = [
        { value: t('managequiz.title5.easy'), label: t('managequiz.title5.easy') },
        { value: t('managequiz.title5.medium'), label: t('managequiz.title5.medium') },
        { value: t('managequiz.title5.hard'), label: t('managequiz.title5.hard') },
    ];
    const handleChangeFile = (event) => {
        if (event.target && event.target && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }
    const emptyForm = () => {
        setName('')
        setDescription('')
        setType(null);
        document.getElementById('fileInput').value = '';
    }
    const handleSubmit = async () => {
        // validate
        if (!name || !description) {
            toast.error(t('managequiz.submit'));
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            emptyForm()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0" >
                    <Accordion.Header className="title">{t('managequiz.title1')}</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3 ">{t('managequiz.title2')}</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label >{t('managequiz.title3')}</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >{t('managequiz.title4')}</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <Select
                                        id='tt'
                                        value={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={t('managequiz.title5.qt')}
                                        isClearable={true}
                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>{t('managequiz.title6')}</label>
                                    <input
                                        type='file'
                                        className='form-control'
                                        id="fileInput"
                                        onChange={(event) => handleChangeFile((event))}
                                    />
                                </div>

                                <div className='mt-3'>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => handleSubmit()}
                                    >{t('managequiz.title7')}</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" >
                    <Accordion.Header className="title">{t('managequiz.title8')}</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" >
                    <Accordion.Header className="title">{t('managequiz.title9')}</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ManageQuiz;