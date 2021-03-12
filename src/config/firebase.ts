import admin from "firebase-admin";
import config from "./firebase-admin-config";

admin.initializeApp({
  credential: admin.credential.cert(config as admin.ServiceAccount),
});

export const auth = admin.auth();
