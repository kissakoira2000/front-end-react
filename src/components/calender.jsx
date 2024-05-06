import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

export default function MyCalendar () {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data));
    }, []);

    const events = trainings ? trainings.map(training => {
        const date = moment(training.date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        return {
            start: date.toDate(),
            end: date.add(training.duration, 'minutes').toDate(),
            title: training.activity,
        };
    }) : [];

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                style={{ height: 500 }}
            />
        </div>
    );
}