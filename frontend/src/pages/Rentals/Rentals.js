import React, { createRef, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/bigLogo.png";
import mobileLogo from "../../images/bigLogo.png";
import ReactLoading from "react-loading";
import Map from "../../components/Map";
import PlaceDetails from "../../components/PlaceDetails";
import { searchFilterContext } from "../../Context";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SwipeableEdgeDrawer from "../../components/MobileDrawer";
const Restaurants = ({
  user,
  coordinates,
  setCoordinates,
  setBound,
  childClicked,
  setChildClicked,
  autocomplete,
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let isMedium = useMediaQuery("(max-width:350px)");
  let isMobile = useMediaQuery("(max-width:500px)");
  const {
    destination,
    setDestination,
    places,
    setPlaces,
    date,
    setDate,
    time,
    setTime,
    guests,
    setGuests,
    isLoading,
    setIsLoading,
  } = useContext(searchFilterContext);

  useEffect(() => {
    setIsLoading(true);
    setDestination(localStorage.getItem("destination"));
    setDate(localStorage.getItem("date"));
    setTime(localStorage.getItem("time"));
    setGuests(localStorage.getItem("guests"));
    setPlaces(places.splice(0, places.length, ...localStorage.getItem("places")));
    setIsLoading(false);
    return () => {};
  }, []);
  const [elRefs, setElRefs] = useState([]);

  if (autocomplete) {
    localStorage.setItem(
      "lat", JSON.stringify(autocomplete.getPlace().geometry.location.lat())
    );
    localStorage.setItem(
      "lng", JSON.stringify(autocomplete.getPlace().geometry.location.lng())
    );
  }

  useEffect(() => {
    const lat = JSON.parse(localStorage.getItem("lat"));
    const lng = JSON.parse(localStorage.getItem("lng"));
    setCoordinates({ lat, lng });
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  const styles = {
    logo: {
      width: "12vw",
      marginRight: "3rem",
      minWidth: "1.5rem",
      ...(isMedium && { width: "10vw" }),
    },
    searchReminder: {
      width: "25rem",
      border: "1.5px solid rgb(242, 242, 242)",
      borderRadius: "100px",
      height: "3rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: "2rem",
      paddingRight: "0.5rem",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      ...(isMobile && {
        display: "none",
      }),
    },
    filter: {
      fontSize: "14px",
      fontWeight: "500",
      mr: "1.75rem",
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
    line: {
      borderTop: "1px solid rgb(230, 229, 229)",
      mb: "0px",
    },
    restosContent: {
      display: "flex",
      height: "calc(100vh - 121px)",
      ...(isMedium && {
        position: "relative",
        // overflow: "hidden",
        height: "5vh",
      }),
    },
    restosContentL: {
      width: "45%",
      padding: "30px",
      height: "calc(100vh - 11.5rem)",
      overflowY: "scroll",
      ...(isMedium && {
        width: "100vw",
        zIndex: 1,
        mt: "51vh",
      }),
    },
    line2: {
      borderTop: "0.5px solid rgb(230, 230, 230)",
      margin: "30px 0px",
    },

    restosContentR: {
      width: "55%",
      ...(isMedium && {
        width: "100vw",
        position: "absolute",
        left: 0,
        top: 10,
        height: "82vh",
        zIndex: 0,
      }),
    },
  };
  
  return (
    <Box style={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "2rem",
          ...(isMedium && {
            p: 2,
          }),
        }}
      >
        <Box>
          <Link to="/">
            <img
              style={styles.logo}
              src={isMedium ? mobileLogo : logo}
              alt="logo"
            />
          </Link>
        </Box>
        <Box sx={styles.searchReminder}>
          <Typography varient="body1" sx={styles.filter}>
            {destination}
          </Typography>
          <Box sx={styles.vl} />
          <Typography varient="body1" sx={styles.filter}>
            {`
           ${months[parseInt(date.split("-")[1], 10) - 1]} 
           ${date.split("-")[2]}`}
          </Typography>
          <Box sx={styles.vl} />
          <Typography varient="body1" sx={styles.filter}>
            {guests} Guest
          </Typography>
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
          {user && (
            <IconButton
              sx={{ color: "#FFC300" }}
              onClick={() => navigate("/trip")}
            >
              <PersonIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {/* <hr style={styles.line} /> */}
      <Divider />
      <Box sx={styles.restosContent}>
        {isMedium ? (
          <SwipeableEdgeDrawer
            places={places}
            childClicked={childClicked}
            isMobile={isMobile}
            isLoading={isLoading}
          />
        ) : (
          
          <Box varient="body1" sx={styles.restosContentL}>
            <Box>
            { places? (
              <Typography varient="body2" fontSize={15}>
                Options Available
              </Typography>
          ) : (
            <Typography varient="body2" fontSize={15}>
                No Options Available for the choosen dates
              </Typography>
          )}
            </Box>
            {isLoading ? (
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
              places?.map((place, i) => (
                <Box ref={elRefs[i]} key={i}>
                  {/* <hr style={styles.line2} /> */}
                  <Divider sx={{ margin: "30px 0px" }} />
                  <Box>
                    <PlaceDetails
                      place={place}
                      selected={Number(childClicked) === i}
                      refProp={elRefs[i]}
                    />
                  </Box>
                </Box>
              ))
            )}
          </Box>
        )}
        <Box sx={styles.restosContentR}>
          <Map
            places={places}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            destination={destination}
            setBound={setBound}
            setChildClicked={setChildClicked}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Restaurants;
