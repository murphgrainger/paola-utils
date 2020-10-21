require('dotenv').config();
const fetch = require('node-fetch');
const { GITHUB_API_TEAMS } = require('../constants');
const {
  validateUser,
  isUserOnTeam,
  addUserToTeam,
  removeUserFromTeam,
  addUsersToTeam,
  removeUsersFromTeam,
  getPullRequestsbyRepo,
  getPullRequestsbyUser,
  createTeam,
} = require('.');

const GITHUB_TEAM_USERNAME = 'paola-test-team';
const GITHUB_TEST_USER = 'murphpaolatestuser';
const GITHUB_INVALID_USER = 'notarealuser***';
const GITHUB_INVALID_REPO = '***not a real repo***';
const GITHUB_TEST_REPO = 'seip2006-testbuilder';
const GITHUB_TEST_BRANCH = 'master';
const HEADERS = { Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}` };

const addUser = async () => {
  await fetch(
    `${GITHUB_API_TEAMS}/${GITHUB_TEAM_USERNAME}/memberships/${GITHUB_TEST_USER}`,
    { method: 'PUT', headers: HEADERS },
  );
};

const removeUser = async () => {
  await fetch(
    `${GITHUB_API_TEAMS}/${GITHUB_TEAM_USERNAME}/memberships/${GITHUB_TEST_USER}`,
    { method: 'DELETE', headers: HEADERS },
  );
};

beforeAll(() => {
  removeUser();
});

describe('validateUser', () => {
  test('Should return true if valid github user', async () => {
    const isValid = await validateUser(GITHUB_TEST_USER);
    expect(isValid).toBe(true);
  });

  test('Should return false if invalid github user', async () => {
    const isValid = await validateUser(GITHUB_INVALID_USER);
    expect(isValid).toBe(false);
  });
});

describe('isUserOnTeam', () => {
  test('Should return true if user is on team', async () => {
    await addUser();
    const userOnTeam = await isUserOnTeam(GITHUB_TEST_USER, GITHUB_TEAM_USERNAME);
    expect(userOnTeam).toBe(true);
  });

  test('Should return false if user is not on team', async () => {
    await removeUser();
    const userOnTeam = await isUserOnTeam(GITHUB_TEST_USER, GITHUB_TEAM_USERNAME);
    expect(userOnTeam).toBe(false);
  });

  test('Should return false if user does not exist', async () => {
    const userOnTeam = await isUserOnTeam(GITHUB_INVALID_USER, GITHUB_TEAM_USERNAME);
    expect(userOnTeam).toBe(false);
  });
});

describe('addUserToTeam', () => {
  test('Should return true if successfully added user', async () => {
    await removeUser();
    const addedUser = await addUserToTeam(GITHUB_TEST_USER, GITHUB_TEAM_USERNAME);
    expect(addedUser).toBe(true);
  });
  test('Should return false if user does not exist', async () => {
    const addedUser = await addUserToTeam(GITHUB_INVALID_USER, GITHUB_TEAM_USERNAME);
    expect(addedUser).toBe(false);
  });
});

describe('removeUserFromTeam', () => {
  test('Should return true if successfully removed user', async () => {
    const removedUser = await removeUserFromTeam(GITHUB_TEST_USER, GITHUB_TEAM_USERNAME);
    expect(removedUser).toBe(true);
  });

  test('Should return false if user is invalid', async () => {
    const removedUser = await removeUserFromTeam(GITHUB_INVALID_USER, GITHUB_TEAM_USERNAME);
    expect(removedUser).toBe(false);
  });
});

describe('addUsersToTeam', () => {
  test('Should return true if all GitHub users are successfully added to the GitHub team', async () => {
    const usersWereAdded = await addUsersToTeam(['anthonypecchillo', 'murphgrainger'], GITHUB_TEAM_USERNAME);
    expect(usersWereAdded).toBe(true);
  });

  test('Should return an error if at least one user could not be added', async () => {
    const usersWereAdded = await addUsersToTeam(['anthonypecchillo', 'murphgrainger***'], GITHUB_TEAM_USERNAME);
    expect(usersWereAdded).toContain('Error adding');
  });
});

describe('removeUsersFromTeam', () => {
  test('Should return true if all GitHub users are successfully removed from the GitHub team', async () => {
    const usersWereRemoved = await removeUsersFromTeam(['anthonypecchillo', 'murphgrainger'], GITHUB_TEAM_USERNAME);
    expect(usersWereRemoved).toBe(true);
  });

  test('Should return an error if at least one user could not be removed', async () => {
    const usersWereRemoved = await removeUsersFromTeam(['anthonypecchillo', 'murphgrainger***'], GITHUB_TEAM_USERNAME);
    expect(usersWereRemoved).toContain('Error removing');
  });
});

describe('getPullRequestsbyRepo', () => {
  test('Should return an array of pull requests if successful', async () => {
    const pullRequests = await getPullRequestsbyRepo(GITHUB_TEST_REPO);
    expect(pullRequests).toHaveLength(30);
    expect(pullRequests[0]).toHaveProperty('user');
    expect(pullRequests[0]).toHaveProperty('created_at');
  });

  test('Should return a Not Found error if repo cannot be found', async () => {
    const pullRequests = await getPullRequestsbyRepo(GITHUB_INVALID_REPO);
    expect(pullRequests).toBe('Not Found');
  });
});

describe('getPullRequestsbyUser', () => {
  test('Should return an array of pull requests if successful', async () => {
    const pullRequests = await getPullRequestsbyUser(
      'paola-utils', 'murphgrainger', GITHUB_TEST_BRANCH,
    );
    expect(pullRequests).toHaveLength(1);
    expect(pullRequests[0]).toHaveProperty('user');
    expect(pullRequests[0].user).toHaveProperty('login');
    expect(pullRequests[0].user.login).toBe('murphgrainger');
  });

  test('Should return a Not Found error if repo cannot be found', async () => {
    const pullRequests = await getPullRequestsbyUser(
      GITHUB_INVALID_REPO, GITHUB_TEST_USER, GITHUB_TEST_BRANCH,
    );
    expect(pullRequests).toBe('Not Found');
  });

  test('Should return an empty array if no pull requests found for user for branch', async () => {
    const pullRequests = await getPullRequestsbyUser(
      GITHUB_TEST_REPO,
      GITHUB_INVALID_USER,
      GITHUB_TEST_BRANCH,
    );
    expect(pullRequests).toHaveLength(0);
  });
});

describe('createTeam', () => {
  test('Should return true if GitHub team was successfully created', async () => {
    const createdTeam = await createTeam('paola-test-team');
    expect(createdTeam).toBe(true);
  });

  test('Should return an error if GitHub team already exists', async () => {
    const createdTeam = await createTeam('paola-test-team');
    expect(createdTeam).toContain('Name must be unique for this org');
  });
});
