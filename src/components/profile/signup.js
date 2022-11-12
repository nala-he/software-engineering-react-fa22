import {useState} from "react";
import {useDispatch} from "react-redux";
import * as service
    from "../../services/auth-service";
import {useNavigate} from "react-router-dom";
import {updateProfile} from "./profile-reducer";

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        const user = await service.signup(newUser)
            .then(() => {
                dispatch(updateProfile(user));
                navigate('/profile')
            })
            .catch(e => alert(e));
    }

    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   placeholder="username"
                onChange={(e) =>
                setNewUser({...newUser,
                               username: e.target.value})}/>
            <input className="mb-2 form-control"
                   placeholder="password" type="password"
                onChange={(e) =>
                setNewUser({...newUser,
                               password: e.target.value})}/>
            <input className="mb-2 form-control"
                   placeholder="email" type="email"
                onChange={(e) =>
                setNewUser({...newUser,
                               email: e.target.value})}/>
            <button className="btn btn-primary mb-5"
                onClick={signup}>
                Signup</button>
        </div>
    );
}
export default Signup;