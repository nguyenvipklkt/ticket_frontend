import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faTicket, faCalendar, faClock, faPersonCircleCheck, faMagnifyingGlass, faThumbsUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import firstLogo from '../assets/imgs/firstLogo/logo.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import lastLogo from '../assets/imgs/Last-Logo/favicon-large.png';
import beta from '../assets/imgs/Partner/beta-cineplex-v2.jpg';
import cinemax from '../assets/imgs/Partner/cinemax.png';
import member from '../assets/imgs/event/545x415-member-163558-210121-74.jpg';
import madSaleDay from '../assets/imgs/event/545x415-mad-sale-day-164833-210121-30.jpg';
import t3vv from '../assets/imgs/event/545x415-t3vv-1-164323-210121-12.jpg';
import hssv from '../assets/imgs/event/545x415-hssv-165349-210121-45.jpg';

const NowFilm = () => {

    // get user is loging
    var user = {};
    var userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage) {
        user = JSON.parse(userInLocalStorage);
    }

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const [nowFilm, setNowFilm] = useState([]);
    const [movieType, setMovieType] = useState('');

    const handleGenreChange = (event) => {
        setMovieType(event.target.value);
    };

    // lấy dữ liệu dataFilm từ backend
    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/films/now-showing")
            .then(response => {
                const jsonData = JSON.parse(JSON.stringify(response.data.films));
                setNowFilm(jsonData); // Dữ liệu đã được chuyển đổi thành đối tượng JSON
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // tạo mảng idFilms chứa idFilm
    const idFilms = nowFilm.map(film => film.idFilm);

    const getFilmById = (id) => {
        return nowFilm.find(film => film.idFilm === id);
    };

    // chuyển chuỗi releaseDate về chuỗi chỉ gồm ngày và tháng
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day}/${month}`;
    };

    // giới hạn chuỗi tên film
    const limitString = (str) => {
        if (str.length > 9) {
            return str.substring(0, 9) + '...';
        }
        return str;
    };

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

    // tạo thẻ film hiển thị trên web
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
            <div id="header">
                <div class="nav">
                    <ul class="list">
                        <li><a href="typeFilm">Mua vé</a></li>
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
                        <input type="text" class="input-search" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <button onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                    <div class="map" ><a href="bookedTicket"> <FontAwesomeIcon icon={faTicket} /> Vé đã đặt</a></div>
                    <div class="helloUser">{user.lastName} {user.firstName}</div>
                </div>
            </div>
            {/* content */}
            <div id="content">
                <div class="heading-content">
                    <div class="container">
                        {/* text center */}

                        <h2 class="text-center">
                            <a href="" class="text-now-film">Phim trong tuần</a>
                        </h2>
                        {/* text center */}

                        {/* option */}
                        {/* <div className='option-MovieType'>
                            <label for="movieType">Chọn thể loại : </label>

                            <select id="movieType" value={movieType} onChange={handleGenreChange} required>
                                <option value="">Chọn thể loại</option>
                                <option value="1">Hành động</option>
                                <option value="2">Tình cảm</option>
                                <option value="3">Hoạt hình</option>
                                <option value="4">Kinh dị</option>
                            </select>
                        </div> */}
                        {/* option */}

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
                <div class="event-content">
                    <div class="text-event">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        Sự kiện
                    </div>
                    <div class="sub-text-event">
                        Thành viên Moveek với các ưu đãi
                    </div>
                    <div class="inf-event-content">
                        <ul class="image-event">
                            <li>
                                <img src={member} alt="" />
                                <p class="title-event">THÀNH VIÊN BETA - ĐỒNG GIÁ 45K/50K</p>
                            </li>
                            <li>
                                <img src={madSaleDay} alt="" />
                                <p class="title-event">SALE KHÔNG NGỪNG - MỪNG "MAD SALE DAY"</p>
                            </li>
                            <li>
                                <img src={t3vv} alt="" />
                                <p class="title-event">THỨ BA VUI VẺ</p>
                            </li>
                            <li>
                                <img src={hssv} alt="" />
                                <p class="title-event">GIÁ VÉ ƯU ĐÃI CHO HỌC SINH, SINH VIÊN</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* content */}

            {/* footer */}
            <div id="footer">
                <div class="wraper">
                    <div class="logo">
                        <img src={lastLogo} alt="img" class="img-logo" />
                    </div>
                    <div class="inf">
                        <div class="text-inf-heading">CÔNG TY TNHH MONET</div>
                        <p class="text-inf">Số ĐKKD: 0315367026 · <br />Nơi cấp: Đại học Bách Khoa Hà Nội Tp. Hà Nội · <br />Đăng ký lần đầu
                            ngày 01/11/2018
                            <br />Địa chỉ: · v8.1
                        </p>
                    </div>
                    <div class="partner">
                        <div class="a-partner">Đối tác : </div>
                        <ul class="b-partner">
                            <li><img src={beta} alt="img" /></li>
                            <li><img src={cinemax} alt="img" /></li>
                        </ul>
                    </div>
                    <div class="policy">
                        <ul class="-policy">
                            <li><a href="">Về chúng tôi</a></li>
                            <li><a href="">Chính sách và thỏa thuận</a></li>
                            <li><a href="">Hỗ trợ</a></li>
                            <li><a href="">liên hệ</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* footer */}
        </div>
    )
}

export default NowFilm;