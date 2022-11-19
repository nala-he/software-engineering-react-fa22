import axios from "axios";
// server test:
// const BASE_URL = "http://a2-env.eba-icm2q6vp.us-east-1.elasticbeanstalk.com";
// local test:
const BASE_URL = process.env.REACT_APP_BASE_URL

const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;
axios.defaults.adapter = require('axios/lib/adapters/http')

const api = axios.create({
    withCredentials: true
});

export const findAllTuits = () =>
  axios.get(TUITS_API)
    .then(response => response.data);

export const findTuitById = (tid) =>
  axios.get(`${TUITS_API}/${tid}`)
    .then(response => response.data);

export const findTuitByUser = (uid) =>
  api.get(`${USERS_API}/${uid}/tuits`)
    .then(response => response.data);

export const createTuit = (uid, tuit) =>
  api.post(`${USERS_API}/${uid}/tuits`, tuit)
    .then(response => response.data);

export const updateTuit = (tid, tuit) =>
  axios.put(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

export const deleteTuit = (tid) =>
  axios.delete(`${TUITS_API}/${tid}`)
    .then(response => response.data);
