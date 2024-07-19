import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("");
    const { t } = useTranslation()
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email);
            setUsername(dataView.username);
            setImage(dataView.image);
            setRole(dataView.role);
            if (dataView.image) {
                setPreviewImage(`data:image/png;base64,${dataView.image}`);
            }
        }
    }, [dataView, setShow])
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setImage("");
        setRole("USER");
        setPreviewImage("");

        props.resetViewData();
    };

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
                    <Modal.Title>{t('modalviewuser.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body size>
                    {<form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('modalviewuser.title2.Email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled='true'
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">{t('modalviewuser.title2.Password')}</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled='true'
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">{t('modalviewuser.title2.UserName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">{t('modalviewuser.title2.Role.title')}</label>
                            <select
                                className="form-select"
                                value={role}
                                disabled
                            >
                                <option value="ADMIN">{t('modalviewuser.title2.Role.admin')}</option>
                                <option value="USER">{t('modalviewuser.title2.Role.user')}</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label htmlFor="fileInput" className='form-label label-upload'>
                                <FcPlus />{t('modalviewuser.title2.uploadfile')}
                            </label>
                            <input
                                type='file'
                                id='fileInput'
                                hidden
                                disabled
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage
                                ?
                                <img src={previewImage} alt='nhin cai lol gi, bat ngo lam ak' />
                                :
                                <span>{t('modalviewuser.title2.previewimage')}</span>
                            }
                        </div>
                    </form>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modalviewuser.title3')}
                    </Button>
                    <Button variant="primary">
                        {t('modalviewuser.title4')}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalViewUser;