import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import './calendarUpdate.css'
import FB from '../../config/config';
import moment from 'moment';


function CalendarUpdate({ args }) {

    const [event, setEvent] = useState({})
    const [eventId, setEventId] = useState("")

    const [summary, setSummary] = useState("")
    const [location, setLocation] = useState("")
    const [selectedStartDate, setSelectedStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [selectedEndDate, setSelectedEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

    const [selectedStartTime, setSelectedStartTime] = useState(null)
    const [selectedEndTime, setSelectedEndTime] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    function getInputs() {
        const ref = FB.db.collection('events')

        ref.where("title", "==", `${args.event.title}`)
            .get()
            .then(snapshot => {
                let eventObj = {}
                let docId = ""
                snapshot.forEach(doc => {
                    eventObj = doc.data()
                    docId = doc.id
                })
                //Full event obj
                setEvent(eventObj)
                setEventId(docId)

                //Take individual values out of the object and store them for use
                setSummary(eventObj.summary)
                setLocation(eventObj.location)
                setSelectedStartDate(moment(eventObj.start).format('YYYY-MM-DD'))
                setSelectedEndDate(moment(eventObj.end).format('YYYY-MM-DD'))
                setSelectedStartTime(eventObj.start)
                setSelectedEndTime(eventObj.end)
                setStartTime(moment(eventObj.start).format("HH:MM"))
                setEndTime(moment(eventObj.end).format("HH:MM"))

            }).catch(err => console.log(err))
    }

    const handleStartDateChange = date => {
        setSelectedStartDate(moment(date).format('YYYY-MM-DD'))
    }

    const handleEndDateChange = date => {
        setSelectedEndDate(moment(date).format('YYYY-MM-DD'))
    }

    const handleStartTimeChange = date => {
        setSelectedStartTime(date);
        setStartTime(moment(date).format("HH:mm"))
    };

    const handleEndTimeChange = date => {
        setSelectedEndTime(date);
        setEndTime(moment(date).format("HH:mm"))
    };

    function deleteAppointment() {
        try {
            FB.deleteEvent(eventId).then(setTimeout(function () {
                window.location.reload(false)
            }, 1000));

        } catch (err) {
            alert(err.message)
        }
    }

    function updateAppointment() {
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
            try {
                FB.updateEvent(eventId, summary, selectedStartDate, selectedEndDate, location, startTime, endTime).then(setTimeout(function () {
                    window.location.reload(false)
                }, 1000));
            } catch (err) {
                alert(err.message);
            }
        }
    }

    useEffect(() => {
        getInputs();
    }, [])

    function handleCancel() {
        window.location.reload(false)
    }

    return (
        <div className="calendarInput-container">
            <Paper elevation={20} className="paper">
                <h1>Edit Appointment</h1>
                <div className="inputs">
                    <div className="summary-input">
                        <p>Summary:</p>
                        <TextField
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                            className="textField-input"
                            variant="outlined"
                            placeholder="Enter your summary here"
                            inputProps={{ maxLength: 255 }}>
                        </TextField>
                    </div>
                    <div className="location-input">
                        <p>Location:</p>
                        <TextField
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className="textField-input"
                            variant="outlined"
                            placeholder="Enter your summary here"
                            inputProps={{ maxLength: 255 }}>
                        </TextField>
                    </div>

                    <div className="dates-input">
                        <div className="start-date-input">
                            <p>Start Date:</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    value={selectedStartDate}
                                    onChange={handleStartDateChange}
                                    className="start-date-picker"
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
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
                                    value={selectedEndDate}
                                    onChange={handleEndDateChange}
                                    className="end-date-picker"
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
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
                            onClick={updateAppointment}
                            className="button"
                            variant="contained"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={deleteAppointment}
                            className="button"
                            variant="contained">
                            Delete
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

export default CalendarUpdate