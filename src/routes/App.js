import '../assets/css/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from '../views/home';
import Login from '../views/login';
import Signup from '../views/signup';
import HomePage from '../views/homePage';
import BuyTicket from '../views/buyTicket';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='homePage' element={<HomePage />}></Route>
        <Route path='buyTicket' element={<BuyTicket />}></Route>
      </Routes>
    </div>
  );
}

export default App;
