import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/css/styleSelectTicket.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SelectTicket = () => {
    const [selectedTickets, setSelectedTickets] = useState([]);

    const handleTicketClick = (ticketId) => {
        // Kiểm tra xem vé đã được chọn hay chưa
        const isSelected = selectedTickets.includes(ticketId);

        // Nếu vé đã được chọn, loại bỏ nó khỏi danh sách
        // Nếu vé chưa được chọn, thêm nó vào danh sách
        if (isSelected) {
            setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
        } else {
            setSelectedTickets([...selectedTickets, ticketId]);
        }
    };

    const handlePurchaseTickets = () => {
        // Gửi yêu cầu mua vé cho server hoặc thực hiện các xử lý liên quan đến việc mua vé
        console.log("Đã mua vé cho các vé đã chọn:", selectedTickets);
    };

    return (
        <div class="">

            <h2 class="ds-v">Danh sách vé</h2>
            <ul class="list-tk">
                <li>
                    <button onClick={() => handleTicketClick(1)}>1</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(2)}>2</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(3)}>3</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(4)}>4</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(5)}>5</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(6)}>6</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(7)}>7</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(8)}>8</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(9)}>9</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(10)}>10</button>
                </li>

                <li>
                    <button onClick={() => handleTicketClick(11)}>11</button>
                </li>
                <li>
                    <button onClick={() => handleTicketClick(12)}>12</button>
                </li>
            </ul>

            <h2 class="selected-TK">Vé đã chọn</h2>
            <div class="hide-tk">{selectedTickets.length > 0 ? (
                <ul>
                    {selectedTickets.map((ticketId) => (
                        <li key={ticketId} class="num-tk">Vé số {ticketId}</li>
                    ))}
                </ul>
            ) : (
                <p class="zero-tk">Chưa có vé nào được chọn.</p>
            )}</div>

            <button onClick={handlePurchaseTickets} class="purchas-button">Mua vé</button>
        </div>
    )
}

export default SelectTicket;