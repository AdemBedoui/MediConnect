import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import styles from "../../../styles/admin/Home.module.css";
import {
  Autocomplete,
  Badge,
  Box,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import TableRDVComponent from "./components/RdvTable";
import Chart from "./components/Chart";
import { useSnackbar } from "notistack";
import moment from "moment";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState({ patient: "TOUS", doctor: "TOUS" });
  const { patient, doctor } = { ...filter };
  const componentRef = useRef();
  const [period, setPeriod] = useState({
    startDate: moment().format("yyyy-MM-DD"),
    endDate: moment().format("yyyy-MM-DD"),
  });
  const { startDate, endDate } = { ...period };

  const { enqueueSnackbar } = useSnackbar();
  const { userInfo, chatcount, demandsCount, cancelsCount } = useSelector(
    (state) => state.auth
  );

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/patient/getAll/${userInfo.establishment}`
      );
      setPatients(
        data.map((patient) => {
          return { ...patient, id: patient._id, label: patient.user.name };
        })
      );
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/doctor/getAll/${userInfo.establishment}`
      );
      setDoctors(
        data.map((doctor) => {
          return { ...doctor, id: doctor._id, label: doctor.user.name };
        })
      );
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  const fetchAppointments = async () => {
    var doctorId = null;
    setLoading(true);
    if (userInfo.role === "DOCTOR") {
      doctorId = userInfo._id;
    }
    try {
      const { data } = await axios.post(
        `/kpi/getappointments/${userInfo.establishment}`,
        { ...period, doctorId: doctorId }
      );
      setAppointments(data);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    if (userInfo.role === "ADMIN") fetchDoctors();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [startDate, endDate]);

  return (
    <>
      <Layout  style={{
           
            display: "flex",
           
            "@media (max-width: 800px)": {
              display: "none", 
            },
          }}>
        <Grid
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "5%",
            "@media (max-width: 800px)": {
              display: "none", 
            },
          }}
          container
          spacing={2}
        >
          <Grid item xs={2}>
            <Link to="/agenda">
              <div className={`${styles.card} + ${styles.color1}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img alt="agenda" src={"/" + "./icons/agenda.webp"} />
                  <p>agenda</p>
                </div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link to="/appointments">
              <div className={`${styles.card} + ${styles.color2}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    badgeContent={appointments.length}
                    style={{ color: "white" }}
                    color="primary"
                  >
                    <img alt="agenda" src={"/" + "./icons/rdv.webp"} />
                  </Badge>
                  <p>rdv's</p>
                </div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link to="/messenger">
              <div className={`${styles.card} + ${styles.color3}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    badgeContent={chatcount}
                    style={{ color: "white" }}
                    color="primary"
                  >
                    <img alt="messenger" src={"/" + "./icons/messenger.webp"} />
                  </Badge>
                  <p>messenger</p>
                </div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link to="/patients">
              <div className={`${styles.card} + ${styles.color4}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    badgeContent={patients.length}
                    style={{ color: "white" }}
                    color="primary"
                  >
                    <img alt="agenda" src={"/" + "./icons/patient.webp"} />
                  </Badge>
                  <p>patients</p>
                </div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link to="/demands">
              <div className={`${styles.card} + ${styles.color5}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                  }}
                >
                  <Badge
                    badgeContent={demandsCount}
                    style={{ color: "white" }}
                    color="primary"
                  >
                    <img alt="agenda" src={"/" + "./icons/notif.webp"} />
                  </Badge>
                  <Badge
                    badgeContent={cancelsCount}
                    style={
                      Number(demandsCount) < 1
                        ? {
                            color: "white",
                            position: "absolute",
                            top: "0px",
                            right: "32px",
                          }
                        : {
                            color: "white",
                            position: "absolute",
                            top: "0px",
                            right: "12px",
                          }
                    }
                    color="fourth"
                  ></Badge>
                  <p>demandes</p>
                </div>
              </div>
            </Link>
          </Grid>
        </Grid>
        <Grid
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "5%",
          }}
          container
          spacing={2}
        >
          <Grid item xs={12} md={3}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={patients}
              onChange={(e, val) => {
                setFilter({
                  ...filter,
                  patient: val === "" || val === null ? "TOUS" : val._id,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tous les patients"
                  variant="standard"
                  sx={{ width: "100%", height: "71px" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            {userInfo.role !== "DOCTOR" ? (
              <>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={doctors}
                  onChange={(e, val) => {
                    setFilter({
                      ...filter,
                      doctor: val === "" || val === null ? "TOUS" : val._id,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tous les docteurs"
                      variant="standard"
                      sx={{ width: "100%", height: "71px" }}
                    />
                  )}
                />
              </>
            ) : null}
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              sx={{ width: "100%", height: "71px", marginTop: "16px" }}
              value={startDate}
              type="date"
              onChange={(e) => {
                setPeriod({
                  ...period,
                  startDate: e.target.value,
                });
              }}
              label="Date de début"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              sx={{ width: "100%", height: "71px", marginTop: "16px" }}
              value={endDate}
              onChange={(e) => {
                setPeriod({
                  ...period,
                  endDate: e.target.value,
                });
              }}
              type="date"
              label="Date de fin"
              variant="standard"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TableRDVComponent
              patients={patients}
              doctors={doctors}
              appointments={appointments}
              startDate={startDate}
              endDate={endDate}
              period={period}
              setPeriod={setPeriod}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Chart appointments={appointments} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default Home;
