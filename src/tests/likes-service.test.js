import {
    userTogglesTuitLikes,
    userTogglesTuitDislikes,
    userUnlikesTuit, countHowManyLikedTuit
} from "../services/likes-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuit} from "../services/tuits-service";

describe('userTogglesTuitLikes', () => {
    // sample user and sample tuit
    const sampleUser = {
        username: 'sampleLike',
        password: 'su132',
        email: 'sampleuser@test.com'
    }
    const sampleTuit = {
        tuit: "This is a sample tuit for liking."
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(sampleUser.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(sampleUser.username);
    })

    test('can toggle tuit likes status with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(sampleUser);
        const newTuit = await createTuit(newUser.id, sampleTuit);

        const status = await userTogglesTuitLikes(newUser.id, newTuit._id);
        // const likes = await countHowManyLikedTuit(newUser.id, newTuit._id);
        // verify that newUser likes the tuit successfully
        expect(status).toEqual("OK");
        // expect(likes).toEqual(1);

        // remove any likes or tuits we created
        await userUnlikesTuit(newUser.id, newTuit._id);
        await deleteTuit(newTuit._id);
    });
});