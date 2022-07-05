import {
    Box,
    Container,
    Paper,
    Divider,
    InputBase,
    TextField,
    useMediaQuery,
    Typography,
    Button,
    Rating,
    Grid,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import styled from "styled-components";
  import { Link, useNavigate, useLocation } from "react-router-dom";
  import logo from "../images/bigLogo.png";
  import mobileLogo from "../images/bigLogo.png";
  import { searchFilterContext } from "../Context";
  
  const Done = () => {
    let isMobile = useMediaQuery("(max-width:850px)");
    const { date, setDate, time, setTime, guests, setGuests, bookings, setBookings, total, setTotal } =
        useContext(searchFilterContext);
    
    const [loading, setLoading] = useState(false);

    const { state: place } = useLocation();
    
    const StyledRating = styled(Rating)({
        "& .MuiRating-iconFilled": {
          color: "#FFC300",
        },
      });

    const styles = {
      logo: {
        width: "12vw",
        marginRight: "3rem",
        minWidth: "6rem",
        ...(isMobile && {
          minWidth: "10rem",
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
        margin: "1rem",
        width: "80%",
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

      },
      inputs: {
        fontSize: "14px",
        fontWeight: "bold",
        mt: "18px",
        width: "25rem",
        ...(isMobile && {
          width: "80%",
        }),
      },
    };
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);


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
        <Container minWidth="xl">
        <Typography
          variant="h4"
          sx={{ mt: "2rem", mb: "2rem" }}
          color="initial"
        >
          Booking Successful
        </Typography>
        <Divider />
        <Typography
          variant="h6"
          sx={{ mt: "4rem", mb: "5rem" }}
          color="initial"
        >
          We are sending you an email with your booking confirmation and invoice!
        </Typography>
        <img
            style={{
              width: "10rem",
              maxHeight: "10rem",
              borderRadius: "15px",
              alignContent: "center",
              ...(isMobile && {
                width: "100%",
              }),
            }}
            alt="place"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Eo_circle_yellow_checkmark.svg/240px-Eo_circle_yellow_checkmark.svg.png"
          />
 </Container>
 </Box>
 
    );
};

export default Done;