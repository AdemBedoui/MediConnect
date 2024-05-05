import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@mui/icons-material/Send";

import styles from "../../../styles/admin/Messenger.module.css";
import layoutStyles from "../../../styles/admin/Layout.module.css";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import moment from "moment";

import { sendMessage } from "../../../utils/Messenger.js";
import { io } from "socket.io-client";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
    margin: "2%",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },

  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const Chat = () => {
  const classes = useStyles();
  const { sidemenu, userInfo, room, currentEstablishment } = useSelector(
    (state) => state.auth
  );
  const { enqueueSnackbar } = useSnackbar();
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(true);
  const bottomRef = useRef();
  const dispatch = useDispatch();
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView();
  };

  //get rooms by patient id and by establishment
  const fetchRooms = async () => {
    try {
      console.log("user", userInfo?.role);

      if (userInfo?.role === "PATIENT" && currentEstablishment?._id) {
        console.log("test");
        const { data } = await axios.get(
          `/messenger/getroom/${currentEstablishment?._id}/${userInfo?.id}`
        );
        setRooms(data);
        setLoading(false);
      } else if (userInfo?.establishment && room) {
        const { data } = await axios.get(
          `/messenger/getroom/${userInfo?.establishment}/${room}`
        );
        setRooms(data);
        setLoading(false);
      } else {
        setRooms();
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };
  // executer fetchRooms
  useEffect(() => {
    fetchRooms();
  }, [userInfo.establishment, room, currentEstablishment?._id]);
  console.log("room id", room);

  const send = async () => {
    try {
      if (message?.length > 0) {
        await sendMessage(
          userInfo?.establishment,
          room,
          message,
          userInfo?.establishment,
          room
        );
        setMessage("");

        fetchRooms();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1);
  }, [room]);

  useEffect(() => {
    fetchRooms();
    dispatch({ type: "UPDATE_ROOM", payload: null });
  }, []);

  useEffect(() => {
    var socket = io.connect(process.env.REACT_APP_SERVER_URL);
    // JOIN-ROOM
    socket.emit("join-room", userInfo?.id);
    // INCOMING-MESSAGE
    socket.on("update-chat", () => {
      if (window.location.pathname.includes("messenger")) {
        fetchRooms();
      }
    });
  }, [userInfo, window]);
  return (
    <>
      <Navbar messenger={true} />

      <div
        style={
          sidemenu
            ? { padding: "90px 0px", height: "100vh", paddingLeft: "15px" }
            : { padding: "90px 0px", height: "100vh", paddingLeft: "15px" }
        }
        className={layoutStyles.container}
      >
        <div className={sidemenu ? layoutStyles.col15 : layoutStyles.col0}>
          <Sidebar />
        </div>

        <Grid
          container
          component={Paper}
          style={{ flex: "2", overflow: "auto" }}
          className={classes.chatSection}
        >
          {rooms && (
            <Grid item xs={12}>
              <List className={classes.messageArea}>
                <ListItem key={rooms?._id}>
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItemText
                        align="left"
                        primary={`Patient : ${rooms?.patient?.name}`}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText
                        align="right"
                        primary={`Establishment : ${rooms?.establishment?.name}`}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align="left"
                        secondary={`Last Updated: ${moment(
                          rooms?.updatedAt
                        ).format("YYYY-MM-DD HH:mm:ss")}`}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      {/* Map and display messages for each rooms */}
                      <List>
                        {rooms?.messages?.map((message) => (
                          <ListItem key={message._id}>
                            <Grid container>
                              <Grid item xs={12}>
                                <ListItemText
                                  align={
                                    message.sender?._id === room
                                      ? "left"
                                      : "right"
                                  }
                                  primary={message.text}
                                ></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                <ListItemText
                                  align={
                                    message.sender?._id === room
                                      ? "left"
                                      : "right"
                                  }
                                  secondary={moment(message.createdAt).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                  )}
                                ></ListItemText>
                              </Grid>
                            </Grid>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>

              <Divider />
              <Grid container style={{ padding: "10px" }}>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    defaultValue={""}
                    label="Type your message..."
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    value={message}
                    onKeyDownCapture={(e) => {
                      if (e.keyCode === 13 && !e.shiftKey) {
                        send();
                      }
                    }}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </Grid>
                <Grid xs={1} align="right">
                  <span
                    style={{
                      marginLeft: "-30px",
                      marginTop: "20px",
                      cursor: "pointer",
                      zIndex: "100",
                    }}
                  >
                    <SendIcon onClick={() => send()} color="primary" />
                  </span>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Chat;
