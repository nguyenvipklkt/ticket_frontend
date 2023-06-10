import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faLocationDot, faCalendar, faClock, faPersonCircleCheck, faTrophy, faCalendarDays, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import firstLogo from '../assets/imgs/firstLogo/logo.png';
import triky from '../assets/imgs/filmbanner/triky.jpg'

const BuyTicket = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }

    // lấy thông tin người dùng đăng nhập
    var user = {};
    var userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage) {
        user = JSON.parse(userInLocalStorage);
    }

    // lấy thông tin film đã chọn
    var film = {};
    var filmInLocalStorage = localStorage.getItem("film");
    if (filmInLocalStorage) {
        film = JSON.parse(filmInLocalStorage);
    }

    // chuyển chuỗi date về ngày/tháng/năm
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getMovieType = (movieType) => {
        movieType = film.movieType;
        if (movieType == 1) {
            return "Drama";
        }
        else if (movieType == 2) {
            return "Hành động";
        }
        else if (movieType == 3) {
            return "Hoạt hình";
        }
        else if (movieType == 4) {
            return "Ma quỷ";
        }
        else if (movieType == 5) {
            return "Lãng mạn";
        }
        else if (movieType == 6) {
            return "Hài hước";
        }
    }

    return (
        <div>
            {/* header  */}
            <div id="header">
                <div class="nav">
                    <ul class="list">
                        <li><a href="">Mua vé</a></li>
                        <li><a href="">Lịch chiếu</a></li>
                        <li class="film">
                            <div class="header-film" href="" onClick={handleDropdown}>Phim <FontAwesomeIcon icon={faCaretDown} onClick={handleDropdown} /></div>
                            {
                                isOpen && (
                                    <ul class="sub-list-film">
                                        <li><a href="">Đang chiếu</a></li>
                                        <li><a href="">Sắp chiếu</a></li>
                                    </ul>
                                )
                            }
                        </li>
                        <li>
                            <a class="" href="">Rạp</a>
                        </li>
                    </ul>
                    <div class="logo">
                        <a href=""><img src={firstLogo} alt="img" class="img-logo" /></a>
                    </div>
                    <div class="search">
                        <input type="text" class="input-search" placeholder="Search..." />
                    </div>
                    <div class="map"><a>Địa điểm</a><FontAwesomeIcon icon={faLocationDot} /></div>
                    <div class="helloUser">{user.lastName} {user.firstName}</div>
                </div>
            </div>

            {/* header  */}

            {/* body  */}
            <div id="inf-film-content">
                <div class="inf-film">
                    <img src={film.Image} alt="" />
                    <div class="detail-inf-film">
                        <div class="name-film">{film.nameFilm}</div>
                        <div class="sub-name-film">{film.nameFilm} - {getMovieType(film.movieType)}</div>
                        <div class="op-film">
                            <div class="-trailer">Trailer</div>
                            <div class="buy-ticket">Mua vé</div>
                        </div>
                        <div class="explain-film">{film.nameFilm} mang đậm màu sắc của một thời tuổi trẻ đẹp đẽ, hồn nhiên
                            đầy khát vọng nhưng đâu đó cũng nhuốm nhiều vệt màu đau thương.</div>
                        <div class="extra-explain-film">
                            <div class="premiere ex">
                                <div class="title-premiere"><FontAwesomeIcon icon={faCalendar} /> Khởi chiếu</div>
                                <div class="content-premiere content-ex">{getFormattedDate(film.releaseDate)}</div>
                            </div>
                            <div class="time ex">
                                <div class="title-time"><FontAwesomeIcon icon={faClock} /> Thời lượng</div>
                                <div class="content-time content-ex">{film.time} phút</div>
                            </div>
                            <div class="age">
                                <div class="title-age"><FontAwesomeIcon icon={faPersonCircleCheck} /> Giới hạn tuổi</div>
                                <div class="content-age content-ex">NC16</div>
                            </div>
                        </div>
                    </div>
                    <div class="crew">
                        <div class="actor">Diễn viên</div>
                        <div class="detail">{film.cast}</div>
                        <div class="director">Đạo Diễn</div>
                        <div class="detail">{film.author}</div>
                        <div class="producer"></div>
                    </div>
                </div>
            </div>
            {/* body  */}
        </div>
    )
}

export default BuyTicket;