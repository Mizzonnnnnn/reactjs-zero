import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Language = () => {
    const { i18n } = useTranslation();

    const handleChangeLang = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? "Việt Nam" : "English"} id="basic-nav-dropdown" className='languages'>
                <NavDropdown.Item onClick={() => handleChangeLang('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLang('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>

    );
}

export default Language;
