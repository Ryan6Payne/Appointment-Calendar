import React, { useState } from 'react';
import { Paper, TextField, Button } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import './calendarInput.css';
import FB from '../../config/config';
import moment from 'moment';


function CalendarInput(props) {

    const { history } = props;
    const [summary, setSummary] = useState("")
    const [location, setLocation] = useState("")
    const [selectedStartDate, setSelectedStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [selectedEndDate, setSelectedEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [selectedStartTime, setSelectedStartTime] = useState(null)
    const [selectedEndTime, setSelectedEndTime] = useState(null)

    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    const handleStartDateChange = date => {
        setSelectedStartDate(moment(date).format('YYYY-MM-DD'))
    }

    const handleEndDateChange = date => {
        setSelectedEndDate(moment(date).format('YYYY-MM-DD'))
    }

    const handleStartTimeChange = date => {
        setSelectedStartTime(date);
        setStartTime(moment(date).format("HH:MM"))
    };

    const handleEndTimeChange = date => {
        setSelectedEndTime(date);
        setEndTime(moment(date).format("HH:MM"))
    };


    function test() {
        console.log(selectedStartTime)
        console.log(selectedEndTime)
        console.log(startTime)
        console.log(endTime)
    }

    function saveEvent() {
        if (selectedStartDate > selectedEndDate) {
            alert("Your end date is before your start date! Please amend this.")
        } else if (summary == "") {
            alert("Please entery a summary!")
        } else if (location == "") {
            alert("Please entery a location!")
        } else if (startTime == null) {
            alert("Please enter a start time")
        } else if (endTime == null) {
            alert("Please enter an end time")
        } else {
            FB.addEvent(summary, selectedStartDate, selectedEndDate, location, startTime, endTime)
            history.push('/calendar')
        }
    }

    function handleCancel() {
        history.push("./calendar")
    }

    return (
        <div className="calendarInput-container">
            <Paper elevation={20} className="paper">
                <h1>New Appointment</h1>
                <div className="inputs">
                    <div className="summary-input">
                        <p>Summary:</p>
                        <TextField
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                            className="textField-input"
                            variant="outlined"
                            placeholder="Enter your summary here">
                        </TextField>
                    </div>
                    <div className="location-input">
                        <p>Location:</p>
                        <TextField
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className="textField-input"
                            variant="outlined"
                            placeholder="Enter your summary here">
                        </TextField>
                    </div>

                    <div className="dates-input">
                        <div className="start-date-input">
                            <p>Start Date:</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="start-date-picker"
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={selectedStartDate}
                                    onChange={handleStartDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="end-date-input">
                            <p>End Date:</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className="end-date-picker"
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={selectedEndDate}
                                    onChange={handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>

                    <div className="times-input">
                        <div className="start-time-input">
                            <p>Start Time:</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    className="start-time-picker"

                                    value={selectedStartTime}
                                    onChange={handleStartTimeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="end-time-input">
                            <p>End Time:</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    className="end-time-picker"
                                    value={selectedEndTime}
                                    onChange={handleEndTimeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>

                    <div className="buttons">
                        <Button
                            className="button"
                            variant="contained"
                            onClick={saveEvent}>
                            Save
                        </Button>
                        <Button
                            className="button"
                            variant="contained"
                            onClick={test}>
                            TEST
                        </Button>
                        <Button
                            onClick={handleCancel}
                            className="button"
                            variant="contained">
                            Cancel
                        </Button>
                    </div>
                </div>

            </Paper>
        </div>
    )
}

export default CalendarInput