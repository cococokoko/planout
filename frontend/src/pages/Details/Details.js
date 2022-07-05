import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LoadingButton from "@mui/lab/LoadingButton";
import {
  InputBase,
  Rating,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Divider,
  Container,
  useMediaQuery,
  Paper,
  IconButton,
} from "@mui/material";
import ReactLoading from "react-loading";
import PersonIcon from "@mui/icons-material/Person";
import React, { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { searchFilterContext } from "../../Context";
import config from '../../config';
import axios from "axios";
import logo from "../../images/bigLogo.png";
import mobileLogo from "../../images/bigLogo.png";
import { useNavigate } from "react-router-dom";

const Details = ({user}) => {
  let isMobile = useMediaQuery("(max-width:850px)");
  const { date, setDate, time, setTime, times, setTimes, guests, setGuests, bookings, setBookings, total, setTotal } =
    useContext(searchFilterContext);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#FFC300",
    },
  });

  const navigate = useNavigate();
  const { state: place } = useLocation();
  const [bundle, setBundle] = useState(place.price_menu_1);
  //***********************************   Styles *****************************************

  const styles = {
    logo: {
      width: "12vw",
      marginRight: "3rem",
      minWidth: "6rem",
      ...(isMobile && {
        minWidth: "0.5rem ", width : "6vw"
      }),
    },
    line: {
      borderTop: "1px solid rgb(230, 229, 229)",
      mb: "0px",
    },
    image_div: {
      marginTop: 4,
    },
    card: {
      padding: "1.5rem",

      width: "30%",
      border: "1.5px solid rgb(242, 242, 242)",
      borderRadius: "15px",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 20px",
      mb: 4,
    },
    card_top: {
      display: "flex",
      marginTop: "1.5rem",
      justifyContent: "space-between",
      alignItems: "center",
    },
    price_div: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "black",
      marginLeft: "10px",
    },
    card_rating: {
      alignItems: "center",
      display: "flex",
    },
    description: {
      mt: 2,
    },
    input: {
      fontSize: "0.75rem",
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 0.842)",
      padding: "0.75rem",
      margin: 1,
      height: "2.75rem",
    },
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "POST",
      url:(config.apiUrl +"/times"),
      data:{
        id : place.id,
        date: date,
       }
    })
    .then((response) => {setTimes(response.data); setLoading(false);});
    return () => {};
  }, []);


  return (
    <Box>
      <Container
        minWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "1rem",
        }}
      >
        <Box>
          <Link to="/">
            <img
              style={styles.logo}
              src={isMobile ? mobileLogo : logo}
              alt="logo"
            ></img>
          </Link>
        </Box>
        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFC300",
              padding: "5px",
              marginLeft: "5rem",
              marginRight: "5px",
              borderRadius: "0.5rem",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            <Button>
            <Typography variant="body1" color="white">
              LogIn
            </Typography>
            </Button>
     
        </Box>
      </Container>

      <Divider />

      {loading ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10vh",
                }}
              >
                <ReactLoading
                  type="bubbles"
                  color="#FFC300"
                  height={200}
                  width={100}
                />
              </Box>
            ) : (
      <Container
        sx={{ mt: 2 }}
        // style={{ margin: "0 15vw 0 15vw", marginTop: "2vh" }}
      >
        <Typography variant={isMobile ? "h5" : "h4"}>
          {place.name}
        </Typography>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            marginTop: 2,
          }}
        >
          <StyledRating
            name="read-only"
            value={Number(place.rating)}
            readOnly
            precision={0.5}
            size="small"
          />
          <span
            style={{
              marginLeft: "0.5rem",
              fontSize: "15px",
            }}
          >
            {Number(place.rating)}
          </span>
          <span
            style={{ color: "gray", marginLeft: "0.2rem", fontSize: "17px" }}
          >
            ({place.reviews} reviews)
          </span>

          <Box
            style={{
              color: "gray",
              marginLeft: "0.75rem",
              fontSize: "17px",
            }}
          >
            {place.area.substr(0, 15)}
          </Box>
        </Box>

        <Box sx={styles.image_div}>
          <img
            style={{
              width: "50rem",
              maxHeight: "35rem",
              borderRadius: "15px",
              ...(isMobile && {
                width: "100%",
              }),
            }}
            src={place.image}
            alt="place"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "60%",
              ...(isMobile && {
                width: "100%",
                mb: 4,
              }),
            }}
          >
            <Typography variant={isMobile ? "h6" : "h5"}>
              {place.kitchen}
            </Typography>
            <Typography variant="body1" color="gray">
              {place.details}
            </Typography>
            <Divider sx={{ mt: 3, mb: 3 }} />

            <Box display="flex" sx={{ mb: 2 }}>
              <CelebrationIcon />
              <Typography variant="body1" color="initial" sx={{ ml: 2 }}>
                Special events service add-ons
              </Typography>
            </Box>
            <Box display="flex" sx={{ mb: 2 }}>
              <AirportShuttleIcon />
              <Typography variant="body1" color="initial" sx={{ ml: 2 }}>
                Shuttle for extra fee
              </Typography>
            </Box>
            <Divider sx={{ mt: 3, mb: 5}} />
            { place.menu_2 ?
            <Typography variant="body1" color="black">
              <b>Bundle 1:</b> <br /><br />
              {place.menu_1}<br /><br />
              <i>Price: {place.price_menu_1} €</i><br /><br /> 
              <br /><br />
              <b>Bundle 2:</b> <br /><br />
              {place.menu_2}<br /><br />
              <i>Price: {place.price_menu_2} €</i><br /><br />
            </Typography>
            :
            <Typography variant="body1" color="black">
              <b>Bundle:</b> <br /><br />
              {place.menu_1}<br /><br />
              <i>Price: {place.price_menu_1} €</i>      
            </Typography>
            }
          </Box>
          {isMobile ? (
            <Paper
              sx={{
                display: "flex",
                position: "fixed",
                justifyContent: "space-between",
                alignItems: "center",
                bottom: 0,
                width: "100%",
                p: 3,
                ml: -3,
              }}
            >
              <Box style={{ display: "flex" }}>
               
              </Box>
              <LoadingButton
                loading={loading}
                onClick={() => {
                    setBookings([...bookings,{"name":place.name,"destination":place.address,"date":date,"time":time,"guests":guests,"imageUrl":place.image, "price":bundle}]);
                    setTotal(total + (bundle*guests));
                    navigate("/trip");
                }}
                variant="text"
                sx={{
                  color: "#fff",
                  bgcolor: "#ffc300",
                  borderRadius: "0.2rem",
                  mr: 4,
                  ":hover": {
                    backgroundColor: "#d4a406",
                  },
                }}
              >
                Add to Booking
              </LoadingButton>
            </Paper>
          ) : (
            <Box sx={styles.card}>
              <Box sx={styles.card_top}>
                <Box display="flex">
                  <Box sx={styles.price_div}>
                    Overview
                  </Box>
                </Box>
                <Box sx={styles.card_rating}>
                  <StyledRating
                    name="read-only"
                    value={place.rating / 5}
                    precision={0.1}
                    readOnly
                    max={1}
                  />
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "1rem",
                    }}
                  >
                    {place.rating}
                  </span>
                  <span
                    style={{
                      color: "gray",
                      marginLeft: "5px",
                      fontSize: "0.8rem",
                    }}
                  >
                    ({place.reviews} reviews)
                  </span>
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Box sx={styles.description}>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={styles.input}>
                    Date
                    <TextField
                      variant="standard"
                      type="date"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      value={date}
                    />
                  </Box>
                  <Box sx={styles.input}>
                    Time
                    <Select
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    value={time}
                    onChange={(e) => {
                      const {
                        target: { value },
                      } = e;
                      setTime(value);
                    }}
                  >
                   {times.map((option) => (
                    <MenuItem 
                      key={option}
                      value={option}
                      InputProps={{ disableUnderline: true }}>
                    {option}
                    </MenuItem>
                    ))}
                  </Select>
                  </Box>
                </Box>
                <Box sx={styles.input}>
                  Guests
                  <InputBase
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    type="number"
                    fullWidth
                    InputProps={{ min: 1 , max: place.capacity }}
                    sx={{ padding: "5px" }}
                  />
                </Box>
                { place.menu_2 ?
                  <Box sx={styles.input}>
                    Bundle Choice
                  <Select
                    variant="standard"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    value = {bundle}
                    onChange={(e) => {
                      const {
                        target: { value },
                      } = e;
                      setBundle(value);
                    }}
                  >
                    <MenuItem value={place.price_menu_1}>Bundle 1 - {place.price_menu_1} € per Person</MenuItem>
                    <MenuItem value={place.price_menu_2}>Bundle 2 - {place.price_menu_2} € per Person</MenuItem>
                  </Select>
                  </Box>
                  : 
                  <Box sx={styles.input}>
                    Bundle 
                    <TextField
                      variant="standard"
                      fullWidth
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      defaultValue = {`${place.price_menu_1}  € per Person`}
                      />
                  </Box>
                  }
                </Box>
               <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Divider sx={{ mb: "1.75rem" }} />
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1.75rem",
                  }}
                >
                  <Typography variant="h6" color="initial">
                    Total :
                  </Typography>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    &nbsp;
                    {bundle * guests} €
                  </Box>
                </Box>
                <LoadingButton
                  fullWidth
                  loading={loading}
                  onClick={() => {
                      setBookings([...bookings,{"name":place.name,"destination":place.address,"date":date,"time":time,"guests":guests,"imageUrl":place.image, "price":bundle}]);
                      setTotal(total + (bundle*guests));
                      navigate("/trip");
                    ;
                  }}
                  variant="text"
                  sx={{
                    color: "#fff",
                    bgcolor: "#ffc300",
                    borderRadius: "0.5rem",
                    ":hover": {
                      backgroundColor: "#d4a406",
                    },
                  }}
                >
                  Add to Booking
                </LoadingButton>
              </Box>
            </Box>
          )}
        </Box>
      </Container> )}
    </Box>
  );
};

export default Details;
