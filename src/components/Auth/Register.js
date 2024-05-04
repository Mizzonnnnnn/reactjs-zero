import './Register.scss'
import { useNavigate } from 'react-router-dom';
import picture from '../../assets/product.webp'
import { useState } from 'react';
import { postRegister } from '../../services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
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
            toast.error("Invalid Email!")
            return;
        }
        if (!password) {
            toast.error("Invalid Password");
        }
        let data = await postRegister(email, username, password);
        console.log(data);
        if (data.EC === 0) {
            navigate('/login')
            toast.success(data.EM)
        }

        if (data.EC !== 0) {
            toast.error(data.EM)
        }
    }

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
                    <p >
                        Sign Up <br /> and come on in
                    </p>
                </div>
                <div className='picture'>
                    <img src={picture} alt='' />
                </div>
                <div >
                    <label className='footer' onClick={() => handleBackHome()}>@Mizzon</label>
                </div>

            </div>

            <div className="column right">
                <div className='head'>
                    <label>Already have an account?</label>
                    <button onClick={() => handleBackLogin()}> Login</button>
                </div>
                <div>
                    <h2 className='title-sign'> Get better data with conversational forms, surveys, quizzes & more.</h2>
                </div>
                <div className='col-md-4'>
                    <label>Email (*)</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        placeholder='Email'
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className='col-md-4'>
                    <label>UserName</label>
                    <input
                        type={"text"}
                        className='form-control'
                        value={username}
                        placeholder="UserName"
                        onChange={(event) => setUsername(event.target.value)}
                    ></input>
                </div>

                <div className='col-md-4 pass-group' >
                    <label>Password (*)</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className='form-control'
                        value={password}
                        placeholder='Password'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {
                        isShowPassword ?
                            <span className='icons-eye'
                                onClick={() => setIsShowPassword(false)}
                            >

                                <AiTwotoneEye />
                            </span>
                            :
                            <span className='icons-eye'
                                onClick={() => setIsShowPassword(true)}
                            >
                                <AiTwotoneEyeInvisible />
                            </span>

                    }

                </div>
                <div className='col-md-4'>
                    <button
                        className='btn-submit'
                        onClick={handleSubmit}
                    >
                        Create my free account
                    </button>
                </div>
                <div className='back text-center'>
                    <span onClick={() => handleBackHome()}>&#60;&#60; Go to Homepage</span>
                </div>

            </div>
        </div >
    )
}


export default Register;