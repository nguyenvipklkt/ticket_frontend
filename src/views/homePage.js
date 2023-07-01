import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate, useParams } from "react-router-dom";
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faLocationDot, faTrophy, faCalendarDays, faThumbsUp, faTicket } from '@fortawesome/free-solid-svg-icons';
import firstLogo from '../assets/imgs/firstLogo/logo.png';
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import reviewContent from '../assets/imgs/review-content/6437c9b674bb8028549539.jpg';
import member from '../assets/imgs/event/545x415-member-163558-210121-74.jpg';
import madSaleDay from '../assets/imgs/event/545x415-mad-sale-day-164833-210121-30.jpg';
import t3vv from '../assets/imgs/event/545x415-t3vv-1-164323-210121-12.jpg';
import hssv from '../assets/imgs/event/545x415-hssv-165349-210121-45.jpg';
import lastLogo from '../assets/imgs/Last-Logo/favicon-large.png';
import beta from '../assets/imgs/Partner/beta-cineplex-v2.jpg';
import cinemax from '../assets/imgs/Partner/cinemax.png';

const HomePage = () => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
    const [dataFilm, setDataFilm] = useState([]);
    // const [idFilm, setIdFilm] = useState('');
    // const [nameFilm, setNameFilm] = useState('');
    // const [author, setAuthor] = useState('');
    // const [cast, setCast] = useState('');
    // const [movieType, setMovieType] = useState('');
    // const [time, setTime] = useState('');
    // const [releaseDate, setReleaseDate] = useState('');
    // const [image, setImage] = useState('');
    // const [numberBooking, setNumberBooking] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }

    // get user is loging
    var user = {};
    var userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage) {
        user = JSON.parse(userInLocalStorage);
    }

    // lấy dữ liệu dataFilm từ backend
    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/films")
            .then(response => {
                const jsonData = JSON.parse(JSON.stringify(response.data.dataFilm));
                setDataFilm(jsonData); // Dữ liệu đã được chuyển đổi thành đối tượng JSON
                console.log(jsonData);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // tạo mảng idFilms chứa idFilm
    const idFilms = dataFilm.map(film => film.idFilm);

    const getFilmById = (id) => {
        return dataFilm.find(film => film.idFilm === id);
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



    // tạo thẻ film hiển thị trên web
    const Card = ({ id }) => {
        const film = getFilmById(id);
        const navigate = useNavigate();
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
        <div id="homePage">
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
                    <div class="map" ><a href="bookedTicket">Vé đã đặt <FontAwesomeIcon icon={faTicket} /></a></div>
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
                            <a href="" class="text-now-film"><FontAwesomeIcon icon={faTrophy} /> Top thịnh hành</a>
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
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            <div>
                                {idFilms.map(idFilm => (
                                    <SwiperSlide><Card key={idFilm} id={idFilm} /></SwiperSlide>
                                ))}
                                {/* <Swiper.Pagination /> */}
                            </div>
                        </Swiper>
                        {/* card  */}

                        {/* review  */}
                        <div class="review-content">
                            <div class="review">
                                <div class="img-review-content">
                                    <img src={reviewContent} alt="" />
                                </div>
                                <div class="text-review-content">
                                    <a href="" class="big-text-review-content">Xem gì cuối tuần ngày 14.04 - Thêm liền 5 tựa
                                        phim này
                                        vào kế hoạch của bạn</a>
                                    <div href="" class="small-text-review-content">
                                        <a href="" class="inf-review-content">Tin điện ảnh · Ivy_Trat </a>
                                        <div class="time-review-content">· 1 ngày trước</div>
                                    </div>
                                    <div class="subtitle-content-review">Truyền cảm hứng như Air đến kinh dị hài như
                                        Renfield, gọi tuổi thơ về với Slam Dunk, đừng bỏ qua 5 tựa phim này nha!</div>
                                </div>
                            </div>
                        </div>
                        {/* review  */}

                        {/* event  */}
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
                        {/* event  */}
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

        </div >
    )
}



export default HomePage;