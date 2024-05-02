import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delDeleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';


const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubSmitDeleteUser = async () => {
        let data = await delDeleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            props.setCurrentPage(1)
            await props.fetchListUserWithPaginate(1);
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
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are youu sure to delete this use, email = <b>{dataDelete && dataDelete.email ? dataDelete.email : "Not found Email"}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubSmitDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;