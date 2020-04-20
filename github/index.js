const fetch = require("node-fetch");
const { GITHUB_API_USERS, GITHUB_API_TEAMS } = require('../constants');
const { GITHUB_API_TOKEN, GITHUB_USERNAME } = require('../config');

// ------------------------------
// GitHub API Integrations
// ------------------------------

const headers = {
  Authorization: `token ${GITHUB_API_TOKEN}`
  }

// Validate a github handle (verify it exists) - return boolean
exports.validateUser = async (handle) => {
  try {
    const response = await fetch(`${GITHUB_API_USERS}/${handle}`, headers);
    const res = await response;
    return res.status === 200;
  }
  catch (error) {
    return error;
  }
};

// Determine if handle is member of provided team (one version)
exports.isUserOnTeam = async (handle, team) => {
  try {
    const response = await fetch(`${GITHUB_API_TEAMS}/${team}/memberships/${handle}`, headers)
    const res = await response.json();
    return res.state === "active" || res.state === "pending";
  }
  catch (error) {
    return error;
  }
};

// Add a github handle to a github team
exports.addUserToTeam =  async (handle, team) => {
  try {
    const response = await fetch(`${GITHUB_API_TEAMS}/${team}/memberships/${handle}`, { method: "PUT", headers})
    return response.status;
  }
  catch (error) {
    return error;
  }
};

// Delete a handle from a team
exports.removeUserFromTeam = async (handle, team) => {
  try {
    const response = await fetch(`${GITHUB_API_TEAMS}/${team}/memberships/${handle}`, { method: "DELETE", headers})
    return response.status;
  }
  catch (error) {
    return error;
  }
};

// Optional: Create a new GitHub account
exports.createNewUser = async () => {
  // While you can add users to an organization you've created, you can't create personal user accounts on behalf of another person.
};
