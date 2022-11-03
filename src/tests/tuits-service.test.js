import { findAllTuits, findTuitById, findTuitByUser, createTuit, deleteTuit }
    from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // TODO: implement this
    // sample user and tuit to insert
    const sampleUser = {
        username: 'sampleUser',
        password: 'su132',
        email: 'sampleuser@test.com'
    }
    const sampleTuit = {
        tuit: "This is a sample tuit."
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all data to make sure we create it in the test
        return deleteUsersByUsername(sampleUser.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(sampleUser.username);
    });

    test('can create tuit with REST API', async () => {
        // insert new user and their tuit in the database
        const newUser = await createUser(sampleUser);
        const newTuit = await createTuit(newUser.id, sampleTuit);

        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser.id);

        // remove any tuit we created
        await deleteTuit(newTuit._id);
    })
});

describe('can delete tuit with REST API', () => {
  // TODO: implement this
    // sample user and tuit to delete
    const sampleUser = {
        username: 'sampleDelete',
        password: 'su132',
        email: 'sampleuser@test.com'
    }
    const sampleTuit = {
        tuit: "This is a sample tuit for deleting."
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all data to make sure we create it in the test
        return deleteUsersByUsername(sampleUser.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(sampleUser.username);
    });

    test('can delete tuit with REST API', async () => {
        // insert new user and their tuit in the database
        const newUser = await createUser(sampleUser);
        const newTuit = await createTuit(newUser.id, sampleTuit);
        const status = await deleteTuit(newTuit._id);

        // verify we deleted the tuit by its id
        expect(status.deletedCount).toEqual(1);
    });

});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    // sample user and tuit to delete
    const sampleUser = {
        username: 'sampleRetrieve',
        password: 'su132',
        email: 'sampleuser@test.com'
    }
    const sampleTuit = {
        tuit: "This is a sample tuit for retrieving."
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all data to make sure we create it in the test
        return deleteUsersByUsername(sampleUser.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(sampleUser.username);
    });

    test('can retrieve a tuit by their primary key with REST API', async () => {
       // insert the user and tuit in the database
       const newUser = await createUser(sampleUser);
       const newTuit = await createTuit(newUser.id, sampleTuit);

       // verify new tuit matches the parameter tuit
       expect(newTuit.tuit).toEqual(sampleTuit.tuit);
       expect(newTuit.postedBy).toEqual(newUser.id);

       // retrieve the tuit from the database by its primary key
       const existingTuit = await findTuitById(newTuit._id);

       // verify retrieved tuit matches parameter tuit
       expect(existingTuit.tuit).toEqual(sampleTuit.tuit);
       expect(existingTuit.postedBy).toEqual(newUser.id);

       // remove any tuit we created
       await deleteTuit(newTuit._id);
    });
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
    const sampleUser = {
        username: 'sampleAll',
        password: 'su132',
        email: 'sampleuser@test.com'
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all data to make sure we create it in the test
        return deleteUsersByUsername(sampleUser.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(sampleUser.username);
    });

    test(`can retrieve all tuits with REST API`, async () => {
        // add user and their tuits to the database
        const newUser = await createUser(sampleUser);
        const texts = ["retrieve tuit one", "retrieve tuit two", "retrieve tuit three"];

        // create multiple tuits by a new user
        texts.map(
            text => createTuit(newUser.id, {tuit: text})
        );

        // retrieve all newly inserted tuits
        const tuitsRetrieved = await findAllTuits();

        // there should be a minimum number of tutis
        expect(tuitsRetrieved.length).toBeGreaterThanOrEqual(texts.length);

        // check each tuit we inserted
        const tuitsInserted = tuitsRetrieved.filter(tuit => texts.indexOf(tuit.tuit) >= 0);

        // compare the actual tuits in database with the ones we sent
        tuitsInserted.forEach(eachTuit => {
            const text = texts.find(text => text === eachTuit.tuit);
            expect(eachTuit.tuit).toEqual(text);
        });

        // remove all added tuits from database
        await Promise.all(tuitsInserted.map(async (tuit) => {
            return await deleteTuit(tuit._id);
        }))
    })
});