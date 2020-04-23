require('dotenv').config();
const fetch = require('node-fetch');
const { GITHUB_API_TEAMS } = require('../constants');
const {
  validateUser,
  isUserOnTeam,
  addUserToTeam,
  removeUserFromTeam,
} = require('.');

const GITHUB_TEAM_HANDLE = 'paola-test-team';
const GITHUB_TEST_USER = 'murphpaolatestuser';
const GITHUB_INVALID_USER = 'notarealuser***';
const HEADERS = { Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}` };

function addUser() {
  return fetch(`${GITHUB_API_TEAMS}/${GITHUB_TEAM_HANDLE}/memberships/${GITHUB_TEST_USER}`, { method: 'PUT', headers: HEADERS });
}

function removeUser() {
  return fetch(`${GITHUB_API_TEAMS}/${GITHUB_TEAM_HANDLE}/memberships/${GITHUB_TEST_USER}`, { method: 'DELETE', headers: HEADERS });
}

beforeAll(() => {
  removeUser();
});

describe('validateUser', () => {
  test('Should return false if invalid github user', async () => {
    const isValid = await validateUser(GITHUB_INVALID_USER);
    expect(isValid).toBe(false);
  });

  test('Should return true if valid github user', async () => {
    const isValid = await validateUser(GITHUB_TEST_USER);
    expect(isValid).toBe(true);
  });
});

describe('isUserOnTeam', () => {
  test('Should return false if user is not on team', async () => {
    const userOnTeam = await isUserOnTeam(GITHUB_TEST_USER, GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(false);
  });

  test('Should return false if user does not exist', async () => {
    const userOnTeam = await isUserOnTeam(GITHUB_INVALID_USER, GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(false);
  });

  test('Should return true if user is on team', async () => {
    await addUser();
    const userOnTeam = await isUserOnTeam(GITHUB_TEST_USER, GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(true);
  });
});

describe('addUserToTeam', () => {
  test('Should return false if user does not exist', async () => {
    const addedUser = await addUserToTeam(GITHUB_INVALID_USER, GITHUB_TEAM_HANDLE);
    expect(addedUser).toBe(false);
  });

  test('Should return true if successfully added user', async () => {
    await removeUser();
    const addedUser = await addUserToTeam(GITHUB_TEST_USER, GITHUB_TEAM_HANDLE);
    expect(addedUser).toBe(true);
  });
});

describe('removeUserFromTeam', () => {
  test('Should return true if successfully removed user', async () => {
    const removed = await removeUserFromTeam(GITHUB_TEST_USER, GITHUB_TEAM_HANDLE);
    expect(removed).toBe(true);
  });

  test('Should return false if user is invalid', async () => {
    const removed = await removeUserFromTeam(GITHUB_INVALID_USER, GITHUB_TEAM_HANDLE);
    expect(removed).toBe(false);
  });
});
