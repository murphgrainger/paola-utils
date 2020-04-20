const {
  validateUser,
  isUserOnTeam,
  getAllTeamMembers,
  addUserToTeam,
  removeUserFromTeam
} = require('./');

const GITHUB_TEAM_HANDLE = "paola-test-team";

test('validateUser: Should return true if valid github user', async () => {
    const isValid = await validateUser("murphgrainger");
    expect(isValid).toBe(true);
});

test('validateUser: Should return false if invalid github user', async () => {
    const isValid = await validateUser("fas**d2235", GITHUB_TEAM_HANDLE);
    expect(isValid).toBe(false);
});

test('isUserOnTeam: Should return true if user is on team', async () => {
    const userOnTeam = await isUserOnTeam("murphgrainger", GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(true);
});

test('isUserOnTeam: Should return false if user is not on team', async () => {
    const userOnTeam = await isUserOnTeam("fas**d2235", GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(false);
});

test('getAllTeamMembers: Should return true if user is on team', async () => {
    const userOnTeam = await getAllTeamMembers("murphgrainger", GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(true);
});

test('getAllTeamMembers: Should return false if user is not on team', async () => {
    const userOnTeam = await getAllTeamMembers("fas**d2235", GITHUB_TEAM_HANDLE);
    expect(userOnTeam).toBe(false);
});

test('addUserToTeam: Should return 200 status if successful', async () => {
    const addedUser = await addUserToTeam("murphgrainger", GITHUB_TEAM_HANDLE);
    expect(addedUser).toBe(200);
});
