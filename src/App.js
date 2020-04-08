import React from 'react';
import './App.css';

//Routing
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Pages
import CalendarInput from './pages/calendar-input/calendarInput'
import Calendar from './pages/calendar/calendar';
import CalendarUpdate from './pages/calender-update/calenderUpdate';

function App() {


  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/calendarInput" component={CalendarInput} />
          <Route exact path="/calendar" component={Calendar} />
        </Switch>
      </BrowserRouter>
      <div className="App">

      </div>
    </div>

  )
}

export default App;
