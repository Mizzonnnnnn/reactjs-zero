import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from "react-i18next";
import { FaReact } from "react-icons/fa";
import './Header.scss'
const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();

    const handleLogin = () => {
        navigate("/login");
    }
    const handleRegister = () => {
        navigate("/register")
    }
    console.log(account)
    const handleLogout = async () => {
        let res = await logout(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(doLogout())
            navigate("/login")
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>

                <NavLink to="/" className='navbar-brand'><FaReact className='icon' /> Mizzon</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'> {t('header.title1')}</NavLink>
                        <NavLink to="/users" className='nav-link'> {t('header.title2')}</NavLink>
                        <NavLink to="/admins" className='nav-link'> {t('header.title3')}</NavLink>

                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>{t('header.title5.Login')}</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>{t('header.title5.Signup')}</button>
                            </>
                            :
                            <NavDropdown title={i18n.language === 'vi' ? "Cài đặt" : "Setting"} id="basic-nav-dropdown">
                                <NavDropdown.Item>{t('header.title4.Profile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogout()}>{t('header.title4.Logout')}</NavDropdown.Item>
                            </NavDropdown>
                        }

                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;