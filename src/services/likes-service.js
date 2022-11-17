import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
axios.defaults.adapter = require('axios/lib/adapters/http')

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const userUnlikesTuit = (uid, tid) =>
    api.delete(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userUndislikesTuit = (uid, tid) =>
    api.delete(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);