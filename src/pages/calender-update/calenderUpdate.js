import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import './calendarUpdate.css'
import FB from '../../config/config';
import moment, { relativeTimeRounding } from 'moment';


function CalendarUpdate({ args, popup }) {

    const [event, setEvent] = useState({})


    function getInputs() {
        const ref = FB.db.collection('events')

        ref.where("title", "==", `${args.event.title}`)
            .get()
            .then(snapshot => {
                let eventArr = {}
                snapshot.forEach(doc => {
                    eventArr = doc.data()
                })
                setEvent(eventArr)
            }).catch(err => console.log(err))
    }

    function testButton() {
        console.log(event)
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
                            value={event.summary}
                            className="textField-input"
                            variant="outlined"
                            placeholder="Enter your summary here">
                        </TextField>
                    </div>
                    <div className="location-input">
                        <p>Location:</p>
                        <TextField
                            value={event.location}
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
                                    value={event.start}
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
                                    value={event.end}
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
                    <div className="buttons">
                        <Button
                            className="button"
                            variant="contained"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={testButton}
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