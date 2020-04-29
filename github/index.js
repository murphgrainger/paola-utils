const fetch = require('node-fetch');
const { GITHUB_API_USERS, GITHUB_API_TEAMS } = require('../constants');

// ------------------------------
// GitHub API Integrations
// ------------------------------

const headers = { Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}` };

// Validate a github username (verify it exists) - return boolean
exports.validateUser = async (username) => {
  try {
    const response = await fetch(
      `${GITHUB_API_USERS}/${username}`,
      { headers },
    );
    return response.status === 200;
  } catch (error) {
    return error;
  }
};

// Determine if username is member of provided team (one version)
exports.isUserOnTeam = async (username, team) => {
  try {
    const response = await fetch(
      `${GITHUB_API_TEAMS}/${team}/memberships/${username}`,
      { headers },
    );
    return response.status === 200;
  } catch (error) {
    return error;
  }
};

// Add a github username to a github team
exports.addUserToTeam = async (username, team) => {
  try {
    const response = await fetch(
      `${GITHUB_API_TEAMS}/${team}/memberships/${username}`,
      { method: 'PUT', headers },
    );
    return response.status === 200;
  } catch (error) {
    return error;
  }
};

// Delete a username from a team
exports.removeUserFromTeam = async (username, team) => {
  try {
    const response = await fetch(
      `${GITHUB_API_TEAMS}/${team}/memberships/${username}`,
      { method: 'DELETE', headers },
    );
    return response.status === 204;
  } catch (error) {
    return error;
  }
};
