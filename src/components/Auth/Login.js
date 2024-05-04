import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { FiEyeOff, FiEye } from "react-icons/fi";

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

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
            toast.error("Invalid Email!")
            return;
        }
        if (!password) {
            toast.error("Invalid Password");
        }
        // submit api
        let res = await postLogin(email, password);
        console.log(res)
        // validate
        if (res && res.EC === 0) {
            toast.success(res.EM)
            navigate("/")
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }

    }

    const handleBackSignUp = () => {
        navigate("/register")
    }

    const handleBackHome = () => {
        navigate("/")
    }
    return (
        <div className='login-container' >
            <div className='header'>
                <span>Don't have an account yet?    </span>
                <button onClick={() => handleBackSignUp()}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto' onClick={() => handleBackHome()}>
                Mizzon, Hi
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto' >
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={"email"}
                        placeholder='bruce@wayne.com'
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className='form-group pass-group'>
                    <label>Password</label>
                    <input
                        type={isShowPassword === true ? "text" : "password"}
                        className='form-control'
                        value={password}
                        placeholder='At least 8 characters'
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    {
                        isShowPassword ?
                            <span className='icons-eye'
                                onClick={() => setIsShowPassword(false)}>
                                <FiEye />
                            </span> :

                            <span className='icons-eye'
                                onClick={() => setIsShowPassword(true)}>
                                <FiEyeOff />
                            </span>
                    }
                </div>
                <span className='forgot-password'>Forgot password?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                    >Log in to Mizzon
                    </button>
                </div>
                <div className='back text-center'>
                    <span onClick={() => handleBackHome()}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;