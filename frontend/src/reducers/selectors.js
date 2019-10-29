export const getUserById = (state, userId) => (
  state.entities.users[userId]
);

export const getBusinessesSearchResults = state => (
  state.session.searchResults ? 
    state.session.searchResults.map(businessId => state.entities.businesses[businessId])
    : []
);