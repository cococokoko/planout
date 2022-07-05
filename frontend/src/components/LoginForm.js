import {
    Box,
    Container,
    Divider,
    TextField,
    useMediaQuery,
    Typography,
    Button,
    Grid,
  } from "@mui/material";
  import ReactLoading from "react-loading";
  import React, { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import logo from "../images/bigLogo.png";
  import mobileLogo from "../images/bigLogo.png";
  import config from "../config";
  import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";


function LoginForm(props) {
    const navigate = useNavigate();
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
      inputs: {
        fontSize: "14px",
        fontWeight: "bold",
        mt: "18px",
        width: "20rem",
        ...(isMobile && {
          width: "80%",
        }),
      },
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        fetch(config.env + '/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.get('username'),
                password: data.get('password')
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                props.onLoginError(json.error);
            } else {
                props.onLoginSuccess(json);
            }
        });
    };

    return (
        <Box justifyContent="center">
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
          
        </Container>
        <Divider />
        <Container minWidth="xl">
          <Typography
            variant="h4"
            sx={{ mt: "2rem", mb: "2rem" }}
            color="initial"
          >
            Log into your account to manage your Bookings
          </Typography>
          <Divider />
  
        <Box sx={{ mt: "2rem", mb: "2rem" }}>
        <form onSubmit={onSubmit} style={{marginTop: 32}}>
           <Box sx={styles.inputs}>
            <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
            />
            </Box>
            <Box sx={styles.inputs}>
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            </Box>
            <Box sx={styles.inputs}>
            <Button
                type="submit"
                onClick={() => navigate("/trips")}
                variant="outlined"
                sx={{
                    color: "#FFC300",
                    borderColor: "#FFC300",
                    mb: "3rem",
                    ":hover": {
                      borderColor: "#FFC300",
                    },
                  }}
            >
                Sign In
            </Button>
            
            <FacebookLoginButton onClick={() => alert("Hello")} />
            <GoogleLoginButton onClick={() => alert("Hello")} />
            <GithubLoginButton onClick={() => alert("Hello")} />
            </Box>
        </form>
        </Box>
        </Container>
      </Box>
    )
}

export default LoginForm;