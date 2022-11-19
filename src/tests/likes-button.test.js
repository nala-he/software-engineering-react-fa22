import axios from "axios";
import {HashRouter} from "react-router-dom";
import {screen, render} from "@testing-library/react";
import {userTogglesTuitLikes} from "../services/likes-service";
import {deleteTuit, findAllTuits} from "../services/tuits-service";
import Tuits from "../components/tuits";

const MOCKED_USERS = [
    {username: 'test_dislike', password: '1234', email: 'dislike@test.com', id: "123"},
    {username: 'test_like', password: '5678', email: 'like@test.com', id: "124"},
];

const MOCKED_TUITS = [
    {tuit: "tuit one", stats: {likes: 0, dislikes: 1}, _id: "123"},
    {tuit: "tuit two", stats: {likes: 3, dislikes: 2}, _id: "124"}
];

test('tuits render static likes and dislikes count', async () => {
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS} deleteTuit={deleteTuit}/>
        </HashRouter>
    );
    const tuitOneLikes = screen.getByText(/0/i);
    expect(tuitOneLikes).toBeInTheDocument();

    const tuitTwoLikes = screen.getByText(/3/i);
    expect(tuitTwoLikes).toBeInTheDocument();
})

test('tuits render async likes and dislikes count', async () => {
    const tuits = await findAllTuits()
    render(
        <HashRouter>
            <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
        </HashRouter>
    );
    const disikes = screen.getAllByText(/1/i);
    expect(disikes[0]).toBeInTheDocument();
})

