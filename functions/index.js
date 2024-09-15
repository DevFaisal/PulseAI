// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("node:path");
const fs = require("fs");
const admin = require("firebase-admin");

admin.initializeApp();

const { Resend } = require("resend");

const resend = new Resend("re_huDC7QQy_Ktzukic2KHxgjLaYHBqLsNVK");

const emailTemplatePath = path.join(__dirname, "utils", "emailTemplate.html");
let emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");

exports.patientAdded = functions.firestore
  .document("hospital/{hospitalId}/patients/{patientId}")
  .onCreate((snap, context) => {
    const { contact_info, name, token } = snap.data();
    activationEmail(contact_info.email, token, name);
    console.log("Email has been sended to ", contact_info.email);
  });

exports.doctorAdded = functions.firestore
  .document("hospital/{hospitalId}/doctors/{doctorId}")
  .onCreate(async (snap, context) => {
    try {
      const { email } = snap.data();
      if (!email) {
        console.error("No email found in doctor data.");
        return null;
      }

      await admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: "193201",
      });

      console.log(`Successfully created user with email: ${email}`);
      return null;
    } catch (error) {
      console.error("Error creating new user:", error);
      return null;
    }
  });

exports.doctorDeleted = functions.firestore
  .document("hospital/{hospitalId}/doctors/{doctorId}")
  .onDelete(async (snap, context) => {
    try {
      const { email } = snap.data();
      if (!email) {
        console.error("No email found in doctor data.");
        return null;
      }

      const doctor = await admin.auth().getUserByEmail(email);
      if (!doctor) {
        console.error(`No user found with email: ${email}`);
        return null;
      }

      await admin.auth().deleteUser(doctor.uid);
      console.log(`Successfully deleted user with email: ${email}`);
      return null;
    } catch (error) {
      console.error("Error deleting user:", error);
      return null;
    }
  });

const activationEmail = async (email, token, name) => {
  try {
    let htmlContent = emailTemplate
      .replace("{{name}}", name)
      .replace("{{token}}", token);

    const { data, error } = await resend.emails.send({
      from: 'onboading@brokerless.online',
      to: email,
      subject: "Welcome to Pulse AI",
      html: htmlContent,
    });

    console.log("Email has been sended to ", email);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
