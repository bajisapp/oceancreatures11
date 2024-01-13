import React from 'react'
import { Scheduler } from "@aldabil/react-scheduler";


function BigCalendar() {

    const EVENTS = [
        {
          event_id: 1,
          title: "Event 1",
          start: new Date("2024 1 14 15:30"),
          end: new Date("2024 1 14 16:30")
        },
        {
          event_id: 2,
          title: "Event 2",
          start: new Date("2024 1 14 15:30"),
          end: new Date("2024 1 14 16:30")
        },
        {
          event_id: 3,
          title: "Event 3",
          start: new Date("2024 1 14 15:30"),
          end: new Date("2024 1 14 16:30")
        },
        {
          event_id: 4,
          title: "Event 4",
          start: new Date("2024 1 14 15:30"),
          end: new Date("2024 1 14 16:30"),
          color: 'blue', 
        },
        {
          event_id: 5,
          title: "Event 5",
          start: new Date("2024 1 14 15:30"),
          end: new Date("2024 1 14 16:30"),
          color: 'green',
        },
        {
          event_id: 6,
          title: "Event 6",
          start: new Date("2024 1 14 15:30"),
          end: new Date("2024 1 14 16:30")
        },
        {
          event_id: 7,
          title: "Event 7",
          start: new Date("2024 1 14 15:30"),
          end: new Date("2024 1 14 16:30")
        },
        {
          event_id: 8,
          title: "Event 8",
          start: new Date("2024 1 14 15:30"),
          end: new Date("2024 1 14 16:30")
        },
        {
          event_id: 9,
          title: "Event 11",
          start: new Date("2024 1 14 17:30"),
          end: new Date("2024 1 14 18:30")
        },
        {
          event_id: 10,
          title: "Event 9",
          start: new Date("2024 1 14 17:30"),
          end: new Date("2024 1 14 18:30")
        },
        {
          event_id: 11,
          title: "Event 10",
          start: new Date("2024 1 14 17:30"),
          end: new Date("2024 1 14 18:30")
        }
      ];


  return (
    <div>
        <h6>Student Class Details</h6>
        <Scheduler
      view="week"
      events={EVENTS}
      selectedDate={new Date(2024, 1, 14)}     
      week={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 8,
        endHour: 20,
        step: 60
      }}
 
    />
    </div>
  )
}

export default BigCalendar
