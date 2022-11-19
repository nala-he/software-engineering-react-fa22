import {
    userTogglesTuitLikes,
    userTogglesTuitDislikes,
    userUnlikesTuit, countHowManyLikedTuit, countHowManyDislikedTuit, userUndislikesTuit
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

        // user likes a tuit
        let status = await userTogglesTuitLikes(newUser.id, newTuit._id);
        let likes = await countHowManyLikedTuit(newTuit._id);
        let dislikes = await countHowManyDislikedTuit(newTuit._id);
        // verify that newUser likes a new tuit successfully
        expect(status).toEqual("OK");
        // verify the updated likes and dislikes count
        expect(likes).toEqual(1);
        expect(dislikes).toEqual(0);

        // user likes the same tuit again to unlike
        status = await userTogglesTuitLikes(newUser.id, newTuit._id);
        likes = await countHowManyLikedTuit(newTuit._id);
        dislikes = await countHowManyDislikedTuit(newTuit._id);
        // verify that newUser unlikes a new tuit successfully
        expect(status).toEqual("OK");
        // verify the updated likes and dislikes count
        expect(likes).toEqual(0);
        expect(dislikes).toEqual(0);

        // remove any likes or tuits we created
        await userUnlikesTuit(newUser.id, newTuit._id);
        await deleteTuit(newTuit._id);
    });
});

describe('userTogglesTuitDislikes', () => {
    // sample user and sample tuit
    const sampleUser = {
        username: 'sampleDislike',
        password: 'su132',
        email: 'sampleuser@test.com'
    }
    const sampleTuit = {
        tuit: "This is a sample tuit for disliking."
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

    test('can toggle tuit dislikes status with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(sampleUser);
        const newTuit = await createTuit(newUser.id, sampleTuit);

        // user dislikes a tuit
        let status = await userTogglesTuitDislikes(newUser.id, newTuit._id);
        let dislikes = await countHowManyDislikedTuit(newTuit._id);
        let likes = await countHowManyLikedTuit(newTuit._id);
        // verify that newUser dislikes a new tuit successfully
        expect(status).toEqual("OK");
        // verify the updated likes and dislikes count
        expect(dislikes).toEqual(1);
        expect(likes).toEqual(0);

        // user dislikes the same tuit again to undislike
        status = await userTogglesTuitDislikes(newUser.id, newTuit._id);
        dislikes = await countHowManyDislikedTuit(newTuit._id);
        likes = await countHowManyLikedTuit(newTuit._id);
        // verify that newUser undislikes a new tuit successfully
        expect(status).toEqual("OK");
        // verify the updated likes and dislikes count
        expect(likes).toEqual(0);
        expect(dislikes).toEqual(0);

        // remove any likes or tuits we created
        await userUndislikesTuit(newUser.id, newTuit._id);
        await deleteTuit(newTuit._id);
    });
});