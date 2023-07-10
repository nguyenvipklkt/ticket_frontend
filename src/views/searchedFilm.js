import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate, useParams } from "react-router-dom";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faCaretDown, faTicket, faCalendar, faClock, faPersonCircleCheck, faMagnifyingGlass, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import firstLogo from '../assets/imgs/firstLogo/logo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/swiper-bundle.css';

const SearchedFilm = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }

    var user = {};
    var userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage) {
        user = JSON.parse(userInLocalStorage);
    }

    var searchedFilms = {}
    var searchedFilmInLocalStorage = localStorage.getItem("searchedFilm");
    if (searchedFilmInLocalStorage) {
        searchedFilms = JSON.parse(searchedFilmInLocalStorage);
    }

    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

    // tìm kiếm film
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/searchFilm/${searchTerm}`);
            const films = response.data.films;
            // Chuyển hướng đến trang kết quả tìm kiếm và truyền dữ liệu qua props
            if (response.data.message == 'name is empty' || !response.data.message) {
                alert("Nội dung tìm kiếm không chính xác");
            }
            else {
                localStorage.setItem('searchedFilm', JSON.stringify(films));
                navigate('/searchedFilm');
            }
        } catch (error) {
            alert("Nội dung tìm kiếm không chính xác");
            console.error(error);
        }
    };

    // tạo mảng idFilms chứa idFilm
    const idFilms = searchedFilms.map(film => film.idFilm);

    const getFilmById = (id) => {
        return searchedFilms.find(film => film.idFilm === id);
    };

    // giới hạn chuỗi tên film
    const limitString = (str) => {
        if (str.length > 9) {
            return str.substring(0, 9) + '...';
        }
        return str;
    };

    // chuyển chuỗi releaseDate về chuỗi chỉ gồm ngày và tháng
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day}/${month}`;
    };

    const Card = ({ id }) => {
        const film = getFilmById(id);
        const handleFilm = () => {
            localStorage.setItem('film', JSON.stringify(film));
            navigate('/buyTicket');
        }
        return (
            <div>
                <div class="card first-card">
                    <div class="card-content" onClick={handleFilm}>
                        <div class="image">
                            <img src={film.Image} alt="" />
                            <a href="" class="bottom-img">Mua vé</a>
                        </div>
                        <div class="card-body" onClick={handleFilm}>
                            <a href="" title="">{limitString(film.nameFilm)}</a>
                            <div class="detail-card">
                                <div class="time-card">{getFormattedDate(film.releaseDate)}</div>
                                <div class="like-card">
                                    <a href="" class="in-like-card">
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                        100%
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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
                                        <li><a href="nowFilm">Đang chiếu</a></li>
                                        <li><a href="futureFilm">Sắp chiếu</a></li>
                                    </ul>
                                )
                            }
                        </li>
                        <li>
                            <a class="" href="">Rạp</a>
                        </li>
                    </ul>
                    <div class="logo">
                        <a href="homePage"><img src={firstLogo} alt="img" class="img-logo" /></a>
                    </div>
                    <div class="search">
                        <input type="text" class="input-search" placeholder="..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                    <div class="map" ><a href="bookedTicket"> <FontAwesomeIcon icon={faTicket} /> Vé đã đặt</a></div>
                    <div class="helloUser">{user.lastName} {user.firstName}</div>
                </div>
            </div>

            {/* header  */}

            {/* content */}
            <div id="content">
                <div class="heading-content">
                    <div class="container">
                        {/* text center */}

                        <h2 class="text-center">
                            <a href="" class="text-now-film">Kết quả</a>
                        </h2>
                        {/* text center */}

                        {/* card  */}
                        <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            class="swiper"
                            spaceBetween={5}
                            slidesPerView={5}
                        // onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                        >
                            <div>
                                {idFilms.map(idFilm => (
                                    <SwiperSlide><Card key={idFilm} id={idFilm} /></SwiperSlide>
                                ))}
                                {/* <Swiper.Pagination /> */}
                            </div>
                        </Swiper>
                        {/* card  */}
                    </div>
                </div>
            </div>
            {/* content */}
        </div>
    )

}

export default SearchedFilm;