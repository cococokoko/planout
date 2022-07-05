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
  import ReactLoading from "react-loading";
  import LoadingButton from "@mui/lab/LoadingButton";
  import React, { useContext, useEffect, useState } from "react";
  import styled from "styled-components";
  import { Link, useNavigate, useLocation } from "react-router-dom";
  import logo from "../../images/bigLogo.png";
  import mobileLogo from "../../images/bigLogo.png";
  import { searchFilterContext } from "../../Context";
  
  const Booking = () => {
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
          Booking
        </Typography>
        <Divider />
        <Grid container spacing={0} columns={16}>
        <Grid
                item
                xs={8}
              > 
            <Box sx={{ mt: "2rem", mb: "2rem" }}>
                <Box sx={styles.inputs}>
                    Name
                    <TextField
                    variant="standard"
                    fullWidth
                    />
                </Box>
                <Box sx={styles.inputs}>
                    Company Name
                    <TextField
                    variant="standard"
                    fullWidth
                    />
                </Box>
                <Box sx={styles.inputs}>
                    Phone Number
                    <TextField
                    variant="standard"
                    fullWidth
                    />
                </Box>
                <Box sx={styles.inputs}>
                    Email
                    <TextField
                    variant="standard"
                    fullWidth
                    />
                </Box>
                <br></br>
              <Button
                onClick={() => navigate("/checkout")}
                variant="text"
                sx={{
                  color: "white",
                  backgroundColor: "#FFC300",
                  borderColor: "#FFC300",
                  ":hover": {
                    borderColor: "#FFC300",
                  },
                }}
              > 
                Pay Now
              </Button>
            </Box>
            </Grid>
            <Grid
                item
                xs={8}
              >

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
              {bookings.map((place) => (
              <LoadingButton
                loading={loading}
                onClick={() => {
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
                Edit
              </LoadingButton>
              ))}
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
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "1rem",
                  }}
                >
                </span>
                <span
                  style={{
                    color: "gray",
                    marginLeft: "5px",
                    fontSize: "0.8rem",
                  }}
                > 
                </span>
              </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={0} direction="column">
            {bookings.map((place) => (
                <Grid
                item
                xs={12} >
              <Box sx={styles.description}>
                  Reservation {bookings.indexOf(place)+1} 
                  <span
                  style={{
                    color: "gray",
                    marginLeft: "10px",
                    fontSize: "0.8rem",
                  }}
                > &nbsp; {place.price} € per Person
                </span>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={styles.input}>
                    {place.name} <br></br>
                    <br></br>
                    Date: {place.date} <br></br>
                    <br></br>
                    Time: {place.time}  <br></br>
                    <br></br>
                    Guests: {place.guests}  <br></br>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ mb: "1.75rem" }} />
              </Grid>
              ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                    {total} €
                  </Box>
                </Box>
                <LoadingButton
                  fullWidth
                  loading={loading}
                  onClick={() => {
                      navigate("/trip");
                    ;
                  }}
                  variant="outlined"
                    sx={{
                    color: "#FFC300",
                    borderColor: "#FFC300",
                    marginTop: "2rem",
                    ":hover": {
                        borderColor: "#d4a406",
                    },
                    }}
                >
                  Edit
                </LoadingButton>          
              </Box>        
              </Box>
          )}

            </Grid>
            </Grid>
            </Container>
         </Box>
    );
  };
  
  export default Booking;
  