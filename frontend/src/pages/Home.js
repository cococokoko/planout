import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../images/homeBg4.jpeg";
import mobileLogo from "../images/mobileWhiteLogo.png";
import logo from "../images/mobileWhiteLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import { AutocompleteMap } from "@react-google-maps/api";
import axios from "axios";
import config from '../config';
import {
  Box,
  Grid,
  Button,
  Select,
  Divider,
  MenuItem,
  InputBase,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
  Autocomplete
} from "@mui/material";
import { searchFilterContext } from "../Context";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = ({ user, onLoad, onPlaceChanged }) => {
  let isMedium = useMediaQuery("(max-width:1000px)");
  let isMobile = useMediaQuery("(max-width:700px)");

  const {
    activity,
    setActivity,
    places,
    setPlaces,
    date,
    setDate,
    time,
    setTime,
    budget,
    setBudget,
    guests,
    setGuests,
    isLoading,
    setIsLoading,
  } = useContext(searchFilterContext);


  const activities = ['Restaurant', 'Experience', 'Bar'];

  localStorage.setItem("activity", activity);
  localStorage.setItem("date", date);
  localStorage.setItem("time", time);
  localStorage.setItem("guests", guests);
  localStorage.setItem("budget", budget);

  //Madrid coordinates
  localStorage.setItem("lat", "40.416775"); 
  localStorage.setItem("lng", "-3.703790"); 

  const navigate = useNavigate();
  
  function searchPlaces(_callback) {
    axios({
      method: "POST",
      url:(config.apiUrl +"/search"),
      data:{
        activity: activity,
        date: date,
        guests: guests,
        budget: budget,
       }
    })
    .then((response) => {setPlaces(places.splice(0, places.length, ...response.data)); console.log(places);localStorage.setItem("places", places); _callback();});
  }

  const styles = {
    banner: {
      background: `url(${bg}) center center/cover no-repeat`,
      height: "100%",
      width: "100%",
      opacity: 1,
      zIndex: -1,
      position: "absolute",
      top: 0,
      left: 0,
      "&:after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "linear-gradient(rgb(0,0,0,0.8), rgb(0,0,0,0.3))",

        opacity: 0.7,
        zIndex: -10,
      },
    },
    tabs: {
      color: "white",
      display: "flex",
      justifyContent: "center",
      gap: "5rem",
      width: "80vw",
      ...(isMedium && {
        position: "absolute",
        top: "10rem",
        left: "5rem",
      }),
      ...(isMobile && {
        display: "none",
      }),
    },
    searchFields: {
      backgroundColor: "white",
      height: "65px",
      borderRadius: "100rem",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingLeft: "30px",
      width: "45rem",

      ...(isMedium && {
        top: "15rem",
        flexDirection: "column",
        width: "80vw",
      }),
      ...(isMobile && {
        top: "10rem",
        p: 1,
        width: "70vw",
        flexDirection: "column",
        height: "45vh",
        borderRadius: "1rem",
      }),
    },
    inputs: {
      fontSize: "12px",
      fontWeight: "bold",
      mt: "10px",
      width: "10rem",
      ...(isMobile && {
        width: "80%",
      }),
    },

    vl: {
      position: "relative",
      top: "15",
      height: "20%",
      backgroundColor: "rgb(228, 228, 228)",
      width: "1.5px",
      marginRight: "20px",
      paddingBottom: "15px",
    },
    hl: {
      position: "relative",
      top: "20px",

      backgroundColor: "rgb(228, 228, 228)",
      width: "100%",
      mt: "-2rem",
      mb: "1rem",
      paddingBottom: "1px",
    },
    image_div: {
      mt:2,
    },
    card: {
      padding: "1rem",
      backgroundColor: "white",
      width: "100%",
      border: "1.5px solid rgb(242, 242, 242)",
      borderRadius: "15px",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 20px",
      mt: 10,
    },
    card_top: {
      display: "flex",
      marginTop: "0.3rem",
      justifyContent: "space-between",
      alignItems: "center",
    },
    description: {
      mt: 1,
    },
    input: {
      fontSize: "0.75rem",
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 0.842)",
      height: "1.5rem",
      margin: 0.7,
    },
  };

  return (
    <Box sx={styles.banner}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "2rem",
          ...(isMedium && {
            p: "1rem",
          }),
          
        }}
      >
        <Box>
          <img
            style={{ width: "14vw"}}
            src={isMedium ? mobileLogo : logo}
            alt="logo"
          />
        </Box>

        <Box sx={styles.tabs}>
          <Typography
            variant="subtitle1"
            sx={{ pb: "5px", borderBottom: "2px solid white" }}
          >
            Madrid
          </Typography>
          <Typography variant="subtitle1">Barcelona</Typography>
          <Typography variant="subtitle1">Valencia</Typography>
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
              ...(user && {
                  visibility: "hidden",
                }),
            }}
            onClick={() => navigate("/login")}
          >
            <Button>
            <Typography variant="body1" color="white">
              LogIn
            </Typography>
            </Button>
          </Box>
      </Box>
      <Box display="flex" justifyContent="center" style={{ marginTop: "4rem" }}>
      <Grid container spacing={0} direction="column" justifyContent="center" alignItems="center">
        <Grid item> 
        <Box
          sx={{
            color: "white",
          }}
        >
        <Typography variant={isMobile ? "h6" : "h5"}>
           DISCOVER • BOOK • PLAN OUT <br></br>
        </Typography>
        <br></br>
      </Box>
      </Grid>
      <Grid item> 
        <Box sx={styles.searchFields}>
          <Box
            style={{
              marginTop: "-5px",
              fontSize: "12px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              ...(isMobile && {
                width: "80%",
              }),
            }}
          >
          </Box>
          <Box sx={styles.inputs}>
            Start Planning
            <Select
              variant="standard"
              disableUnderline
              fullWidth
              value = {activity}
              onChange={(e) => {
                const {
                  target: { value },
                } = e;
                setActivity(value
                  // On autofill we get a stringified value.
                  //typeof value === 'string' ? value.split(',') : value,
                );
              }}
            >
              {activities.map((option) => (
                <MenuItem 
                  key={option}
                  value={option}
  >
                {option}
                </MenuItem>
              
          ))}
          </Select>
          </Box>
          
          <Box sx={isMobile ? styles.hl : styles.vl} />

          <Box sx={styles.inputs}>
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
          <Box sx={isMobile ? styles.hl : styles.vl} />
          <Box sx={styles.inputs}>
            Max. Budget
            {isMobile && <br />}
            <InputBase
              defaultValue={40}
              type="number"
              fullWidth
              InputProps={{ inputProps: { min: 10, max: 200, step:5 } }}
              onChange={(e) => setBudget(e.target.value)}
            />
              
          </Box>   
          <Box sx={isMobile ? styles.hl : styles.vl} />
          <Box sx={styles.inputs}>
            Guests
            {isMobile && <br />}
            <InputBase
              defaultValue={20}
              type="number"
              fullWidth
              InputProps={{ inputProps: { min: 10, max: 200 } }}
              onChange={(e) => setGuests(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FFC300",
              padding: "5px",
              borderRadius: "60%",
              marginRight: "5px",

              visibility: "hidden",
              ...(date &&
                guests && {
                  visibility: "visible",
                }),
              ...(isMobile && {
                width: "60vw",
                borderRadius: "0.5rem",
                justifyContent: "center",

                cursor: "pointer",
              }),
            }}
            onClick={() => {searchPlaces(function() { navigate("/rentals")});}}>
            <IconButton onClick={() =>{searchPlaces(function() { navigate("/rentals")});}}>
              <SearchIcon
                sx={{
                  color: "white",
                  ...(isMobile && {
                    mr: 2,
                  }),
                }}
              />
              {isMobile && (
                <Typography variant="body1" color="white">
                  Search
                </Typography>
              )}
            </IconButton>
          </Box>
        </Box>
        </Grid>
        </Grid>
      </Box>
    
      {isMobile ? (
            <h8></h8>
          ) : (
            <Grid container spacing={0} justifyContent="center" alignItems="center">
              <Grid item marginRight={3}>
                <ArrowBackIosIcon sx={{ color: "#FFC300" }} fontSize="large"/>
              </Grid>
              <Grid item marginRight={8}>
            <Box sx={styles.card}>
              <Box sx={styles.card_top}>
                <Box display="flex">
                  <Box>
                  <Typography variant="h6" color="initial">
                    Top Day Bundle
                  </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Box sx={styles.description}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                <Box sx={styles.image_div}>
                <img
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "15px",
                    ...(isMobile && {
                      width: "100%",
                    }),
                  }}
                  src={"https://console.listae.com/files/2017/03/restaurante_maruzzella_madrid_grupo_pulcinella.jpg"}
                  alt="restaurant"
                />
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={styles.input}>
                    Restaurant Maruzzella
                  </Box>
                </Box>
                </Grid>
                <Grid item> <AddCircleIcon sx={{ color: "#FFC300" }}  /> </Grid>
                <Grid item>
                <Box sx={styles.image_div}>
                <img
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "15px",
                    ...(isMobile && {
                      width: "100%",
                    }),
                  }}
                  src={"https://images.musement.com/cover/0155/17/thumb_15416852_cover_header.jpg"}
                  alt="museum"
                />
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={styles.input}>
                  Museum of Illusions
                  </Box>
                </Box>
                </Grid>
                </Grid>
                </Box>
               <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Divider sx={{ mb: "0.5rem" }} />
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      color: "#FFC300",
                      borderColor: "#FFC300",
                      fontSize: "18px",
                      ":hover": {
                        borderColor: "#FFC300",
                      },
                    }}
                  >
                    Book Now
                  </Button>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    &nbsp;
                    40 € per Person
                  </Box>
                </Box>
              </Box>
              </Box>
            </Grid>
            <Grid item marginRight={8}>
            <Box sx={styles.card}>
              <Box sx={styles.card_top}>
                <Box display="flex">
                  <Box>
                  <Typography variant="h6" color="initial">
                    Top Night Bundle
                  </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Box sx={styles.description}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                <Box sx={styles.image_div}>
                <img
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "15px",
                    ...(isMobile && {
                      width: "100%",
                    }),
                  }}
                  src={"https://archello.s3.eu-central-1.amazonaws.com/images/2016/05/24/1ohlab-sala-de-despiece-001c.1506080952.0884.jpg"}
                  alt="restaurant"
                />
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={styles.input}>
                    Restaurant Sala De Despiece
                  </Box>
                </Box>
                </Grid>
                <Grid item> <AddCircleIcon sx={{ color: "#FFC300" }}  /> </Grid>
                <Grid item>
                <Box sx={styles.image_div}>
                <img
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "15px",
                    ...(isMobile && {
                      width: "100%",
                    }),
                  }}
                  src={"https://www.giglon.com/documents/10180/30003/3-35206x1-c5lqs.jpg/a2e9533a-c202-4bf9-a57b-85cfa160d70b?imageThumbnail=2?imageThumbnail=3"}
                  alt="theater"
                />
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={styles.input}>
                  Teatro Victoria ¡Que viva la zarzuela!
                  </Box>
                </Box>
                </Grid>
                </Grid>
                </Box>
               <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Divider sx={{ mb: "0.5rem" }} />
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      color: "#FFC300",
                      borderColor: "#FFC300",
                      fontSize: "18px",
                      ":hover": {
                        borderColor: "#FFC300",
                      },
                    }}
                  >
                    Book Now
                  </Button>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    &nbsp;
                    50 € per Person
                  </Box>
                </Box>
              </Box>
              </Box>

            </Grid>
            <Grid item>
                <ArrowForwardIosIcon sx={{ color: "#FFC300" }} fontSize="large"/>
            </Grid>
            </Grid>
          )}

    </Box>
  );
};

export default Home;
