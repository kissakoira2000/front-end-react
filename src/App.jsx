import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Customer from './components/customer';
import Trainings from './components/trainings';
import MyCalendar from './components/calender';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <button><Link to="/customer">Customers</Link></button>
            <button><Link to="/trainings">Trainings</Link></button>
            <button><Link to="/calender">Calender</Link></button>
          </ul>
        </nav>

        <Routes>
          <Route path="/customer" element={<Customer />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/calender" element={<MyCalendar/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;