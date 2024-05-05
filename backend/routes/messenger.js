import express from "express";
import {
  sendMessage,
  getRoom,
  unreadCount,
  getRoomsPatient,
  getRoomPatient,
  unreadCountPatient,
  getRoomByEstablishmentAndPatient,
  addMessage,
  getMessages,
} from "../controllers/messenger.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/messenger/sendmessage", auth, sendMessage);
router.get(
  "/messenger/getroom/:establishmentId/:patientId",

  getRoomByEstablishmentAndPatient
);

router.get("/messenger/getroom/:id", getRoom);
router.get("/messenger/getunread/:id", auth, unreadCount);
router.get("/messenger/getroomsbypatient/:id", auth, getRoomsPatient);
router.get("/messenger/getroompatient/:id", auth, getRoomPatient);
router.get("/messenger/getunreadpatient/:id", auth, unreadCountPatient);
router.post("/addmsg/", auth, addMessage);
router.post("/getmsg/", auth, getMessages);

export default router;
