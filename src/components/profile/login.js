import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import * as service from "../../services/auth-service";
import * as userservice from "../../services/users-service";

import React from "react";
import Signup from "./signup";

import {UserList} from "./user-list";
import {useDispatch} from "react-redux";
import {updateProfile} from "./profile-reducer";

export const Login = () => {
  // const [existingUsers, setExistingUsers] = useState([]);
  // const deleteUser = (uid) =>
  //     userservice.deleteUser(uid)
  //         .then(findAllUsers)
  // const findAllUsers = () =>
  //     userservice.findAllUsers()
  //         .then(users => {
  //           setExistingUsers(users)
  //         })
  // useEffect(findAllUsers, []);

  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const login = async () => {
      const user = await service.login(loginUser)
          .catch(e => alert(e));
      console.log(user);
      dispatch(updateProfile(user));
      navigate('/profile/mytuits');
  };

    return (
    <div>
      <Signup/>

      <h1>Login</h1>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setLoginUser({...loginUser, username: e.target.value})}
             placeholder="username"/>
      <input className="mb-2 form-control"
             onChange={(e) =>
               setLoginUser({...loginUser, password: e.target.value})}
             placeholder="password" type="password"/>
      <button onClick={login} className="btn btn-primary mb-5">Login</button>

      {/*<h1>Login As</h1>*/}
      {/*<UserList users={existingUsers} deleteUser={deleteUser}/>*/}
    </div>
  );
};