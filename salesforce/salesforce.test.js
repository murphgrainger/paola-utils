// jest.mock('node-fetch');
// const fetch = require('node-fetch');
// const { Response } = jest.requireActual('node-fetch');

const {
  getStudentsToAdd
} = require('./');

test('getStudentsToAdd: Should do a fake test', async () => {
    // const students = await getStudentsToAdd();
    expect(2).toBe(2);
});
