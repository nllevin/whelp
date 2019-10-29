export const getUserById = (state, userId) => (
  state.entities.users[userId]
);

export const getBusinessesSearchResults = state => (
  state.ui.filters.searchResults ? 
    state.ui.filters.searchResults.map(businessId => state.entities.businesses[businessId])
    : []
);