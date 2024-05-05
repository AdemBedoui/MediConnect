import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../styles/Footer.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import moment from "moment";
import EmailIcon from "@mui/icons-material/Email";
const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#056AB1", color: "white", padding: "1rem" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2 }} sx={{ p: 5 }}>
        <Grid item xs={12} md={4}>
          <div className={styles.colRow}>
            <EmailIcon style={{ color: "white" }} />
            &nbsp;
            <p>Email:</p>
          </div>
          <div className={styles.colRow}>
            <CallIcon style={{ color: "white" }} />
            &nbsp;
            <p>Tel:</p>
          </div>
          <div className={styles.colRow}>
            <LocationOnIcon style={{ color: "white" }} />
            &nbsp;
            <p>localisation: </p>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.colRow}>
            <p>Nos services</p>
          </div>
          <div className={styles.colRow}>
            <p>Nos packs</p>
          </div>
          <div className={styles.colRow}>
            <p>Contactez-nous </p>
          </div>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h5" align="left">
            Newsletter
          </Typography>

          <p>Inscrivez-vous pour recevoir nos dernières nouvelles et offres.</p>
          {/* <Grid container>
            <Grid item xs={8}>
              <TextField
                
                fullWidth
                label="Email Address"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{
                  height: "51px",
                  color: "black",
                  backgroundColor: "white",
                }}
                variant="contained"
              >
                Subscribe
              </Button>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default Footer;
