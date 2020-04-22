const fetch = require("node-fetch");
const {
  GITHUB_API_USERS,
  GITHUB_API_TEAMS } = require('../constants');
const {
  validateUser,
  isUserOnTeam,
  addUserToTeam,
  removeUserFromTeam
} = require('./');
const {
  GITHUB_API_TOKEN
} = require ('../config');

const GITHUB_TEAM_HANDLE = "paola-test-team";
const GITHUB_TEST_USER = "murphpaolatestuser";
const headers = {
  Authorization: `token ${GITHUB_API_TOKEN}`
  }

beforeAll(() => {
  _removeUser();
});

describe('validateUser', () => {
  test('Should return false if invalid github user', async () => {
    const isValid = await validateUser('notarealuser***');
    expect(isValid).toBe(false);
  });

  test('Should return true if valid github user', async () => {
    const isValid = await validateUser(GITHUB_TEST_USER);
    expect(isValid).toBe(true);
  });
})

describe('isUserOnTeam', () => {
  test('Should return false if user is not on team', async () => {
    const userOnTeam = await isUserOnTeam(GITHUB_TEST_USER, GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(false);
  });

  test('Should return true if user is on team', async () => {
    await _addUser();
    const userOnTeam = await isUserOnTeam(GITHUB_TEST_USER, GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(true);
  });
})

describe('addUserToTeam', () => {
  test('Should return 200 status if successful', async () => {
    await _addUser();
    const addedUser = await addUserToTeam(GITHUB_TEST_USER, GITHUB_TEAM_HANDLE);
    expect(addedUser).toBe(true);
  });

  test('Should return 204 status if successful', async () => {
    const removeUser = await removeUserFromTeam(GITHUB_TEST_USER, GITHUB_TEAM_HANDLE);
    expect(removeUser).toBe(true);
  });
})

function _addUser() {
  return fetch(`${GITHUB_API_TEAMS}/${GITHUB_TEAM_HANDLE}/memberships/${GITHUB_TEST_USER}`, { method: "PUT", headers})
}

function _removeUser() {
  return fetch(`${GITHUB_API_TEAMS}/${GITHUB_TEAM_HANDLE}/memberships/${GITHUB_TEST_USER}`, { method: "DELETE", headers})
}
