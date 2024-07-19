import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import _ from 'lodash';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import { useTranslation } from 'react-i18next';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const { t } = useTranslation();

    useEffect(() => {

        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setType(dataUpdate.difficulty);
            setImage(dataUpdate.image);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [props.dataUpdate]);

    const handleClose = () => {
        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        document.getElementById("labelUpload").value = "";
        setPreviewImage("");
        setDataUpdate({});
    };


    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }
    const handleSubSmitCreateUser = async () => {
        if (!name) {
            toast.error(t('modalupdatequiz.title8'))
            return;
        }

        if (!description) {
            toast.error(t('modalupdatequiz.title9'))
            return;
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, type, image);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            await props.fetchQuiz();
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                backdrop="static"
                className='modal-add-users'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modalupdatequiz.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body size>
                    {<form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('modalupdatequiz.title2')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">{t('modalupdatequiz.title3')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">{t('modalupdatequiz.type.title')}</label>
                            <select className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}>
                                <option value="EASY">{t('modalupdatequiz.type.easy')}</option>
                                <option value="MEDIUM">{t('modalupdatequiz.type.medium')}</option>
                                <option value="HARD">{t('modalupdatequiz.type.hard')}</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor="labelUpload" >
                                <FcPlus />{t('modalupdatequiz.title4')}
                            </label>
                            <input
                                type='file'
                                id='labelUpload' hidden
                                onChange={(event) => handleUploadImage(event)}
                                defaultValue={image}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt='nhin cai lol gi, bat ngo lam ak' />
                                :
                                <span>{t('modalupdatequiz.title5')}</span>
                            }
                        </div>
                    </form>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modalupdatequiz.title6')}
                    </Button>
                    <Button variant="primary" onClick={handleSubSmitCreateUser}>
                        {t('modalupdatequiz.title7')}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUpdateQuiz;