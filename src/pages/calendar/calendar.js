import React, { useState } from 'react';
import { Paper } from '@material-ui/core'
import './calendar.css'

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"


function Calendar(props) {

    const [location, setLocation] = useState("Kettering")
    const [summary, setSummary] = useState("Service")

    const [events, setEvents] = useState([
        {
            title: "TEST EVENT",
            start: '2020-03-17',
            end: '2020-03-17'
        },
    ])

    return (
        <div className="calendar-container">
            <FullCalendar
                /* dateClick={""}
                eventClick={""}
                eventDrop={""} */

                defaultView="dayGridMonth"
                header={{
                    left: "prev, next, today",
                    center: "title",
                    right: "today, prev, next"
                }}
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                events={events}
                editable={true}
            />
        </div>
    )
}

export default Calendar;