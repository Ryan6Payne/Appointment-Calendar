import React from 'react';
import ReactDOM from 'react-dom';
import CalendarUpdate from './../calenderUpdate'
import renderer from "react-test-renderer"

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<CalendarUpdate />, div)
})

/* A snapshot of my calendarInput component (generated upon completion of component before further requirements), which is tested against the CURRENT calendarInput component*/
it("matches snapshot", () => {
    const tree = renderer.create(<CalendarUpdate />).toJSON();
    expect(tree).toMatchSnapshot();
})