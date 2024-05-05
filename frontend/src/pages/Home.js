import React, { useRef, useState } from "react";

import { Stepper, Step, StepLabel } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import estStyles from "../styles/superadmin/Home.module.css";
import Footer from "../components/Footer";
import { useSnackbar } from "notistack";
import axios from "axios";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  CircularProgress,
  Container,
  Grid,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
function Home(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const drawerWidth = 240;
  const navItems = ["Inscrivez- vous", "Me connecter", "Contactez-Nous"];
  const { enqueueSnackbar } = useSnackbar();
  const [drop, setDrop] = useState(false);
  const [state, setState] = useState({ loading: false, establishments: [] });
  const { loading, establishments } = { ...state };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    specialty: "",
    city: "",
  });

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const resultsRef = useRef(null);

  const handleSubmit = async (e) => {
    setState({ ...state, loading: true });
    e.preventDefault();
    handleScroll(resultsRef.current);
    try {
      const { data } = await axios.post("/establishments/search", formData);
      data.length > 0
        ? setState({ ...state, loading: false, establishments: data })
        : setState({ ...state, loading: false, establishments: undefined });
    } catch (error) {
      setState({ ...state, loading: false });
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  const handleScroll = (ref) => {
    window?.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MediConnect
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MediConnect
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              key={"Inscrivez- vous"}
              sx={{
                color: "#fff",
                fontWeight: "800px",
                textTransform: "none",
                marginRight: "5px",
              }}
            >
              Inscrivez-Vous
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/register?PATIENT");
                }}
              >
                Patient
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/register?DOCTOR");
                }}
              >
                Medcin
              </MenuItem>
            </Menu>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              key={"Me connecter"}
              sx={{
                color: "#fff",
                fontWeight: "800px",
                textTransform: "none",
                marginRight: "5px",
              }}
            >
              Me connecter
            </Button>
            <Button
              key={"Contactez-Nous"}
              sx={{
                color: "#fff",
                fontWeight: "800px",
                textTransform: "none",
                marginRight: "5px",
              }}
            >
              Contactez-Nous
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <section className={styles.header}>
          <img alt="header" src={"/header.webp"} />
          <div className={styles.overlay}>
            <div className={styles.container}>
              <img alt="logo" src={"/logo.webp"} />
              <br />
              <h1>Optimisez la gestion de vos rendez-vous</h1>
              <h2>
                Exploitez la puissance d’une gestion efficace
                <br />
                et améliorez l’expérience de vos patients{" "}
              </h2>
              <div className={styles.row}>
                {userInfo ? (
                  <>
                    <Link to="/dashboard">
                      <div className={styles.dropBtn}>Dashboard</div>
                    </Link>
                    &nbsp;&nbsp;
                    <div
                      onClick={() => {
                        dispatch({ type: "USER_LOGOUT" });
                      }}
                      className={styles.dropBtn}
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => setDrop(!drop)}
                      className={styles.dropBtn}
                    >
                      Inscription
                      <div
                        className={
                          drop ? styles.dropMenu : styles.closedDropMenu
                        }
                      >
                        <Link to="/register?PATIENT">
                          <p>Patient</p>
                        </Link>
                        <Link to="/register?DOCTOR">
                          <p>Medecin</p>
                        </Link>
                      </div>
                    </div>
                    &nbsp;&nbsp;
                    <Link to="/login">
                      <div className={styles.dropBtn}>Se connecter</div>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className={styles.bottomRow}>
              <Link to="/" target={"_blank"}>
                <FacebookIcon color={"primary"} />
              </Link>
              &nbsp;
              <Link to="/" target={"_blank"}>
                <TwitterIcon color={"primary"} />
              </Link>
              &nbsp;
              <Link to="/" target={"_blank"}>
                <WhatsAppIcon color={"primary"} />
              </Link>
            </div>
          </div>
        </section>
        <br />
        <section id="filter" className={styles.filter}>
          <form onSubmit={handleSubmit}>
            <div className="labeledInput">
              <label>spécialité</label>
              <select
                required
                onChange={(e) => {
                  setFormData({ ...formData, specialty: e.target.value });
                }}
                placeholder="spécialité"
                type="text"
                className="dateInput"
              >
                <option value="">Spécialité</option>

                <option value="Acupuncteur">Acupuncteur</option>
                <option value="Addictologue">Addictologue</option>
                <option value="Allergologue">Allergologue</option>
                <option value="Anesthésiste">Anesthésiste</option>
                <option value="Angiologue">Angiologue</option>
                <option value="Aromathérapeute">Aromathérapeute</option>
                <option value="Cabinet dentaire">Cabinet dentaire</option>
                <option value="Cabinet médical">Cabinet médical</option>
                <option value="Cancérologue">Cancérologue</option>
                <option value="Cancérologue médical">
                  Cancérologue médical
                </option>
                <option value="Cancérologue radiothérapeute">
                  Cancérologue radiothérapeute
                </option>
                <option value="Cardiologue">Cardiologue</option>
                <option value="Cardiologue du sport">
                  Cardiologue du sport
                </option>
                <option value="Cardiologue Rythmologue">
                  Cardiologue Rythmologue
                </option>
                <option value="Centre de chirurgie réfractive">
                  Centre de chirurgie réfractive
                </option>
                <option value="Centre de médecine préventive">
                  Centre de médecine préventive
                </option>
                <option value="Centre de planification et d'éducation familiale">
                  Centre de planification et d'éducation familiale
                </option>
                <option value="Centre de santé">Centre de santé</option>
                <option value="Centre Laser">Centre Laser</option>
                <option value="Centre médical et dentaire">
                  Centre médical et dentaire
                </option>
                <option value="Chiropracteur">Chiropracteur</option>
                <option value="Chirurgie de l'épaule">
                  Chirurgie de l'épaule
                </option>
                <option value="Chirurgien">Chirurgien</option>
                <option value="Chirurgien cancérologue">
                  Chirurgien cancérologue
                </option>
                <option value="Chirurgien de l'obésité">
                  Chirurgien de l'obésité
                </option>
                <option value="Chirurgien de la hanche, du genou et du pied">
                  Chirurgien de la hanche, du genou et du pied
                </option>
                <option value="Chirurgien de la main">
                  Chirurgien de la main
                </option>
                <option value="Chirurgien dentiste">Chirurgien dentiste</option>
                <option value="Chirurgien du genou">Chirurgien du genou</option>
                <option value="Chirurgien du genou et de la hanche">
                  Chirurgien du genou et de la hanche
                </option>
                <option value="Chirurgien du membre supérieur">
                  Chirurgien du membre supérieur
                </option>
                <option value="Chirurgien du pied">Chirurgien du pied</option>
                <option value="Chirurgien du rachis">
                  Chirurgien du rachis
                </option>
                <option value="Chirurgien esthétique">
                  Chirurgien esthétique
                </option>
                <option value="Chirurgien gynécologique et obstétrique">
                  Chirurgien gynécologique et obstétrique
                </option>
                <option value="Chirurgien gynécologue">
                  Chirurgien gynécologue
                </option>
                <option value="Chirurgien maxillo-facial">
                  Chirurgien maxillo-facial
                </option>
                <option value="Chirurgien maxillo-facial et stomatologiste">
                  Chirurgien maxillo-facial et stomatologiste
                </option>
                <option value="Chirurgien ophtalmologue">
                  Chirurgien ophtalmologue
                </option>
                <option value="Chirurgien oral">Chirurgien oral</option>
                <option value="Chirurgien orthopédiste">
                  Chirurgien orthopédiste
                </option>
                <option value="Chirurgien orthopédiste pédiatrique">
                  Chirurgien orthopédiste pédiatrique
                </option>
                <option value="Chirurgien pédiatrique">
                  Chirurgien pédiatrique
                </option>
                <option value="Chirurgien plasticien">
                  Chirurgien plasticien
                </option>
                <option value="Chirurgien plasticien et esthétique">
                  Chirurgien plasticien et esthétique
                </option>
                <option value="Chirurgien sénologue">
                  Chirurgien sénologue
                </option>
                <option value="Chirurgien urologue">Chirurgien urologue</option>
                <option value="Chirurgien vasculaire">
                  Chirurgien vasculaire
                </option>
                <option value="Chirurgien viscéral et digestif">
                  Chirurgien viscéral et digestif
                </option>
                <option value="Clinique privée">Clinique privée</option>
                <option value="Dentiste pédiatrique">
                  Dentiste pédiatrique
                </option>
                <option value="Dermatologue">Dermatologue</option>
                <option value="Dermatologue Allergologue">
                  Dermatologue Allergologue
                </option>
                <option value="Dermatologue esthétique">
                  Dermatologue esthétique
                </option>
                <option value="Dermatologue pédiatrique">
                  Dermatologue pédiatrique
                </option>
                <option value="Diabétologue">Diabétologue</option>
                <option value="Diététicien">Diététicien</option>
                <option value="Doppler">Doppler</option>
                <option value="Echographie gynécologique et obstétricale">
                  Echographie gynécologique et obstétricale
                </option>
                <option value="Echographie obstétricale">
                  Echographie obstétricale
                </option>
                <option value="Echographiste">Echographiste</option>
                <option value="Endocrinologue">Endocrinologue</option>
                <option value="Endocrinologue diabétologue">
                  Endocrinologue diabétologue
                </option>
                <option value="Endocrinologue pédiatrique">
                  Endocrinologue pédiatrique
                </option>
                <option value="Epilation laser">Epilation laser</option>
                <option value="ESPIC - Etablissement de Santé Privé d'Intérêt Collectif">
                  ESPIC - Etablissement de Santé Privé d'Intérêt Collectif
                </option>
                <option value="Etiopathe">Etiopathe</option>
                <option value="Gastro-entérologue et hépatologue">
                  Gastro-entérologue et hépatologue
                </option>
                <option value="Gastro-entérologue pédiatre">
                  Gastro-entérologue pédiatre
                </option>
                <option value="Gériatre">Gériatre</option>
                <option value="Gynécologue">Gynécologue</option>
                <option value="Gynécologue sexologue">
                  Gynécologue sexologue
                </option>
                <option value="Gynécologue-obstétricien">
                  Gynécologue-obstétricien
                </option>
                <option value="Hématologue">Hématologue</option>
                <option value="Homéopathe">Homéopathe</option>
                <option value="Hôpital privé">Hôpital privé</option>
                <option value="Hypnopraticien">Hypnopraticien</option>
                <option value="Hypnothérapeute">Hypnothérapeute</option>
                <option value="Infirmier">Infirmier</option>
                <option value="Infirmière coordinatrice">
                  Infirmière coordinatrice
                </option>
                <option value="Laser">Laser</option>
                <option value="Masseur-kinésithérapeute">
                  Masseur-kinésithérapeute
                </option>
                <option value="Masseur-kinésithérapeute du sport">
                  Masseur-kinésithérapeute du sport
                </option>
                <option value="Médecin de la douleur">
                  Médecin de la douleur
                </option>
                <option value="Médecin du sport">Médecin du sport</option>
                <option value="Médecin esthétique">Médecin esthétique</option>
                <option value="Médecin généraliste">Médecin généraliste</option>
                <option value="Médecin nutritionniste">
                  Médecin nutritionniste
                </option>
                <option value="Médecin ostéopathe">Médecin ostéopathe</option>
                <option value="Médecin physique - Réadaptateur">
                  Médecin physique - Réadaptateur
                </option>
                <option value="Médecine anti-âge">Médecine anti-âge</option>
                <option value="Médecine Interne">Médecine Interne</option>
                <option value="Médecine Morphologique et Anti-âge">
                  Médecine Morphologique et Anti-âge
                </option>
                <option value="Médecine préventive">Médecine préventive</option>
                <option value="Naturopathe">Naturopathe</option>
                <option value="Néphrologue">Néphrologue</option>
                <option value="Neurochirurgien">Neurochirurgien</option>
                <option value="Neurologue">Neurologue</option>
                <option value="Neuropédiatre">Neuropédiatre</option>
                <option value="Neuropsychiatre">Neuropsychiatre</option>
                <option value="Obstétricien">Obstétricien</option>
                <option value="Oncologie">Oncologie</option>
                <option value="Oncologue">Oncologue</option>
                <option value="Ophtalmologue">Ophtalmologue</option>
                <option value="Ophtalmologue pédiatrique">
                  Ophtalmologue pédiatrique
                </option>
                <option value="ORL">ORL</option>
                <option value="ORL - Chirurgien de la face et du cou">
                  ORL - Chirurgien de la face et du cou
                </option>
                <option value="ORL et Chirurgien Plastique">
                  ORL et Chirurgien Plastique
                </option>
                <option value="ORL pédiatrique">ORL pédiatrique</option>
                <option value="Orthodontiste">Orthodontiste</option>
                <option value="Orthopédiste">Orthopédiste</option>
                <option value="Orthophoniste">Orthophoniste</option>
                <option value="Orthoptiste">Orthoptiste</option>
                <option value="Ostéopathe">Ostéopathe</option>
                <option value="Pathologiste">Pathologiste</option>
                <option value="Pédiatre">Pédiatre</option>
                <option value="Pédicure-podologue">Pédicure-podologue</option>
                <option value="Pédopsychiatre">Pédopsychiatre</option>
                <option value="Phlébologue">Phlébologue</option>
                <option value="Planning familial">Planning familial</option>
                <option value="PMA/AMP - FIV - Fertilité">
                  PMA/AMP - FIV - Fertilité
                </option>
                <option value="Pneumo-allergologue">Pneumo-allergologue</option>
                <option value="Pneumo-pédiatre">Pneumo-pédiatre</option>
                <option value="Pneumologue">Pneumologue</option>
                <option value="Podologue du sport">Podologue du sport</option>
                <option value="Posturologue">Posturologue</option>
                <option value="Proctologue">Proctologue</option>
                <option value="Psychanalyste">Psychanalyste</option>
                <option value="Psychiatre">Psychiatre</option>
                <option value="Psychiatre de l'enfant et de l'adolescent">
                  Psychiatre de l'enfant et de l'adolescent
                </option>
                <option value="Psychologue">Psychologue</option>
                <option value="Psychologue clinicien">
                  Psychologue clinicien
                </option>
                <option value="Psychothérapeute">Psychothérapeute</option>
                <option value="Radiologue">Radiologue</option>
                <option value="Radiothérapeute">Radiothérapeute</option>
                <option value="Rhumatologue">Rhumatologue</option>
                <option value="Rythmologue interventionnel">
                  Rythmologue interventionnel
                </option>
                <option value="Sage femme">Sage femme</option>
                <option value="Sénologue">Sénologue</option>
                <option value="Sexologue">Sexologue</option>
                <option value="Sexologue médecin">Sexologue médecin</option>
                <option value="Sophrologue">Sophrologue</option>
                <option value="Stomatologue">Stomatologue</option>
                <option value="Tabacologue">Tabacologue</option>
                <option value="Trouble du sommeil">Trouble du sommeil</option>
                <option value="Urologue">Urologue</option>
              </select>
            </div>
            <div className="labeledInput">
              <label>lieu</label>
              <input
                className="dateInput"
                placeholder="lieu"
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                }}
              />
            </div>
            <button className={styles.dropBtn}>Rechercher</button>
          </form>
          {loading ? (
            <div className="spinner">
              <CircularProgress />
            </div>
          ) : (
            <div ref={resultsRef} className={styles.results}>
              {establishments ? (
                establishments.map((establishment) => {
                  return (
                    <Link key={establishment._id} to={`/doctors`}>
                      <div
                        onClick={() => {
                          dispatch({
                            type: "SET_CURRENT_ESTABLISHMENT",
                            payload: establishment,
                          });
                        }}
                        key={establishment._id}
                        className={estStyles.col}
                      >
                        <div className={estStyles.card}>
                          <h1>{establishment.name}</h1>
                          <h2>{establishment.adress}</h2>
                          <p>ville: {establishment.city}</p>
                          <p>code postale: {establishment.postalCode}</p>
                          <p>
                            {establishment.weekend.includes(6) &&
                            establishment.weekend.includes(7)
                              ? "disponible: lundi au vendredi"
                              : establishment.weekend.includes(6)
                              ? "disponible: dimanche au vendredi"
                              : establishment.weekend.includes(7)
                              ? "disponible: lundi au samedi"
                              : "disponible: toute la semaine"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <h1>aucun résultat !</h1>
              )}
            </div>
          )}
        </section>

        <section className={styles.body}>
          <div className={styles.divspace}>
            <h2>Vos rendez-vous avec MediConnect</h2>
            <p>
              Une solution qui organise votre activité, améliore l’expérience de
              vos patients et vous fait gagner du temps et des ressources
            </p>
            <Grid container>
              {" "}
              <Grid item>
                <Stepper activeStep={"all"} alternativeLabel>
                  <Step
                    key={1}
                    sx={{
                      "& .MuiStepIcon-root ": {
                        fill: "#056AB1",
                      },
                    }}
                  >
                    <StepLabel>
                      <p>
                        Les demandes de rendez-vous seront envoyées à
                        l'interface du secrétaire
                      </p>
                    </StepLabel>
                  </Step>
                  <Step
                    key={2}
                    sx={{
                      "& .MuiStepIcon-root  ": {
                        fill: "#056AB1",
                      },
                    }}
                  >
                    <StepLabel>
                      <p>
                        {" "}
                        Ces demandes peuvent être approuvées ou reportées en
                        fonction de leurs types et de votre disponibilité
                      </p>
                    </StepLabel>
                  </Step>
                  <Step
                    key={3}
                    sx={{
                      "& .MuiStepIcon-root  ": {
                        fill: "#056AB1",
                      },
                    }}
                  >
                    <StepLabel>
                      <p>
                        Une fois approuvé, vous recevrez une notification. Vous
                        aurez une visibilité détaillée de votre plan pour la
                        journée
                      </p>
                    </StepLabel>
                  </Step>
                </Stepper>
              </Grid>
            </Grid>
          </div>

          <div className={styles.divspace}>
            <h2>Fonctionnalités </h2>

            <p>
              Votre pile technique pour une gestion efficace des rendez-vous:
            </p>
            <br />
            <Grid container justifyContent="center" spacing={2}>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ padding: "3%", display: "flex", flexDirection: "column" }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    height: "100%",
                  }}
                >
                  <Typography variant="h3" className={styles.Typography}>
                    <DateRangeIcon fontSize="large" />
                  </Typography>
                  <Typography>
                    Votre agenda sera paramétrable selon la durée et les types
                    de vos consultations pour optimiser le flux de patients,
                    réduire les temps d’attente et assurer une expérience plus
                    fluide pour les patients et le personnel.
                  </Typography>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ padding: "3%", display: "flex", flexDirection: "column" }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    height: "100%",
                  }}
                >
                  <Typography className={styles.Typography} variant="h3">
                    <GroupsIcon fontSize="large" />
                  </Typography>
                  <Typography>
                    Avoir la liste des patients vous permettra d’accéder à vos
                    notes précédentes et aux données pertinentes de vos patients
                    avant chaque rendez-vous, ce qui conduit à des consultations
                    axées sur les données
                  </Typography>
                </Paper>
              </Grid>

              <Grid
                item
                xs={12}
                md={3}
                sx={{ padding: "3%", display: "flex", flexDirection: "column" }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    height: "100%",
                  }}
                >
                  <Typography className={styles.Typography} variant="h3">
                    <EmailIcon fontSize="large" />
                  </Typography>
                  <Typography>
                    Vous pouvez envoyer des mises à jour ou des instructions
                    spécifiques à vos patients directement via l’interface de
                    messagerie, facilitant ainsi la communication pertinente.
                  </Typography>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ padding: "3%", display: "flex", flexDirection: "column" }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    height: "100%",
                  }}
                >
                  <Typography className={styles.Typography} variant="h3">
                    <BarChartIcon fontSize="large" />
                  </Typography>
                  <Typography>
                    Un rapport dynamique et détaillé sera disponible pour vous
                    fournir des données précieuses sur les tendances et les
                    préférences de rendez-vous de vos patients, vous aidant à
                    prendre des décisions éclairées sur vos horaires et
                    services.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>

          <div className={styles.divspace}>
            <h2>Nos packs </h2>
            <p>
              Profitez des avantages de notre solution complète de gestion des
              rendez-vous adaptée aux besoins de votre cabinet! Investissez dans
              la gestion optimale
            </p>
          </div>
        </section>
        <Footer />
      </Box>
    </Box>
  );
}

export default Home;
