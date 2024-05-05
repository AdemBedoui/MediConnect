import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Welcome() {
  const { sidemenu, userInfo, room, currentEstablishment } = useSelector(
    (state) => state.auth
  );

  return (
    <Container style={{ textAlign: "center" }}>
      <h1>
        Bienvenue, <span>{userInfo.name}!</span>
      </h1>
      <h3>
        Veuillez sélectionner une conversation pour commencer à envoyer des
        messages.
      </h3>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;

  span {
    color: #056ab1;
  }
`;
