import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div></div>
      <form className="input-container">
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />

        <SendIcon
          onClick={(event) => sendChat(event)}
          sx={{
            fontSize: "30px",
            cursor: "pointer",
          }}
        />
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #f5f5f5;
  padding: 0 1rem;
  gap: 1rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .input-container {
    width: 100%;
    height: 60%;
    border-radius: 2rem;
    display: flex;
    align-items: center;

    background-color: #ffffff34;
    input {
      width: 90%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 2rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #1977bd;
      }
      &:focus {
        outline: none;
      }
    }
  }
`;
