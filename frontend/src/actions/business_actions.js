import * as APIBusinessUtil from '../util/business_api_util';

export const RECEIVE_BUSINESSES_SEARCH = "RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS_AND_REVIEWS = "RECEIVE_BUSINESS_AND_REVIEWS";

const receiveBusinessesSearch = data => ({
  type: RECEIVE_BUSINESSES_SEARCH,
  businesses: data.businesses,
  reviews: data.reviews,
  searchResultIds: data.searchResultIds
});

const receiveBusinessAndReviews = data => ({
  type: RECEIVE_BUSINESS_AND_REVIEWS,
  business: data.business,
  reviews: data.reviews
});

export const searchBusinesses = searchParams => dispatch => (
  APIBusinessUtil.searchBusinesses(searchParams)
    .then(res => dispatch(receiveBusinessesSearch(res.data)))
);

export const fetchBusinessAndReviews = businessId => dispatch => (
  APIBusinessUtil.fetchBusinessAndReviews(businessId)
    .then(res => dispatch(receiveBusinessAndReviews(res.data)))
);