import React from 'react';
import ReactDOM from 'react-dom';
import CalendarInput from './../calendarInput'
import renderer from "react-test-renderer"

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<CalendarInput />, div)
})

/* A snapshot of my calendarInput component (generated upon completion of component before further requirements), which is tested against the CURRENT calendarInput component*/
it("matches snapshot", () => {
    const tree = renderer.create(<CalendarInput />).toJSON();
    expect(tree).toMatchSnapshot();
})
