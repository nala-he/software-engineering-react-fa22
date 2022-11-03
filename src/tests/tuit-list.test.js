import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, deleteTuit, findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {createUser, deleteUser} from "../services/users-service";
const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

test('tuit list renders static tuit array', async () => {
  // TODO: implement this
    let newTuits = new Array(MOCKED_TUITS.length);
    let newUsers = new Array(MOCKED_USERS.length);
    for (let i = 0; i < MOCKED_USERS.length; i++) {
        const username = MOCKED_USERS[i];
        const newUser = await createUser({
                           username,
                           password: `${username}123`,
                           email: `${username}@test.com`});
        const newTuit = await createTuit(newUser.id, {tuit: MOCKED_TUITS[i]});
        newUsers[i] = newUser;
        newTuits[i] = newTuit;
    }

    render(
      <HashRouter>
        <Tuits tuits={newTuits}/>
      </HashRouter>);
    const alice = screen.getByText(/alice's tuit/i);
    const bob = screen.getByText(/bob's tuit/i);
    const charlie = screen.getByText(/charlie's tuit/i);

    expect(alice).toBeInTheDocument();
    expect(bob).toBeInTheDocument();
    expect(charlie).toBeInTheDocument();

    // clean up the inserted tuits and users from database
    for (let i = 0; i < newTuits.length; i++) {
        await deleteTuit(newTuits[i]._id);
        await deleteUser(newUsers[i].id);
    }
});

test('tuit list renders async', async () => {
  // TODO: implement this
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/This is my second tuit?/i);
    expect(linkElement).toBeInTheDocument();
});

describe('tuit list renders mocked', () => {
  // TODO: implement this
    beforeAll(() => {
        jest.spyOn(axios, 'get').mockImplementation();
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('tuit list renders mocked', async () => {
        let newTuits = new Array(MOCKED_TUITS.length);
        let newUsers = new Array(MOCKED_USERS.length);
        for (let i = 0; i < MOCKED_USERS.length; i++) {
            const username = MOCKED_USERS[i];
            const newUser = await createUser({
                                                 username,
                                                 password: `${username}abc`,
                                                 email: `${username}@mock.com`});
            const newTuit = await createTuit(newUser.id, {tuit: MOCKED_TUITS[i]});
            newUsers[i] = newUser;
            newTuits[i] = newTuit;
        }
        axios.get.mockImplementation(() =>
            Promise.resolve({data: {tuits: newTuits}}))
        const response = await findAllTuits();
        const tuits = response.tuits;

        render(
            <HashRouter>
                <Tuits tuits={tuits}/>
            </HashRouter>
        );

        const tuit = screen.getByText(/charlie's tuit/i);
        expect(tuit).toBeInTheDocument();

        // clean up the inserted tuits and users from database
        for (let i = 0; i < newTuits.length; i++) {
            await deleteTuit(newTuits[i]._id);
            await deleteUser(newUsers[i].id);
        }
    })
});
