export const getUserById = (state, userId) => (
  state.entities.users[userId]
);

export const getBusinessesSearchResults = state => (
  state.session.searchResultIds.map(ids => {
    const businessId = ids.businessId;
    return state.entities.businesses[businessId];
  })
);