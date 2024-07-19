import './Register.scss'
import { useNavigate } from 'react-router-dom';
import picture from '../../assets/product.webp'
import { useState } from 'react';
import { postRegister } from '../../services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const { t } = useTranslation();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error(t('signup.ie'));
            return;
        }
        if (!password) {
            toast.error(t('signup.ip'));
            return;
        }
        let data = await postRegister(email, username, password);
        if (data.EC === 0) {
            navigate('/login');
            toast.success(data.EM);
        } else {
            toast.error(data.EM);
        }
    };

    const handleBackHome = () => {
        navigate('/')
    }
    const handleBackLogin = () => {
        navigate('/login')
    }

    return (
        <div className="register-container">
            <div className="column left" >
                <div className='title'>
                    <p>
                        {t('signup.title1')} <br /> {t('signup.title2')}
                    </p>
                </div>
                <div className='picture'>
                    <img src={picture} alt='' />
                </div>
                <div>
                    <label className='footer' onClick={handleBackHome}>@Mizzon</label>
                </div>
            </div>

            <div className="column right">
                <div className='head'>
                    <label>{t('signup.title3')}</label>
                    <button onClick={handleBackLogin}>{t('signup.login')}</button>
                    <label>
                        <Language />
                    </label>
                </div>
                <div>
                    <h2 className='title-sign'>{t('signup.title-sign')}</h2>
                </div>
                <div className='col-md-4'>
                    <label>{t('signup.email')} (*)</label>
                    <input
                        type="email"
                        className='form-control'
                        value={email}
                        placeholder='bruce@wayne.com'
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='col-md-4'>
                    <label>{t('signup.username')}</label>
                    <input
                        type="text"
                        className='form-control'
                        value={username}
                        placeholder="zxy"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div className='col-md-4 pass-group'>
                    <label>{t('signup.password')} (*)</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className='form-control'
                        value={password}
                        placeholder={t('signup.al')}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {
                        isShowPassword ?
                            <span className='icons-eye' onClick={() => setIsShowPassword(false)}>
                                <AiTwotoneEye />
                            </span>
                            :
                            <span className='icons-eye' onClick={() => setIsShowPassword(true)}>
                                <AiTwotoneEyeInvisible />
                            </span>
                    }
                </div>
                <div className='col-md-4'>
                    <button className='btn-submit' onClick={handleSubmit}>
                        {t('signup.create')}
                    </button>
                </div>
                <div className='back text-center'>
                    <span onClick={handleBackHome}>&#60;&#60; {t('signup.goToHomepage')}</span>
                </div>
            </div>
        </div>
    )
}

export default Register;
