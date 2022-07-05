import React, { createContext, useState } from "react";

export const searchFilterContext = createContext();

const Context = ({ children }) => {
  const [destination, setDestination] = useState("Madrid");
  const [activity, setActivity] = useState("Restaurant");
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  localStorage.setItem("destination", destination);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(20);
  var [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [budget, setBudget] = useState(40);
  const [times, setTimes] = useState([]);

  return (
    <searchFilterContext.Provider
      value={{
        destination,
        setDestination,
        places,
        setPlaces,
        activity,
        setActivity,
        date,
        setDate,
        time,
        setTime,
        times,
        setTimes,
        budget,
        setBudget,
        guests,
        setGuests,
        bookings,
        setBookings,
        total,
        setTotal,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </searchFilterContext.Provider>
  );
};

export default Context;
