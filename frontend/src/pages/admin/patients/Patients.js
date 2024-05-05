import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../../../styles/admin/Patients.module.css";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  Fade,
  Grid,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "../../../utils/AppContext";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import ModifyPatient from "./components/ModifyPatient";
import AddPatient from "./components/AddPatient";
import BlockPatient from "./components/BlockPatient";
import ActivatePatient from "./components/ActivatePatient";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, ButtonBase, Chip, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

function Patients(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo, currentEstablishment } = useSelector((state) => state.auth);
  const { toggleModal, modalOpen } = useContext(AppContext);
  const [state, setState] = useState({ patients: [], loading: true });
  const { patients, loading } = { ...state };
  const [patient, setPatient] = useState("TOUS");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [phone, setPhone] = useState("");
  const [action, setAction] = useState("");
  const columns = [
    {
      id: "Sex",
      label: "Sex",
      align: "center",
    },
    {
      id: "Nom",
      label: "Nom",
      align: "center",
    },
    {
      id: "Email",
      label: "Email",
      align: "center",
    },
    {
      id: "Age",
      label: "Age",
      align: "center",
    },
    {
      id: "Téléphone",
      label: "Téléphone",
      align: "center",
    },
    {
      id: "RDV.INT",
      label: "RDV.INT",
      align: "center",
    },

    {
      id: "Action",
      label: "Actions",
      align: "center",
    },
  ];

  const theme = useTheme();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8EE9CD",
      color: theme.palette.common.black,
      fontSize: "15px",
      fontWeight: "600px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const fetchPatients = async () => {
    setState({ ...state, loading: false });
    try {
      const { data } = await axios.get(
        `/patient/getall/${userInfo.establishment}`
      );
      setState({
        loading: false,
        patients: data.map((patient) => {
          return { ...patient, id: patient._id, label: patient.user.name };
        }),
      });
    } catch (error) {
      setState({ loading: false });
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div
            className={
              modalOpen
                ? action === "ADD_PATIENT" || action === "MODIFY_PATIENT"
                  ? "modal big open"
                  : "modal small open"
                : "modal small"
            }
          >
            {action === "MODIFY_PATIENT" ? (
              <ModifyPatient
                fetchPatients={fetchPatients}
                patient={selectedPatient}
              />
            ) : action === "ADD_PATIENT" ? (
              <AddPatient fetchPatients={fetchPatients} />
            ) : // : action === "DELETE_PATIENT" ? (
            //   <AddPatient />
            // )
            action === "BLOCK_PATIENT" ? (
              <BlockPatient
                establishment={userInfo.establishment}
                fetchPatients={fetchPatients}
                patient={selectedPatient}
              />
            ) : action === "ACTIVATE_PATIENT" ? (
              <ActivatePatient
                establishment={userInfo.establishment}
                fetchPatients={fetchPatients}
                patient={selectedPatient}
              />
            ) : null}
          </div>
        </Fade>
      </Modal>
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tooltip title="nouveau patient">
              <AddIcon
                onClick={() => {
                  setSelectedPatient(patient);
                  setAction("ADD_PATIENT");
                  toggleModal();
                }}
                style={{ cursor: "pointer" }}
                fontSize="large"
                color="secondary"
              />
            </Tooltip>{" "}
          </Grid>
          <Grid item xs={12}>
            <h1>patients de cabinet: {currentEstablishment?.name}</h1>
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={patients}
              value={
                patient === "TOUS"
                  ? ""
                  : patients.find((p) => p._id === patient)
              }
              onChange={(e, val) => {
                setPatient(val === "" || val === null ? "TOUS" : val._id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "100%", height: "71px" }}
                  label="Tous les patients"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              variant="standard"
              sx={{ width: "100%", height: "71px", marginTop: "24px" }}
              type="number"
              className="muiInput"
              placeholder="Téléphone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {patient !== "TOUS" ? (
            <Tooltip title="réinitialiser">
              <RotateLeftIcon
                onClick={() => {
                  setPatient("TOUS");
                }}
                style={{ cursor: "pointer", margin: "10px" }}
                color="secondary"
              />
            </Tooltip>
          ) : (
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell align="center" colSpan={columns.length}>
                        <span className="api_loading">
                          <img src="/loading.gif" width={50} alt="loader" />
                        </span>
                      </TableCell>
                    </TableRow>
                  ) : patients?.length > 0 ? (
                    patients?.map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">
                          <Typography variant="subtitle2">{row.sex}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle2">
                            {row.user.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle2">
                            {row.user.email}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography variant="subtitle2">
                            {Math.trunc(
                              Math.abs(
                                moment(row.birthday).diff(moment()) /
                                  31556952000
                              )
                            )}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography variant="subtitle2">
                            {row.user.phone}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          {row.blacklisted.includes(userInfo.establishment) ? (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "rgb(230,6,50)",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "rgb(6,230,144)",
                              }}
                            />
                          )}
                        </TableCell>

                        <TableCell align="center">
                          {row.blacklisted.includes(userInfo.establishment) ? (
                            <CheckIcon
                              onClick={() => {
                                setSelectedPatient(row);
                                setAction("ACTIVATE_PATIENT");
                                toggleModal();
                              }}
                              style={{
                                color: "#2DCB06",
                                cursor: "pointer",
                              }}
                              fontSize="medium"
                            />
                          ) : (
                            <BlockIcon
                              onClick={() => {
                                setSelectedPatient(row);
                                setAction("BLOCK_PATIENT");
                                toggleModal();
                              }}
                              style={{
                                color: "#CB0664",
                                cursor: "pointer",
                              }}
                              fontSize="medium"
                            />
                          )}
                          &nbsp;
                          <EditIcon
                            onClick={() => {
                              setSelectedPatient(row);
                              setAction("MODIFY_PATIENT");
                              toggleModal();
                            }}
                            style={{ color: "#2DCB06", cursor: "pointer" }}
                            fontSize="medium"
                          />
                          {/* &nbsp;
                              <DeleteOutlineIcon
                                onClick={() => {
                                  setSelectedPatient(patient);
                                  setAction("DELETE_PATIENT");
                                  toggleModal();
                                }}
                                style={{ color: "#056AB1", cursor: "pointer" }}
                                fontSize="medium"
                              /> */}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan="10"
                        align="center"
                        sx={{ padding: "80px 0" }}
                      >
                        <Typography variant="subtitle1" color="textSecondary">
                          Aucun patient trouvé
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Layout>
    </>
  );
}

export default Patients;
