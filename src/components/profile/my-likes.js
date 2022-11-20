import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyLikes = () => {
    const [likedTuits, setLikedTuits] = useState([]);
    const findTuitsILike = () =>
        service.findTuitsUserLiked("me")
            .then((tuits) => setLikedTuits(tuits));
    useEffect(findTuitsILike, []);

    return(
        <div>
            <span>My Likes</span>
            <Tuits tuits={likedTuits}
                   refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;