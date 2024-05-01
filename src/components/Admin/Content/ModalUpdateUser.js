import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import _ from 'lodash';
import { putUpdateUser } from '../../../services/apiService';

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("");


    useEffect(() => {
        // console.log('run useffect', dataUpdate)
        if (!_.isEmpty(dataUpdate)) {
            setShow(false);
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            // setImage(dataUpdate.image);
            setRole(dataUpdate.role);
            // setPreviewImage(dataUpdate.previewImage);
        }
    }, [dataUpdate])
    const handleClose = () => {
        // khi bam close thi nó sẽ làm rỗng dữ liệu
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setImage("");
        setRole("USER");
        if (dataUpdate.image) {
            setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
        }
        props.resetUpdateData();
    };


    const handleUpdloadImage = (event) => {
        if (event.target && event.target && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
        }

    }
    const handleSubSmitCreateUser = async () => {
        let data = await putUpdateUser(dataUpdate.id, username, role, image);
        console.log(data)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            await props.fetchListUser();
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
                    <Modal.Title>Update new User</Modal.Title>
                </Modal.Header>
                <Modal.Body size>
                    {<form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled='true'
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled
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
                                <img src={previewImage} alt='nhin cai lol gi, bat ngo lam ak' />
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

export default ModalUpdateUser;