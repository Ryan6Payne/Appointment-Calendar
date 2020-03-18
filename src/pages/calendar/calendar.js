import React, { useState, useEffect } from 'react';
import './calendar.css'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import FB from '../../config/config';
import { Button } from '@material-ui/core'

function Calendar(props) {

    const { history } = props;
    const [events, setEvents] = useState([])

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

    return (
        <div className="calendar-container">
            <div className="new-apt-button">
                <Button variant="outlined" onClick={calIn}>
                    New Appointment
            </Button>
            </div>
            <FullCalendar
                /* dateClick={""}
                eventClick={""}
                eventDrop={""} */

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
    )
}

export default Calendar;