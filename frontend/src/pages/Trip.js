import {
  Box,
  Container,
  Divider,
  useMediaQuery,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/bigLogo.png";
import mobileLogo from "../images/bigLogo.png";
import { searchFilterContext } from "../Context";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Trip = ({user}) => {
  let isMobile = useMediaQuery("(max-width:850px)");
  const styles = {
    logo: {
      width: "12vw",
      marginRight: "3rem",
      minWidth: "6rem",
      ...(isMobile && {
        minWidth: "10rem ",
      }),
    },
    line: {
      borderTop: "1px solid rgb(230, 229, 229)",
      mb: "0px",
    },
  };
  const navigate = useNavigate();
  const { bookings, setBookings, total, setTotal } = useContext(searchFilterContext);

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
          Booking Overview
        </Typography>
        <Divider />

        { bookings[0] ? (
          <Box>
            <Grid container spacing={0}>
              {bookings.map((trip) => (
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    width: "350px  ",
                    height: "300px ",
                    p: "3rem",
                  }}
                >
                  
                  <DeleteIcon style={{color:"#FCC300"}}/>
                  <EditIcon style={{color:"#FCC300"}}/>
                  
                  <img
                    src={trip.imageUrl}
                    alt="place"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "100%",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <center>
                    <Typography variant="body1" color="initial">
                      {trip.name}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      On {trip.date} at {trip.time}
                    </Typography>
                  </center>
                </Grid>
              ))}
            </Grid>
            <Button
            onClick={() => navigate("/")}
            variant="outlined"
            sx={{
              color: "#FFC300",
              borderColor: "#FFC300",
              marginTop: "4rem",
              ":hover": {
                borderColor: "#d4a406",
              },
            }}>
            Add an Activity
            </Button>
          <Divider sx={{ mt: "2rem" }}/>
          <Box sx={{ mt: "2rem" }}>
            <Typography  display="inline" variant="h5" color="initial" textAlign="left" float="left"> Total: </Typography>

            <Typography display="inline" variant="h5" color="initial" align="right" float="right"> {total} €</Typography>
          </Box>
          <Button
            onClick={() => navigate("/booking")}
            variant="body1"
            sx={{
              color: "white",
              backgroundColor: "#FFC300",
              borderColor: "#FFC300",
              marginTop: "2rem",
              ":hover": {
                borderColor: "#d4a406",
              },
            }}>
            Complete Booking
            </Button>
        </Box>
        ) : (
          <Box sx={{ mt: "2rem", mb: "2rem" }}>
            <Typography variant="h5" color="initial" gutterBottom>
              No activities added ... yet!
            </Typography>
            <Typography variant="subtitle1" color="gray" gutterBottom>
              Time to start planning 
            </Typography>
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              sx={{
                color: "#FFC300",
                borderColor: "#FFC300",
                ":hover": {
                  borderColor: "#d4a406",
                },
              }}
            >
              Start Searching
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Trip;
