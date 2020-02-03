import React from "react";
import Navigation from "../../Components/navigation";

import "./style.css";

const Calendar = () => {
  return (
    <>
      <Navigation selection="calendar" />
      <div className="cac_calendar">
        <div className="cac_calendar_title">
          Calendario Actividades Club de Algoritmia CUCEI
        </div>
        <iframe
          title="calendar"
          className="cac_calendar_calendar"
          src="https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FMexico_City&amp;src=Y2x1Yi5hbGdvcml0bWlhLmN1Y2VpQGdtYWlsLmNvbQ&amp;color=%2322AA99&amp;mode=MONTH&amp;hl=en&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=0&amp;showTz=1&amp;title"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </>
  );
};

export default Calendar;
