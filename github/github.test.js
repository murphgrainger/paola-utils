jest.mock('node-fetch');
const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');

const {
  validateUser,
  isUserOnTeam,
  addUserToTeam,
  removeUserFromTeam
} = require('./');

const GITHUB_TEAM_HANDLE = "paola-test-team";

test('validateUser: Should return true if valid github user', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(true, {status:200})));
    const isValid = await validateUser("murphgrainger");
    expect(isValid).toBe(true);
});

test('validateUser: Should return false if invalid github user', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(false, {status:404})));
    const isValid = await validateUser("fas**d2235", GITHUB_TEAM_HANDLE);
    expect(isValid).toBe(false);
});

test('isUserOnTeam: Should return true if user is on team', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(true, {status:200})));
    const userOnTeam = await isUserOnTeam("murphgrainger", GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(true);
});

test('isUserOnTeam: Should return false if user is not on team', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(false, {status:404})));
    const userOnTeam = await isUserOnTeam("fas**d2235", GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(false);
});

test('addUserToTeam: Should return 200 status if successful', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(true, {status:200})));
    const addedUser = await addUserToTeam("murphgrainger", GITHUB_TEAM_HANDLE);
    expect(addedUser).toBe(true);
});

test('removeUserFromTeam: Should return 204 status if successful', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response(true, {status:204})));
    const removeUser = await removeUserFromTeam("murphgrainger", GITHUB_TEAM_HANDLE);
    expect(removeUser).toBe(true);
});
