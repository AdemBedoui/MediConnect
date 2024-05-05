import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { CircularProgress, Tooltip } from "@mui/material";
import Navbar from "../components/Navbar";
import styles from "../styles/disconnected/Doctors.module.css";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Doctors(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({ loading: true, doctors: [] });
  const { loading, doctors } = { ...state };
  const { currentEstablishment, userInfo } = useSelector((state) => state.auth);
  console.log("state", state);
  console.log("doctors", doctors);
  console.log("currentEstablishment", currentEstablishment);
  const fetchDoctors = async () => {
    try {
      if (currentEstablishment) {
        const { data } = await axios.post(
          `/establishments/getbyest/${currentEstablishment._id}`
        );
        setState({ ...state, doctors: data, loading: false });
      } else {
        setState({ ...state, doctors: [], loading: false });
      }
    } catch (error) {
      setState({ ...state, loading: false });
      console.log(error);
      console.log("error", error);
    }
  };

  useEffect(() => {
    setState({ ...state, loading: true });
    fetchDoctors();
  }, [currentEstablishment]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {loading ? (
          <div className="spinner">
            <CircularProgress />
          </div>
        ) : userInfo?.blacklisted?.includes(currentEstablishment?._id) ? (
          <>
            <h1>votre compte est bloqué dans cet établissement !</h1>
            <h1>contactez nous pour plus d'informations.</h1>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "50px",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <a href={`tel:${currentEstablishment.phone}`}>
                {currentEstablishment.phone}
              </a>
              &nbsp;
              <PhoneEnabledIcon color="secondary" />
            </div>
          </>
        ) : (
          <>
            {doctors.map((doctor) => {
              return (
                <div key={doctor._id} className={styles.col}>
                  <div className={styles.card}>
                    <div className={styles.profile}>
                      <img
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/" + "./icons/user.webp";
                        }}
                        style={{ marginBottom: "20px" }}
                        src={doctor.user.avatar ? doctor.user.avatar : ""}
                        alt="profile"
                      />
                    </div>
                    <h1>{doctor.user.name}</h1>
                    <div className={styles.row}>
                      <MedicalServicesIcon color="primary" />
                      &nbsp;&nbsp;
                      <p>{doctor.specialty}</p>
                    </div>
                    <div className={styles.row}>
                      <ApartmentIcon color="primary" />
                      &nbsp;&nbsp;
                      <p>{doctor.establishment.name}</p>
                    </div>
                    <div className={styles.row}>
                      <LocationOnIcon color="primary" />
                      &nbsp;&nbsp;
                      <p>{doctor.establishment.adress}</p>
                    </div>
                    <Link to={`/doctors/calendar/${doctor._id}`}>
                      <button className="secondBtn">prenez rendez-vous</button>{" "}
                    </Link>
                  </div>
                </div>
              );
            })}
            {currentEstablishment == null ? (
              <div style={{ display: "inline-flex", paddingTop: "50px" }}>
                <h1>Aucun établissement n'a été choisi</h1>

                <HashLink to="/#filter">
                  <Tooltip title="recherche docteurs">
                    <ArrowForwardIcon
                      style={{ cursor: "pointer" }}
                      sx={{ fontSize: 40 }}
                    />
                  </Tooltip>
                </HashLink>
              </div>
            ) : doctors.length < 1 ? (
              <div style={{ display: "inline-flex", paddingTop: "50px" }}>
                <h1>
                  Cet établissement n'est pas encore configuré. Veuillez
                  réessayer plus tard ou choisir un autre établissement.
                </h1>
                <HashLink to="/#filter">
                  <Tooltip title="recherche docteurs">
                    <ArrowForwardIcon
                      style={{ cursor: "pointer" }}
                      sx={{ fontSize: 40 }}
                    />
                  </Tooltip>
                </HashLink>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

export default Doctors;
