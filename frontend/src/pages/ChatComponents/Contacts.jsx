import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Contacts({ changeChat }) {
  const [contacts, setcontacts] = useState();
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const { sidemenu, userInfo, room, currentEstablishment } = useSelector(
    (state) => state.auth
  );
  // get contact based on userInfo.role if user role === patient get all establishments else get all patient
  const fetchContacts = async () => {
    if (userInfo.role === "PATIENT" && userInfo?.establishments) {
      // execute post request
      const { data } = await axios.post("/getDoctorAndAdmin", {
        establishmentIds: userInfo?.establishments,
      });

      setcontacts(data);
    } else {
      const { data } = await axios.get(
        `/patient/getAll/${userInfo?.establishment}`
      );
      setcontacts(data);
    }
  };

  const constact = async () => {
    //get all users
    const { data } = await axios.get(`/get/AgetllUser`);

    setcontacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, [userInfo]); // Include userInfo in the dependencies to refetch when it changes.

  console.log("data ", contacts);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Container>
      <div className="brand"></div>

      {userInfo?.role === "PATIENT" ? (
        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 360,
          }}
        >
          {contacts?.patientContacts.map((contact, index) => {
            return (
              <ListItem
                key={contact._id}
                disablePadding
                onClick={() => changeCurrentChat(index, contact)}
              >
                <ListItemButton>
                  <ListItemText primary={contact?.user.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 360,
          }}
        >
          {contacts?.map((contact, index) => {
            return (
              <ListItem
                key={contact._id}
                disablePadding
                onClick={() => changeCurrentChat(index, contact)}
              >
                <ListItemButton>
                  <ListItemText primary={contact?.user.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  padding: 5%;
  background-color: #01365c;
  color: white;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #3080c2;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
