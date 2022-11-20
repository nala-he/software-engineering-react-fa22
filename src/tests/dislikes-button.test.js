import axios from "axios";
import {HashRouter} from "react-router-dom";
import {screen, render} from "@testing-library/react";
import {
    findTuitsUserDisliked,
    userTogglesTuitDislikes,
    userTogglesTuitLikes
} from "../services/likes-service";
import {createTuit, deleteTuit, findAllTuits} from "../services/tuits-service";
import Tuits from "../components/tuits";
import {createUser, deleteUser} from "../services/users-service";

const MOCKED_USERS = [
    "alice", "bob", "charlie"
];

const MOCKED_TEXTS = [
    "alice's tuit", "bob's tuit", "charlie's tuit"
];

const MOCKED_TUITS = [
    {tuit: "tuit one", stats: {likes: 0, dislikes: 1}, _id: "123"},
    {tuit: "tuit two", stats: {likes: 3, dislikes: 2}, _id: "124"}
];

test('tuits render static dislikes count', async () => {
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS} deleteTuit={deleteTuit}/>
        </HashRouter>
    );
    const tuitOneDislikes = screen.getByText(/1/i);
    expect(tuitOneDislikes).toBeInTheDocument();

    const tuitTwoDislikes = screen.getByText(/2/i);
    expect(tuitTwoDislikes).toBeInTheDocument();
})

test('tuits render async dislikes count', async () => {
    const uid = "636edea1f73adc686bc93946";
    const tuits = await findTuitsUserDisliked(uid);
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );
    const dislikes = screen.getAllByText(/1/i);
    expect(dislikes[0]).toBeInTheDocument();
})

describe('tuit dislikes list renders mocked', () => {
    // TODO: implement this
    beforeAll(() => {
        jest.spyOn(axios, 'get').mockImplementation();
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('tuit dislikes list renders mocked', async () => {
        let newTuits = new Array(MOCKED_TEXTS.length);
        let newUsers = new Array(MOCKED_USERS.length);
        for (let i = 0; i < MOCKED_USERS.length; i++) {
            const username = MOCKED_USERS[i];
            const newUser = await createUser({
                                                 username,
                                                 password: `${username}abc`,
                                                 email: `${username}@mock.com`});
            const newTuit = await createTuit(newUser.id, {tuit: MOCKED_TEXTS[i]});
            // new user dislikes new tuit
            await userTogglesTuitDislikes(newUser.id, newTuit._id);
            newUsers[i] = newUser;
            newTuits[i] = newTuit;
        }
        axios.get.mockImplementation(() =>
                                         Promise.resolve({data: {tuits: newTuits}}))
        const tuits = await findTuitsUserDisliked(newUsers[newUsers.length-1].id);

        render(
            <HashRouter>
                <Tuits tuits={tuits}/>
            </HashRouter>
        );

        const tuit = screen.getByText(/1/i);
        expect(tuit).toBeInTheDocument();

        // clean up the inserted tuits and users from database
        for (let i = 0; i < newTuits.length; i++) {
            await deleteTuit(newTuits[i]._id);
            await deleteUser(newUsers[i].id);
        }
    })
});