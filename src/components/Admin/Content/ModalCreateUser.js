import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";

import React from 'react';
import axios from 'axios';

const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    // const [show, setShow] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleUpdloadImage = (event) => {
        if (event.target && event.target && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }

    }

    const handleSubSmitCreateUser = async () => {
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);

        await axios.post('http://localhost:8081/api/v1/participant', data)
        alert('click me')
    }

    return (
        <>
            <Button variant="primary" onClick={show} hidden>
                Launch demo modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                backdrop="static"
                className='modal-add-users'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new User</Modal.Title>
                </Modal.Header>
                <Modal.Body size>
                    {<form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">UserName</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label htmlFor="fileInput" className='form-label label-upload'>
                                <FcPlus />Upload File Image
                            </label>
                            <input
                                type='file'
                                id='fileInput' hidden
                                onChange={(event) => handleUpdloadImage(event)}
                            // value={image} ở đây nó không đc dùng vì tinh bảo mật, khi đã khai báo type='file' thì khonng cho phép đật giá trị iput cảu js 1 cáh truc tiep
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage
                                ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubSmitCreateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalCreateUser;