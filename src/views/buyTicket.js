import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faLocationDot, faCalendar, faClock, faPersonCircleCheck } from '@fortawesome/free-solid-svg-icons';
import firstLogo from '../assets/imgs/firstLogo/logo.png';
import axios from 'axios';
import moment from 'moment';
import lastLogo from '../assets/imgs/Last-Logo/favicon-large.png';
import beta from '../assets/imgs/Partner/beta-cineplex-v2.jpg';
import cinemax from '../assets/imgs/Partner/cinemax.png';
import { useNavigate } from "react-router-dom";


const BuyTicket = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }
    // const navigate = useNavigate();


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

    // xử lý cinema

    const [location, setLocation] = useState('Hà Nội');
    const [format, setFormat] = useState('Định dạng');
    const [choose, setChoose] = useState(false);
    const [isShow, setIsShow] = useState(false);
    // const [selectedItem, setSelectedItem] = useState(null);
    // const [clicked, setClicked] = useState(null);

    const showLocation = () => {
        setIsShow(!isShow)
    }
    const locations = [
        'Tp. Hồ Chí Minh',
        'Hà Nội',
    ]
    const formats = ['Định dạng', '2D', '3D']

    // lấy dữ liệu dataCinema từ backend
    const [dataCinema, setDataCinema] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/cinemas")
            .then(response => {
                const jsonData = JSON.parse(JSON.stringify(response.data.dataCinema));
                setDataCinema(jsonData); // Dữ liệu đã được chuyển đổi thành đối tượng JSON
                // console.log(jsonData);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const getCinemaById = (id) => {
        return dataCinema.find(cinema => cinema.idCinema === id);
    };

    function formatDateTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const timeStr = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        const dateStr = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

        return `${timeStr} ${dateStr}`;

    }

    // tạo mảng idCinemas chứa idCinema
    const idCinemas = dataCinema.map(cinema => cinema.idCinema);
    const CinemasCard = ({ id }) => {
        const navigate = useNavigate();
        const cinema = getCinemaById(id);
        //lấy dữ liệu data schedule từ backend

        const [dataSchedule, setDataSchedule] = useState([]);

        useEffect(() => {
            axios.get(`http://localhost:4000/api/v1/schedule/${film.idFilm}/${cinema.idCinema}`)
                .then(response => {
                    const jsonData = JSON.parse(JSON.stringify(response.data.data));
                    setDataSchedule(jsonData); // Dữ liệu đã được chuyển đổi thành đối tượng JSON
                    // console.log(jsonData);
                })
                .catch(error => {
                    console.error(error);
                });
        }, []);

        return (
            <div>
                <li>
                    <div className='info-container'>
                        <div className='cine-logo'>
                            <img src={cinema.logo} class='cinema-logo' alt=''></img>
                            <div className="cine-info">
                                <p style={{ fontWeight: 600 }}>{cinema.showRoom}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul className='ul-child'>
                            {
                                dataSchedule.map((dataSchedule) => {
                                    const handleSelectTicket = () => {
                                        localStorage.setItem('cinema', JSON.stringify(cinema));
                                        localStorage.setItem('dataSchedule', JSON.stringify(dataSchedule));
                                        navigate('/selectTicket');
                                    }
                                    const formattedDateTime = formatDateTime(dataSchedule.showDate);
                                    return (
                                        <li onClick={handleSelectTicket}>{formattedDateTime}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </li>
            </div>
        )
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

            {/* inf-film */}

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
                            <div class="-time ex">
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
            {/* inf-film */}

            {/* cinema */}

            {/* options */}
            <div class="options">
                <div class="location" onClick={showLocation}>
                    {location}
                    {
                        isShow && (
                            <div className='location-list'>
                                <ul>
                                    {locations.map((location) => (
                                        <li key={location} onClick={() => setLocation(location)}>{location}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
                <div className='format' onClick={() => setChoose(!choose)}>
                    <p>{format}</p>
                    <FontAwesomeIcon icon={faCaretDown} />
                    {
                        choose && (
                            <div className='format-choose'>
                                <ul>
                                    {formats.map((format) => (
                                        <li key={format} onClick={() => setFormat(format)}>{format}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* options */}

            {/* inf-cinema */}
            <div class="cinema">
                <ul className='cinema-ul'>
                    <div>
                        {idCinemas.map(idCinema => (
                            <CinemasCard key={idCinema} id={idCinema} />
                        ))}
                    </div>
                </ul>
            </div>
            {/* inf-cinema */}

            {/* cinema */}

            {/* body  */}

            <div class="margin-40px"> </div>

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

export default BuyTicket;