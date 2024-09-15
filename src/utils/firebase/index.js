import {
  LoginUserWithEmailAndPassword,
  SignUpWithEmailAndPassword,
  checkRole,
  Logout,
} from "./auth/authentication";

import {
  createNewDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  getDoctorByEmail,
} from "./doctors/doctorManagement";

import {
  addHospital,
  getHospitalName,
  getHospitals,
} from "./hospitals/hospitalManagement";

import {
  createNewPatient,
  getSinglePatient,
  getPatients,
  deletePatient,
  getPatientsOfDoctor,
  getAllPatientsFromHospitals,
} from "./patients/patientManagement";

import { createUser, getUsers, updatePatient } from "./users/userManagement";

export {
  LoginUserWithEmailAndPassword,
  SignUpWithEmailAndPassword,
  checkRole,
  Logout,
  createNewDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  getDoctorByEmail,
  addHospital,
  getHospitalName,
  getHospitals,
  createNewPatient,
  getSinglePatient,
  getPatients,
  deletePatient,
  getPatientsOfDoctor,
  getAllPatientsFromHospitals,
  createUser,
  getUsers,
  updatePatient,
};
