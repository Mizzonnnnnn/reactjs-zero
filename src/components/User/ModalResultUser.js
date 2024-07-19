import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const ModalResultUser = (props) => {
    const { show, setShow, dataModalResult } = props;
    const handleClose = () => {
        setShow(false);
    };
    const { t } = useTranslation()
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modalresultuser.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {t('modalresultuser.title2')} <b>{dataModalResult.countTotal}</b>
                    </div>
                    <div>
                        {t('modalresultuser.title3')}<b>{dataModalResult.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modalresultuser.title4')}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t('modalresultuser.title5')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResultUser;