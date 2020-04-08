import React from 'react';
import ReactDOM from 'react-dom';
import CalendarInput from './../calendarInput'


it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<CalendarInput />, div)
})