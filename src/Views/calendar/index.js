import React, { useEffect, useState, useContext } from "react";
import { CalendarContext } from "../../Providers/calendarProvider";
import { parseMonth } from "../../utilities";

import Switch from "react-switch";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import { ReactComponent as Close } from "../../assets/close-icon.svg";
import { ReactComponent as Grid } from "../../assets/grid-icon.svg";
import { ReactComponent as List } from "../../assets/list-icon.svg";

import "./style.css";

const Calendar = () => {
  const { events, fetch: fetchEvents } = useContext(CalendarContext);
  const [box, setBox] = useState({ visible: false, x: 10, y: 0, content: {} });
  const [checked, setChecked] = useState(false);
  const [eventsEl, setEventsEl] = useState([]);

  const handleEvent = e => {
    setBox({
      visible: true,
      x: e.jsEvent.pageX - e.jsEvent.offsetX,
      y: e.jsEvent.pageY - e.jsEvent.offsetY,
      content: { title: e.event.title, ...e.event.extendedProps }
    });
  };

  useEffect(() => {
    let currentMonth = null;
    const elements = [];
    events.forEach((e, i) => {
      if (currentMonth !== e.jsDate.getMonth()) {
        currentMonth = e.jsDate.getMonth();
        elements.push(
          <div key={-i} className="cac_calendar_list_month">
            <span>{parseMonth(currentMonth)}</span>
            <div className="cac_calendar_list_month--line" />
          </div>
        );
      }
      elements.push(
        <div className="cac_calendar_list_event" key={i + 1}>
          <span className="cac_calendar_list_title">{e.summary}</span>
          <span className="cac_calendar_list_date">{e.start}</span>
          <span className="cac_calendar_list_location">{e.location}</span>
          <span className="cac_calendar_list_description">{e.description}</span>
        </div>
      );
    });
    setEventsEl(elements);
  }, [events]);

  useEffect(() => fetchEvents(), [fetchEvents]);

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
        <Close
          className="cac_calendar_info_close"
          onClick={() => box.visible && setBox({ ...box, visible: false })}
        />
        <span className="cac_calendar_info_title">{box.content.title}</span>

        <span className="cac_calendar_info_location">
          {box.content.location}
        </span>

        <span className="cac_calendar_info_description">
          {box.content.description}
        </span>
      </div>
      <div className="cac_calendar">
        <label htmlFor="icon-switch" className="cac_calendar_switch_container">
          <Switch
            checked={checked}
            onChange={() => setChecked(!checked)}
            uncheckedIcon={<List className="cac_calendar_list-icon" />}
            checkedIcon={<Grid className="cac_calendar_grid-icon" />}
            offColor="#484848"
            onColor="#fff"
            onHandleColor="#484848"
            activeBoxShadow="1px 1px 1px 10px #484848"
            width={50}
            height={20}
            className="cac_calendar_switch"
          />
        </label>
        {checked ? (
          <FullCalendar
            defaultView="dayGridMonth"
            eventClick={handleEvent}
            plugins={[dayGridPlugin, interactionPlugin]}
            height="auto"
            header={{
              left: "prev next",
              center: "title",
              right: ""
            }}
            buttonText={{
              today: "Today"
            }}
            aspectRatio={2}
            events={events.map(e => ({
              title: e.summary,
              start: e.start,
              end: e.end,
              id: e.id,
              className: "cac_calendar_event",
              description: e.description,
              location: e.location
            }))}
          />
        ) : (
          <div className="cac_calendar_list">{eventsEl}</div>
        )}
      </div>
    </>
  );
};

export default Calendar;
