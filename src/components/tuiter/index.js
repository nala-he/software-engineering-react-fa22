import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import {Routes, Route, HashRouter} from "react-router-dom";
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import './tuiter.css'
import EditProfile from "../profile/edit-profile";
import Explore from "../explore";
import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import {Login} from "../profile/login";
import Movies from "../movies";
import MovieDetails from "../movies/details";
import profileReducer from "../profile/profile-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
const store = configureStore({reducer: {profile: profileReducer}});

function Tuiter () {
  return(
      <Provider store={store}>
        <HashRouter>
          <div className="container">
            <div className="ttr-tuiter">
              <div className="ttr-left-column">
                <Navigation/>
              </div>
              <div className="ttr-center-column">
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/tuiter" element={<Home/>}/>
                  <Route path="/tuiter/:uid" element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/home/:uid" element={<Home/>}/>
                  <Route path="/explore" element={<Explore/>}/>
                  <Route path="/notifications" element={<Notifications/>}/>
                  <Route path="/messages" element={<Messages/>}/>
                  <Route path="/bookmarks" element={<Bookmarks/>}/>
                  <Route path="/lists" element={<Lists/>}/>
                  <Route path="/profile/*" element={<Profile/>}/>
                  <Route path="/profile/edit" element={<EditProfile/>}/>
                  <Route path="/movies" element={<Movies/>}/>
                  <Route path="/movies/:imdbID" element={<MovieDetails/>}/>
                  <Route path="/more" element={<More/>}/>
                </Routes>
              </div>
              <div className="ttr-right-column">
                <WhatsHappening/>
              </div>
            </div>
          </div>
        </HashRouter>
      </Provider>
  );
}
export default Tuiter;