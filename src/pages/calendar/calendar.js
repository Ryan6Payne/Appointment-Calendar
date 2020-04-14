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
    /* This reads ALL */
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

    /* This reads ONE */
    const handleEventClick = args => {
        setArgs(args)
        setPopUp(true)
        console.log(args)
    }

    /* Routes to page with new appointment form */
    function calIn() {
        history.push("/calendarInput")
    }

    useEffect(() => {
        getEvents();
    }, [])

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
                        eventClick={handleEventClick}
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
                <CalendarUpdate args={args} />
            </div>
        )
    }
}

export default Calendar;