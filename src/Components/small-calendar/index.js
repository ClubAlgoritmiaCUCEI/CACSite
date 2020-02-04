import React, { useState, useContext } from "react";

import { CalendarContext } from "../../Providers/calendarProvider";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import "./style.css";

const SmallCalendar = () => {
  const events = useContext(CalendarContext);
  const [box, setBox] = useState({ visible: false, x: 10, y: 0, content: {} });
  const [enableBox, setEnableBox] = useState(true);

  const handleEnter = e => {
    setBox({
      visible: true,
      x: e.jsEvent.pageX - e.jsEvent.offsetX,
      y: e.jsEvent.pageY - e.jsEvent.offsetY,
      content: { title: e.event.title, ...e.event.extendedProps }
    });
  };

  const handleLeave = e => {
    if (enableBox) {
      setBox({
        ...box,
        visible: false
      });
      setEnableBox(false);
      setTimeout(() => {
        setEnableBox(true);
      }, 1000);
    }
  };
  return (
    <>
      <div
        className="cac_calendar_info-box"
        style={{
          top: box.y,
          left: box.x,
          opacity: box.visible ? "100%" : "0%",
          zIndex: box.visible ? 10 : 0
        }}
      >
        <span className="cac_calendar_info_title">{box.content.title}</span>
      </div>
      <div className="cac_small-calendar">
        <FullCalendar
          defaultView="dayGridMonth"
          eventClick={handleEnter}
          eventMouseLeave={handleLeave}
          plugins={[dayGridPlugin, interactionPlugin]}
          height="auto"
          header={false}
          buttonText={{
            today: "Today"
          }}
          aspectRatio={1}
          events={events.map(e => ({
            title: "",
            title_copy: e.summary,
            start: e.start,
            end: e.end,
            id: e.id,
            className: "cac_small-callendar_event"
          }))}
        />
      </div>
    </>
  );
};

export default SmallCalendar;
