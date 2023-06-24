import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faLocationDot, faCalendar, faClock, faPersonCircleCheck, faTrophy, faCalendarDays, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
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
    // chuyển time về utc + 7 

    const convertUTCtoLocalDateTime = (utcString) => {
        const utcDate = new Date(utcString);
        const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);

        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours() + 7).padStart(2, '0'); // Thêm 7 giờ vào giờ hiện tại
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        const seconds = String(localDate.getSeconds()).padStart(2, '0');

        const localDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return localDateTime;
    }

    // chuyển chuỗi date về ngày/tháng/năm
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getFormattedDateAndMonth = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day}/${month}`;
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
    var [time, setTime] = useState([]);

    var times = [];

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

    // lấy dữ liệu data schedule từ backend

    // const [dataSchedules, setDataSchedules] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:4000/api/v1/schedules")
    //         .then(response => {
    //             const jsonData = JSON.parse(JSON.stringify(response.data.dataSchedules));
    //             setDataSchedules(jsonData); // Dữ liệu đã được chuyển đổi thành đối tượng JSON
    //             // console.log(jsonData);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    const [showDate, setShowDate] = useState([]);
    const [dataIdCinema, setDataIdCinema] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/v1/getShowDateAndIdCinema', { idFilm: film.idFilm });
                const data = response.data.dataShowDate;
                setShowDate(data);
                const dataCi = response.data.dataIdCinema;
                setDataIdCinema(dataCi);
                // console.log(setShowDate);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };

        fetchData();
    }, []);



    const getCinemaById = (id) => {
        return dataCinema.find(cinema => cinema.idCinema === id);
    };

    // tạo mảng idCinemas chứa idCinema
    const idCinemas = dataCinema.map(cinema => cinema.idCinema);
    const CinemasCard = ({ id }) => {
        const navigate = useNavigate();
        const cinema = getCinemaById(id);
        const handleSelectTicket = () => {
            navigate('/selectTicket');
        }
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
                            {showDate.map((showDate, index) => {
                                const formattedDate = JSON.stringify(showDate).substring(13, 23);
                                const formattedTime = JSON.stringify(showDate).substring(13, 37);
                                const dateParts = formattedDate.split("-");
                                const reversedDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
                                const time = convertUTCtoLocalDateTime(formattedTime).substring(11, 16);
                                if (nextDays.includes(reversedDate)) {
                                    return (
                                        <div >
                                            <li key={index} onClick={handleSelectTicket}>{time}</li>
                                        </div>
                                    )
                                }
                            }
                            )}
                            {/* {times.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))} */}
                        </ul>
                    </div>
                </li>
            </div>
        )
    }



    // Lấy ngày hôm nay
    const today = moment().format('DD/MM');

    // Lấy 4 ngày tiếp theo
    const nextDays = [];
    for (let i = 1; i <= 6; i++) {
        const nextDay = moment().add(i, 'days').format('DD/MM/YYYY');
        nextDays.push(nextDay);
    }
    // console.log(nextDays);
    // const date = new Date(showDate)
    // const formattedDate = date.toLocaleDateString()
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

            {/* thời gian  */}
            <div class="time">
                <ul>

                    {nextDays.map((day, index) => (
                        <li >{day}</li>
                        // <li key={index}>{day}</li>
                    ))}
                </ul>
            </div>

            {/* thời gian  */}

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