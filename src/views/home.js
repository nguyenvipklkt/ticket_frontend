import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/css/App.css';
import firstLogo from '../assets/imgs/firstLogo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div>
            <div class="text-home">
                <div>
                    Chào mừng bạn đến với <img src={firstLogo} alt={'firstLogo'} />
                </div>
                <div class="home-signup">Bạn chưa có tài khoản, hãy bấm <a href='signup'>Đăng ký</a></div>
                <div class="home-login">Bạn đã có tài khoản, hãy bấm <a href='login'>Đăng nhập</a></div>
            </div>
        </div>
    );
};

export default Home;