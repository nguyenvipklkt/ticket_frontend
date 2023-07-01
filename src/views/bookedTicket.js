import React, { useState, useEffect } from 'react';
import '../assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const BookedTicket = () => {
    const [dataTicket, setDataTicket] = useState([]);
    //lay tt ve tu backend
    var user = {};
    var dataUserInLocalStorage = localStorage.getItem("user");
    if (dataUserInLocalStorage) {
        user = JSON.parse(dataUserInLocalStorage);
    }
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const fetchTicket = async () => {
        axios.get(`http://localhost:4000/api/v1/getTkByUser/${user.id}`)
            .then(response => {
                const dataTicket = JSON.parse(JSON.stringify(response.data.dataTicket));
                setDataTicket(dataTicket);
                console.log(dataTicket)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const updateStatus = () => {
        axios.get('http://localhost:4000/api/v1/updateTkStatus');
    }

    useEffect(() => {
        fetchTicket();
        updateStatus();
    }, []);

    const idTickets = dataTicket.map(ticket => ticket.idTicket);

    const getTicketById = (id) => {
        return dataTicket.find(ticket => ticket.idTicket === id);
    };

    const getStatus = (nub) => {
        if (nub == 0) {
            return "Chưa hết hạn";
        }
        else {
            return "đã hết hạn";
        }
    }

    const Ticket = ({ id }) => {

        const ticket = getTicketById(id);
        return (
            <div class="ticket-details">
                <div class="ticket-info">
                    <span class="ticket-label">Người đặt : </span>
                    <span class="ticket-value">{user.lastName} {user.firstName}</span>
                </div>
                <div class="ticket-info">
                    <span class="ticket-label">Phim : </span>
                    <span class="ticket-value">{ticket.nameFilm}</span>
                </div>
                <div class="ticket-info">
                    <span class="ticket-label">Ngày chiếu : </span>
                    <span class="ticket-value">{getFormattedDate(ticket.showDate)}</span>
                </div>
                <div class="ticket-info">
                    <span class="ticket-label">Giờ chiếu : </span>
                    <span class="ticket-value">20:00</span>
                </div>
                <div class="ticket-info">
                    <span class="ticket-label">Ghế : </span>
                    <span class="ticket-value">{ticket.seats}</span>
                </div>
                <div class="ticket-info">
                    <span class="ticket-label">Giá vé : </span>
                    <span class="ticket-value">{ticket.cost}</span>
                </div>
                <div class="ticket-info">
                    <span class="ticket-label">Ngày đặt : </span>
                    <span class="ticket-value">{getFormattedDate(ticket.bookingDate)}</span>
                </div>
                <div class="ticket-info">
                    <span class="ticket-label">Trạng thái : </span>
                    <span class="ticket-value">{getStatus(ticket.tkStatus)}</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <a class="out-homPage" href='homePage'><FontAwesomeIcon icon={faDoorOpen} class="out-homPage-icon" /></a>
            <div class="text-bookedTk"><h1>Vé đã đặt</h1></div>
            <div>
                {idTickets.map((idTicket) => (
                    <Ticket key={idTicket} id={idTicket}></Ticket>
                ))}
            </div>

        </div>
    )
}

export default BookedTicket;