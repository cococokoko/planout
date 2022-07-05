import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rentals from "./pages/Rentals/Rentals";
import Details from "./pages/Details/Details";
import Booking from "./pages/Booking/Booking";
import Checkout from "./pages/Checkout/Checkout.jsx";
import { searchFilterContext } from "./Context";
import Trip from "./pages/Trip";
import LoginForm from './components/LoginForm';
import Done from "./pages/Done";


function App () {
  const [bound, setBound] = useState({});

  const [coordinates, setCoordinates] = useState({});
  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);

  const { destination, setDestination, date, guests, time } = useContext(searchFilterContext);
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    setDestination(autocomplete.getPlace().formatted_address);
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };
  
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const onLoginSuccess = (userData) => {
      setUser(userData);
  };

    const onLoginError = (error) => {
        setLoginError(error);
    };


  return (
    
    <Routes> 
      <Route
        path="/"
        element={
          <Home
            user={user}
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            destination={destination}
          />
        }
      />
      <Route
        path="/rentals"
        element={
          <Rentals
            autocomplete={autocomplete}
            bound={bound}
            setAutocomplete={setAutocomplete}
            onPlaceChanged={onPlaceChanged}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBound={setBound}
            childClicked={childClicked}
            setChildClicked={setChildClicked}
          />
        }
      />
      <Route path="/details" element={<Details />} />
      <Route path="/trip" element={<Trip />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/checkout" element={ <Checkout />} />
      <Route path="/done" element={ <Done />} />
      <Route path="/login" element={<LoginForm onLoginSuccess={onLoginSuccess} onLoginError={onLoginError}/>} />
    </Routes>
  );
};

export default App;

