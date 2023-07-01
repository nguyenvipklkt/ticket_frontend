import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/css/styleSelectTicket.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SelectTicket = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [bookedSeats, setBookedSeats] = useState([]);

    const navigate = useNavigate();

    var schedule = {};
    var dataScheduleInLocalStorage = localStorage.getItem("dataSchedule");
    if (dataScheduleInLocalStorage) {
        schedule = JSON.parse(dataScheduleInLocalStorage);
    }

    var user = {};
    var dataUserInLocalStorage = localStorage.getItem("user");
    if (dataUserInLocalStorage) {
        user = JSON.parse(dataUserInLocalStorage);
    }

    const handleTicketClick = (seat) => {
        // Kiểm tra xem vé đã được chọn hay chưa
        const isSelected = selectedSeats.includes(seat);

        // Nếu vé đã được chọn, loại bỏ nó khỏi danh sách
        // Nếu vé chưa được chọn, thêm nó vào danh sách
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
        if (bookedSeats.includes(seat)) {
            // Nếu ghế đã đặt, không làm gì cả
            return;
        }
    };

    var pay = 1;
    var tkStatus = 0;

    useEffect(() => {
        fetchBookedSeats();
    }, []);

    const fetchBookedSeats = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/getSeat/${schedule.idSC}`);
            const data1 = JSON.stringify(response.data.seats);
            // Truy cập thuộc tính "seats" và tách chuỗi thành mảng
            const bookedSeats = JSON.parse(data1).map(obj => obj.seats.split(",")).flat().map(Number);
            setBookedSeats(bookedSeats);
        } catch (error) {
            console.log('Error fetching booked seats:', error);
        }
    };

    const isSeatBooked = (seat) => {
        return bookedSeats.includes(seat);
    };

    // Hàm tính tiền

    const pricePerSeat = 70000;
    var totalPrice = selectedSeats.length * pricePerSeat;

    const handlePurchaseTickets = async () => {

        // sử dụng Axios để gửi POST request đến API
        await axios.post('http://localhost:4000/api/v1/create-ticket', {
            idSC: schedule.idSC,
            idUser: user.id,
            cost: totalPrice,
            seats: JSON.stringify(selectedSeats).slice(1, -1),
            pay: pay,
            tkStatus: tkStatus
        })
            .then((response) => {
                // Xử lý kết quả trả về từ API (nếu cần)
                console.log(response.data);
                alert('Mua vé thành công!');
                navigate('/homePage');
            })
            .catch((error) => {
                // Xử lý lỗi (nếu có)
                console.error(error);
            });
    };



    return (
        <div class="">

            <h2 class="ds-v">Danh sách vé</h2>
            <ul class="list-tk">
                <li>
                    <button onClick={() => handleTicketClick(1)} className={`seat ${isSeatBooked(1) ? "booked" : ""}`}>1</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(2)} className={`seat ${isSeatBooked(2) ? "booked" : ""}`}>2</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(3)} className={`seat ${isSeatBooked(3) ? "booked" : ""}`}>3</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(4)} className={`seat ${isSeatBooked(4) ? "booked" : ""}`}>4</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(5)} className={`seat ${isSeatBooked(5) ? "booked" : ""}`}>5</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(6)} className={`seat ${isSeatBooked(6) ? "booked" : ""}`}>6</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(7)} className={`seat ${isSeatBooked(7) ? "booked" : ""}`}>7</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(8)} className={`seat ${isSeatBooked(8) ? "booked" : ""}`}>8</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(9)} className={`seat ${isSeatBooked(9) ? "booked" : ""}`}>9</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(10)} className={`seat ${isSeatBooked(10) ? "booked" : ""}`}>10</button>
                </li>

                <li>
                    <button onClick={() => handleTicketClick(11)} className={`seat ${isSeatBooked(11) ? "booked" : ""}`}>11</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(12)} className={`seat ${isSeatBooked(12) ? "booked" : ""}`}>12</button>
                </li>
            </ul>

            <ul class="list-tk">
                <li>
                    <button onClick={() => handleTicketClick(13)} className={`seat ${isSeatBooked(13) ? "booked" : ""}`}>13</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(14)} className={`seat ${isSeatBooked(14) ? "booked" : ""}`}>14</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(15)} className={`seat ${isSeatBooked(15) ? "booked" : ""}`}>15</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(16)} className={`seat ${isSeatBooked(16) ? "booked" : ""}`}>16</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(17)} className={`seat ${isSeatBooked(17) ? "booked" : ""}`}>17</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(18)} className={`seat ${isSeatBooked(18) ? "booked" : ""}`}>18</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(19)} className={`seat ${isSeatBooked(19) ? "booked" : ""}`}>19</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(20)} className={`seat ${isSeatBooked(20) ? "booked" : ""}`}>20</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(21)} className={`seat ${isSeatBooked(21) ? "booked" : ""}`}>21</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(22)} className={`seat ${isSeatBooked(22) ? "booked" : ""}`}>22</button>
                </li>

                <li>
                    <button onClick={() => handleTicketClick(23)} className={`seat ${isSeatBooked(23) ? "booked" : ""}`}>23</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(24)} className={`seat ${isSeatBooked(24) ? "booked" : ""}`}>24</button>
                </li>
            </ul>

            <ul class="list-tk">
                <li>
                    <button onClick={() => handleTicketClick(25)} className={`seat ${isSeatBooked(25) ? "booked" : ""}`}>25</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(26)} className={`seat ${isSeatBooked(26) ? "booked" : ""}`}>26</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(27)} className={`seat ${isSeatBooked(27) ? "booked" : ""}`}>27</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(28)} className={`seat ${isSeatBooked(28) ? "booked" : ""}`}>28</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(29)} className={`seat ${isSeatBooked(29) ? "booked" : ""}`}>29</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(30)} className={`seat ${isSeatBooked(30) ? "booked" : ""}`}>30</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(31)} className={`seat ${isSeatBooked(31) ? "booked" : ""}`}>31</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(32)} className={`seat ${isSeatBooked(32) ? "booked" : ""}`}>32</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(33)} className={`seat ${isSeatBooked(33) ? "booked" : ""}`}>33</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(34)} className={`seat ${isSeatBooked(34) ? "booked" : ""}`}>34</button>
                </li>

                <li>
                    <button onClick={() => handleTicketClick(35)} className={`seat ${isSeatBooked(35) ? "booked" : ""}`}>35</button>
                </li>
                <li>

                    <button onClick={() => handleTicketClick(36)} className={`seat ${isSeatBooked(36) ? "booked" : ""}`}>36</button>
                </li>
            </ul>

            <ul class="list-tk">
                <li>
                    <button onClick={() => handleTicketClick(37)} className={`seat ${isSeatBooked(37) ? "booked" : ""}`}>37</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(38)} className={`seat ${isSeatBooked(38) ? "booked" : ""}`}>38</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(39)} className={`seat ${isSeatBooked(39) ? "booked" : ""}`}>39</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(40)} className={`seat ${isSeatBooked(40) ? "booked" : ""}`}>40</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(41)} className={`seat ${isSeatBooked(41) ? "booked" : ""}`}>41</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(42)} className={`seat ${isSeatBooked(42) ? "booked" : ""}`}>42</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(43)} className={`seat ${isSeatBooked(43) ? "booked" : ""}`}>43</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(44)} className={`seat ${isSeatBooked(44) ? "booked" : ""}`}>44</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(45)} className={`seat ${isSeatBooked(45) ? "booked" : ""}`}>45</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(46)} className={`seat ${isSeatBooked(46) ? "booked" : ""}`}>46</button>
                </li>

                <li>
                    <button onClick={() => handleTicketClick(47)} className={`seat ${isSeatBooked(47) ? "booked" : ""}`}>47</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(48)} className={`seat ${isSeatBooked(48) ? "booked" : ""}`}>48</button>
                </li>
            </ul>

            <h2 class="selected-TK">Vé đã chọn</h2>
            <div class="hide-tk">{selectedSeats.length > 0 ? (
                <ul>
                    {selectedSeats.map((seat) => (
                        <li key={seat} class="num-tk">Vé số {seat}</li>
                    ))}
                </ul>
            ) : (
                <p class="zero-tk">Chưa có vé nào được chọn.</p>
            )}</div>
            <h2 class="selected-TK">Tổng tiền</h2>
            <div className="total-price">Tổng tiền: {totalPrice} VNĐ</div>
            <h2 class="selected-TK">Thanh toán</h2>
            <h2></h2>
            <button onClick={handlePurchaseTickets} class="purchas-button">Mua vé</button>
        </div>
    )
}

export default SelectTicket;