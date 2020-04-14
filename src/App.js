import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CalendarInput from './pages/calendar-input/calendarInput'
import Calendar from './pages/calendar/calendar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/calendarInput" component={CalendarInput} />
          <Route exact path="/calendar" component={Calendar} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
