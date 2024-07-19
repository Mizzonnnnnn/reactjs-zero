import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { delDeleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;
    const { t } = useTranslation()
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
                    <Modal.Title>{t('modaldeluser.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('modaldeluser.title2')}<b>{dataDelete && dataDelete.email ? dataDelete.email : t('modaldeluser.title3')}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modaldeluser.title4')}
                    </Button>
                    <Button variant="primary" onClick={handleSubSmitDeleteUser}>
                        {t('modaldeluser.title5')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;