import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';


const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete, setDataDelete, fetchQuiz } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubSmitDeleteUser = async () => {
        let data = await deleteQuizForAdmin(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            await fetchQuiz();
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
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are youu sure to delete this use, id = <b>{dataDelete && dataDelete.id ? dataDelete.id : "Not found Id"}</b> </Modal.Body>
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

export default ModalDeleteQuiz;