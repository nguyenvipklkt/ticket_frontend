import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/App.css';
import logo from '../assets/imgs/login/mascot.png'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    // const checkEnter = (event) => {
    //     if (event.keyCode === 13) {
    //         event.preventDefault();
    //         document.getElementById("myButton").click();
    //     }
    // }
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', {
                email: email,
                passwordIn: password
            });

            // Xử lý phản hồi từ API ở đây
            console.log(response.data);

            if (response.data.result) {
                alert('Login successful!');
                // const root = ReactDOM.createRoot(document.getElementById('root'));

                // root.render(
                //     <React.StrictMode>
                //         <HomePage />
                //     </React.StrictMode>
                // );
                navigate('/homePage');
            }
            else {
                alert('Login fail!');
            }
        } catch (error) {
            // Xử lý lỗi và hiển thị thông báo lỗi
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        }
    };

    return (
        <div>
            {/* <h2>Đăng nhập</h2>
            <div>
                <label>Tên người dùng:</label>
                <input type="text" value={email} onChange={handleEmailChange} />
            </div>
            <div>
                <label>Mật khẩu:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button onClick={handleLogin}>Đăng nhập</button>
            {errorMessage && <div>{errorMessage}</div>} */}
            <div id="log-in-content">
                <div class="log-in-body">
                    <h1 class="log-in-heading">Đăng nhập</h1>
                    <div class="first-line">
                        <div class="log-in-email">
                            <div class="line"><label for="email">Email:</label></div>
                            {/* <input type="email" id="email" name="email" required> */}
                            <input type="text" value={email} onChange={handleEmailChange} />
                        </div>
                    </div>
                    <div class="second-line">
                        <div class="log-in-pass">
                            <div class="line"><label for="password">Mật khẩu:</label></div>
                            {/* <input type="password" id="password" name="password" required> */}
                            <input type="password" value={password} onChange={handlePasswordChange} />
                        </div>
                    </div>
                    {/* <input type="submit" value="Đăng Nhập"> */}
                    <button onClick={handleLogin} class="btn-login">Đăng nhập</button>
                    {errorMessage && <div>{errorMessage}</div>}
                    <p class="if-log">Nếu bạn chưa đăng ký tài khoản, hãy <a href="signup">đăng ký</a> ở đây.</p>
                </div>
                <div class="sign-up-logo">
                    <img src={logo} alt={"logo"} class="sign-up-img" />
                </div>
            </div>
        </div>
    );
};

export default Login;