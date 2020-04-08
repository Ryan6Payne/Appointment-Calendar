import React from 'react';
import ReactDOM from 'react-dom';
import CalendarUpdate from './../calenderUpdate'


it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<CalendarUpdate />, div)
})