import '../assets/css/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from '../views/home';
import Login from '../views/login';
import Signup from '../views/signup';
import HomePage from '../views/homePage';
import BuyTicket from '../views/buyTicket';
import SelectTicket from '../views/selectTicket';
import BookedTicket from '../views/bookedTicket';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='homePage' element={<HomePage />}></Route>
        <Route path='buyTicket' element={<BuyTicket />}></Route>
        <Route path='selectTicket' element={<SelectTicket />}></Route>
        <Route path='bookedTicket' element={<BookedTicket />}></Route>
      </Routes>
    </div>
  );
}

export default App;
