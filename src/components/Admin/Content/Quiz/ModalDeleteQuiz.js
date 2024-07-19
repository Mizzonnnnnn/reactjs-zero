import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete, setDataDelete, fetchQuiz } = props;
    const { t } = useTranslation()
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
                    <Modal.Title>{t('modaldelquiz.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('modaldelquiz.title2')}<b>{dataDelete && dataDelete.id ? dataDelete.id : t('modaldelquiz.title3')}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modaldelquiz.title4')}
                    </Button>
                    <Button variant="primary" onClick={handleSubSmitDeleteUser}>
                        {t('modaldelquiz.title5')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;