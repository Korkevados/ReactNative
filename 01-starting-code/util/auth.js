/** @format */
import axios from "axios";
const API_KEY = "AIzaSyAYzGZDwMnlgigInfKiWXzCulClUigmtCg";

async function authenticated(mode, email, password) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const respons = await axios.post(URL, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = respons.data.idToken;

  return token;
}

export function createUser(email, password) {
  console.log("Createing user");
  return authenticated("signUp", email, password);
}
export function Loginuser(email, password) {
  return authenticated("signInWithPassword", email, password);
}
