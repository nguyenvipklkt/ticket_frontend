import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/App.css';
import logo from '../assets/imgs/login/mascot.png';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Gọi API đăng ký tài khoản ở đây
            const response = await axios.post('http://localhost:4000/api/v1/create-user', {
                firstName,
                lastName,
                email,
                password,
                address,
            });

            // Xử lý phản hồi từ API (nếu cần)
            console.log(response.data);
            if (response.data.result) {
                alert('Sign up successful!');
                navigate('/login');
            }
            else {
                alert('Sign Up fail!');
            }
            // Reset các trường sau khi đăng ký thành công
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setAddress('');
        } catch (error) {
            // Xử lý lỗi khi gọi API (nếu cần)
            console.error(error);
        }
    };
    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <label>
                    Tên:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Tên đệm:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Mật khẩu:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Địa chỉ:
                    <input
                        type="text"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Đăng ký</button>
            </form> */}
            <div id="sign-up-content">
                <div class="sign-up-body">
                    <h1 class="sign-up-heading">Đăng ký</h1>
                    <form onSubmit={handleSubmit}>
                        <div class="first-line">
                            <div class="sign-up-firstName">
                                <div class="line"><label for="name">Tên:</label></div>
                                {/* <input type="text" id="name" name="name" required> */}
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                            </div>
                            <div class="sign-up-lastName">
                                <div class="line"><label for="name">Tên đệm:</label></div>
                                {/* <input type="text" id="name" name="name" required> */}
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                            </div>
                            <div class="sign-up-email">
                                <div class="line"><label for="email">Email:</label></div>
                                {/* <input type="email" id="email" name="email" required> */}
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div class="sign-up-pass">
                                <div class="line"><label for="password">Mật khẩu:</label></div>
                                {/* <input type="password" id="password" name="password" required> */}
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div class="sign-up-address">
                                <div class="line"><label for="address">Địa chỉ:</label></div>
                                {/* <input type="password" id="password" name="password" required> */}
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </div>

                            <button type="submit" class="btn-login">Đăng ký</button>
                        </div>

                        {/* <input type="submit" value="Đăng ký"> */}

                    </form>
                    <p>Nếu bạn đã có tài khoản, hãy <a href="login">đăng nhập</a> ở đây.</p>
                </div>
                <div class="sign-up-logo">
                    <img src={logo} alt={"logo"} class="sign-up-img" />
                </div>
            </div>
        </div>
    )
}

export default Signup;