import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import Navigation from "../../Components/navigation";

import { ReactComponent as Close } from "../../assets/close-icon.svg";

import "./style.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [box, setBox] = useState({ visible: false, x: 10, y: 0, content: {} });

  useEffect(() => {
    const start = () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyDhGTgrk3_SKm5SVoRecM4050VNPxOVVq0"
        })
        .then(() =>
          window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${"club.algoritmia.cucei@gmail.com"}/events`
          })
        )
        .then(
          response => {
            setEvents(
              response.result.items
                .filter(
                  e =>
                    e.status === "confirmed" &&
                    e.start.dateTime &&
                    e.description
                )
                .map((e, i) => ({
                  ...e,
                  date: e.start.dateTime.slice(0, 10)
                }))
            );
          },
          error => console.error(error)
        );
    };
    window.gapi.load("client", start);
  }, []);
  const handleEvent = e => {
    console.log(e.event);

    setBox({
      visible: true,
      x: e.jsEvent.pageX - e.jsEvent.offsetX,
      y: e.jsEvent.pageY - e.jsEvent.offsetY,
      content: { title: e.event.title, ...e.event.extendedProps }
    });
  };
  console.log(box);

  return (
    <>
      <Navigation selection="calendar" />
      <div className="cac_calendar">
        <div className="cac_calendar_container">
          <div
            className="cac_calendar_info-box"
            style={{
              top: box.y,
              left: box.x,
              opacity: box.visible ? "100%" : "0%",
              zIndex: box.visible ? 10 : 0
            }}
          >
            <Close
              className="cac_calendar_info_close"
              onClick={() => setBox({ ...box, visible: false })}
            />
            <span className="cac_calendar_info_title">{box.content.title}</span>

            <span className="cac_calendar_info_location">
              {box.content.location}
            </span>

            <span className="cac_calendar_info_description">
              {box.content.description}
            </span>
          </div>
          <FullCalendar
            defaultView="dayGridMonth"
            eventClick={handleEvent}
            plugins={[dayGridPlugin, interactionPlugin]}
            height="auto"
            header={{
              left: "title",
              center: "prev today next",
              right: ""
            }}
            buttonText={{
              today: "Today"
            }}
            aspectRatio={2}
            events={events.map(e => ({
              title: e.summary,
              date: e.date,
              id: e.id,
              className: "cac_calendar_event",
              description: e.description,
              location: e.location
            }))}
          />
        </div>
      </div>
    </>
  );
};
// events={[
//   { title: "event 1", date: "2020-02-02" },
//   { title: "event 2", date: "2020-02-03" }
// ]}
export default Calendar;
