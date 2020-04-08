import React, { useState, useEffect } from 'react';
import './calendar.css'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import FB from '../../config/config';
import { Button } from '@material-ui/core'

import CalendarUpdate from '../calender-update/calenderUpdate'

function Calendar(props) {

    const { history } = props;
    const [events, setEvents] = useState([])

    const [args, setArgs] = useState(null)
    const [popup, setPopUp] = useState(false)

    /*C(R)UD*/
    function getEvents() {
        FB.db.collection("events")
            .get()
            .then(snapshot => {
                const eventsArr = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    eventsArr.push(data)
                })
                setEvents(eventsArr)
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        getEvents();
    }, [])

    function calIn() {
        history.push("/calendarInput")
    }

    /*C(R)UD*/
    const handleDateClick = args => {
        setArgs(args)
        setPopUp(true)
        console.log(args)
    }

    if (popup == false) {
        return (
            <div className="calendar-container" data-testid="calendar-test">

                <div className="new-apt-button">
                    <Button variant="outlined" onClick={calIn}>
                        New Appointment
                </Button>
                </div>

                <div className="calendar">
                    <FullCalendar
                        dateClick={""}
                        eventClick={handleDateClick}
                        eventDrop={""}

                        defaultView="dayGridMonth"
                        header={{
                            left: "prev, next, today,",
                            center: "title",
                            right: `today, prev, next`
                        }}
                        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                        events={events}
                        editable={true}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <CalendarUpdate args={args} popup={popup} />
            </div>
        )
    }
}

export default Calendar;