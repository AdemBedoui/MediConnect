import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import establishments from "./routes/establishments.js";
import admins from "./routes/admins.js";
import doctors from "./routes/doctors.js";
import agendas from "./routes/agendas.js";
import types from "./routes/types.js";
import demands from "./routes/demands.js";
import calendars from "./routes/calendars.js";
import patients from "./routes/patients.js";
import reservations from "./routes/reservations.js";
import appointments from "./routes/appointments.js";
import kpi from "./routes/kpi.js";
import events from "./routes/events.js";
import messenger from "./routes/messenger.js";
import { Server as SocketIO } from "socket.io";

const app = express();

dotenv.config();

app.enable("trust proxy");

app.use(
  cors({
    origin: ["https://glowing-phoenix-bec345.netlify.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 1000000,
    extended: true,
  })
);
app.use(express.json());

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5002;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.log(`${error} did not connect`));

const server = app.listen(PORT, () =>
  console.log(
    `---> Server Running on Port: http://localhost:${PORT} || Database is successfully connected <---`
  )
);

const io = new SocketIO(server, {
  // Use the correct SocketIO class
  cors: {
    origin: "https://glowing-phoenix-bec345.netlify.app/",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

app.use(auth);
app.use(users);
app.use(establishments);
app.use(admins);
app.use(doctors);
app.use(agendas);
app.use(types);
app.use(demands);
app.use(calendars);
app.use(patients);
app.use(reservations);
app.use(appointments);
app.use(kpi);
app.use(events);
app.use(messenger);
