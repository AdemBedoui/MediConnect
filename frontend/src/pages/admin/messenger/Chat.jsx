import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import layoutStyles from "../../../styles/admin/Layout.module.css";
import ChatContainer from "../../ChatComponents/ChatContainer";
import Contacts from "../../ChatComponents/Contacts";
import Welcome from "../../ChatComponents/Welcome";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core";
export default function Chat() {
  const { sidemenu, userInfo, room, currentEstablishment } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    chatSection: {
      height: "100%",
      width: "100vw",
    },
  });

  const classes = useStyles();
  useEffect(() => {
    if (userInfo) {
      socket.current = io("http://https://mediconnect-ow3b.onrender.com0");
      socket.current.emit("add-user", userInfo._id);
    }
  }, [userInfo]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Navbar messenger={true} />

      <div
        style={
          sidemenu
            ? {
                padding: "0px",
                height: "100vh",
                paddingLeft: "0px",
              }
            : { padding: "0px", height: "100vh", paddingLeft: "15px" }
        }
        className={layoutStyles.container}
      >
        {userInfo?.role !== "PATIENT" ? (
          <div className={sidemenu ? layoutStyles.col15 : layoutStyles.col0}>
            <Sidebar />
          </div>
        ) : null}

        <Grid
          container
          component={Paper}
          style={{ flex: "2", overflowY: "auto" }}
          className={classes.chatSection}
        >
          <Container>
            <div className="container">
              <Contacts contacts={contacts} changeChat={handleChatChange} />
              {currentChat === undefined ? (
                <Welcome />
              ) : (
                <ChatContainer currentChat={currentChat} socket={socket} />
              )}
            </div>
          </Container>
        </Grid>
      </div>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  .container {
    height: 100%;
    width: 100%;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 20% 80%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 30% 70%;
    }
  }
`;
