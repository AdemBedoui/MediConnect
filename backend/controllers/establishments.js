import Establishment from "../models/establishment.js";
import Doctor from "../models/doctor.js";
import Admin from "../models/admin.js";
import Patient from "../models/patient.js";

export const getDoctorAndAdmin = async (req, res) => {
  try {
    // establishments table is from req.body
    const { establishmentIds } = req.body;

    // Utiliser Promise.all pour exécuter les requêtes de recherche en parallèle
    const doctorsPromises = establishmentIds.map((element) => {
      return Doctor.find({ establishment: element })
        .populate("user", "-password")
        .lean();
    });

    const adminsPromises = establishmentIds.map((element) => {
      return Admin.find({ establishment: element })
        .populate("user", "-password")
        .lean();
    });

    // Attendre que toutes les requêtes soient terminées
    const doctorsResults = await Promise.all(doctorsPromises);
    const adminsResults = await Promise.all(adminsPromises);

    // Concaténer les résultats de toutes les recherches
    const doctors = [].concat(...doctorsResults);
    const admins = [].concat(...adminsResults);

    // Combine doctors and admins into a single variable
    const patientContacts = [...doctors, ...admins];

    res.json({
      patientContacts,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }
};

export const add = async (req, res) => {
  const {
    name,
    phone,
    adress,
    city,
    specialty,
    postalCode,
    startHour,
    endHour,
    weekend,
  } = req.body;

  try {
    const exists = await Establishment.findOne({ name: name.toUpperCase() });
    if (exists) {
      return res.status(400).json({ message: "Establishment already exists" });
    }
    await Establishment.create({
      name: name.toUpperCase(),
      phone,
      adress,
      city,
      specialty,
      postalCode,
      startHour,
      endHour,
      weekend,
    });
    res.json({
      message: "Establishment Added successfully.",
    });
  } catch (error) {
    res.status(500).json(error, { message: "Something went wrong !" });
    console.log(error);
  }
};

export const get = async (req, res) => {
  const establishments = await Establishment.find({});
  res.status(200).send(establishments);
};

export const getForPatient = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await Patient.findById(userId).populate("establishments");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const establishments = user.establishments;

    if (establishments.length > 0) {
      res.status(200).json(establishments);
    } else {
      res
        .status(404)
        .json({ message: "No establishments found for the user." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getById = async (req, res) => {
  const establishment = await Establishment.findById(req.params.id);
  establishment
    ? res.status(200).send(establishment)
    : res.status(403).send("NOT FOUND");
};

export const modify = async (req, res) => {
  try {
    await Establishment.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      { ...req.body, name: req.body.name.toUpperCase() }
    );
    res.json({
      message: "Establishment Modified successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong !" });
    console.log(error);
  }
};

export const getMembers = async (req, res) => {
  var members = await Admin.find({
    establishment: req.params.id,
  }).populate("user", "-password");
  members = [
    ...members,
    ...(await Doctor.find({
      establishment: req.params.id,
    }).populate("user", "-password")),
  ];
  res.status(200).send(members);
};

export const getByEst = async (req, res) => {
  var doctors = await Doctor.find({ establishment: req.params.id })
    .populate("user", "-password")
    .populate("establishment");
  res.status(200).send(doctors);
};

export const search = async (req, res) => {
  const data = req.body;
  const query = { specialty: data.specialty };
  data.adress !== ""
    ? (query.adress = new RegExp(".*" + data.city + ".*"))
    : null;
  var establishments = await Establishment.find(query);
  res.status(200).send(establishments);
};
