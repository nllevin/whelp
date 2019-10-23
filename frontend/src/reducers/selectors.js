export const getUserById = (state, userId) => (
  state.entities.users[userId]
);