import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { sidemenu, userInfo, room, currentEstablishment } = useSelector(
    (state) => state.auth
  );

  // fetch messages
  const fetchmessages = async () => {
    let sender;
    let receiver;
    console.log("data ", userInfo, currentChat);

    sender = userInfo?._id;
    receiver = currentChat?._id;

    console.log("data fetch message ", sender, receiver);
    const response = await axios.post(
      "http://https://mediconnect-ow3b.onrender.com0/getmsg",
      {
        from: sender,
        to: receiver,
      }
    );

    if (response) {
      setMessages(response.data);
    } else {
      setMessages([]);
    }
  };

  // execute fetch message
  useEffect(() => {
    fetchmessages();
  }, [currentChat, userInfo]);

  const handleSendMsg = async (msg) => {
    let sender;
    let receiver;
    // test user role === PATIENT ou non

    sender = userInfo?._id;
    receiver = currentChat?._id;

    console.log("data send message ", sender, receiver);
    socket.current.emit("send-msg", {
      to: receiver,
      from: sender,
      msg,
    });

    await axios.post("http://https://mediconnect-ow3b.onrender.com0/addmsg", {
      from: sender,
      to: receiver,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //console all varables and stats
  console.log("currentChat", currentChat);
  console.log("messages", messages);
  console.log("socket", socket);
  console.log("sidemenu", sidemenu);
  console.log("userInfo", userInfo);
  console.log("room", room);
  console.log("currentEstablishment", currentEstablishment);

  return (
    <Container style={{ backgroundColor: "#e0e0e0" }}>
      {currentChat?.user?.role === "PATIENT" ? (
        <div className="chat-header">
          <div className="user-details">
            <div className="username">
              <h3>{currentChat.user.name}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt=""
              />
            </div>
            <div className="username">
              <h3>{currentChat?.user.name}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 80% 5%;

  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    height: 50px;
    justify-content: space-between;
    align-items: center;
    border: "solide";

    padding: 7% 2rem;
    .user-details {
      display: flex;

      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: BLACK;
          font-family: "Inter";
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;

    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5%;
        font-size: 1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #0d4371;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #056ab1;
      }
    }
  }
`;
