import * as service from "../../services/auth-service"
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import MyTuits from "./my-tuits";
// import TuitsAndReplies
//     from "./tuits-and-replies";
// import Media from "./media";
import MyLikes from "./my-likes";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);

  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }

  return(
      <div>
        <h4>{profile.username}</h4>
        <h6>@{profile.username}</h6>
        <button className="btn btn-primary mb-5"
            onClick={logout}>
          Logout</button>

          <Link to="/profile/mytuits">
              Tuits</Link>
          <Link to="/profile/tuits-and-replies">
              Tuits & replies</Link>
          <Link to="/profile/media">
              Media</Link>
          <Link to="/profile/mylikes">
              Likes</Link>

          <Routes>
              <Route path="/mytuits"
                     element={<MyTuits/>}/>
              {/*<Route path="/tuits-and-replies"*/}
              {/*       element={<TuitsAndReplies/>}/>*/}
              {/*<Route path="/media"*/}
              {/*       element={<Media/>}/>*/}
              <Route path="/mylikes"
                     element={<MyLikes/>}/>
          </Routes>
      </div>
  );
};
export default Profile;