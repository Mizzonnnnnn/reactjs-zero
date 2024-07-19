import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { FaSpinner } from "react-icons/fa";
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';
const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowLoad, setIsShowLoad] = useState(false);
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {

        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error(t('login.ie'))
            return;
        }
        if (!password) {
            toast.error(t('login.ip'));
        }

        setIsShowLoad(true)
        // submit api
        let data = await postLogin(email, password);
        // validate
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsShowLoad(false)
            navigate("/")
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM)
            setIsShowLoad(false)
        }

    }

    const handleBackSignUp = () => {
        navigate("/register")
    }

    const handleBackHome = () => {
        navigate("/")
    }

    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
        }
    }
    return (
        <div className='login-container'>
            <div className='header'>
                <span>{t('login.title1')}</span>
                <button onClick={handleBackSignUp}>{t('login.title2')}</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto' onClick={handleBackHome}>
                {t('login.signUp')}
            </div>
            <div className='welcome col-4 mx-auto'>
                {t('login.hello')}
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>{t('login.email')}</label>
                    <input
                        type="email"
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>{t('login.password')}</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <span className='icons-eye' onClick={() => setIsShowPassword(!isShowPassword)}>
                        {isShowPassword ? <FiEye /> : <FiEyeOff />}
                    </span>
                </div>
                <span className='forgot-password'>{t('login.forgotPassword')}</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={handleLogin}
                        disabled={isShowLoad}
                    >
                        {isShowLoad && <FaSpinner className='loaderIcon' />}
                        <span>{t('login.loginToMizzon')}</span>
                    </button>
                </div>
                <div className='back text-center'>
                    <span onClick={handleBackHome}>&#60;&#60; {t('login.goToHomepage')}</span>
                </div>
            </div>
        </div>
    );
}

export default Login;