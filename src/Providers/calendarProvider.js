import React, { createContext, useEffect, useState } from "react";

export const CalendarContext = createContext({});

const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const start = () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyDhGTgrk3_SKm5SVoRecM4050VNPxOVVq0"
        })
        .then(() =>
          window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${"club.algoritmia.cucei@gmail.com"}/events?orderby=starttime`
          })
        )
        .then(
          response => {
            setEvents(
              response.result.items
                .filter(e => e.status === "confirmed" && e.start)
                .map((e, i) => ({
                  ...e,
                  jsDate: new Date(
                    e.start.dateTime
                      ? e.start.dateTime.slice(0, 10)
                      : e.start.date
                  ),
                  start: e.start.dateTime
                    ? e.start.dateTime.slice(0, 10)
                    : e.start.date,
                  end: e.end.dateTime ? e.end.dateTime.slice(0, 10) : e.end.date
                }))
                .sort((a, b) => a.jsDate - b.jsDate)
            );
          },
          error => console.error(error)
        );
    };
    const request = () => {
      try {
        window.gapi.load("client", start);
      } catch (e) {
        setTimeout(() => request(), 500);
      }
    };
    request();
  }, []);
  return (
    <CalendarContext.Provider value={events}>
      {children}
    </CalendarContext.Provider>
  );
};
export default CalendarProvider;
