import React from 'react';
import HeaderNav from '../header_nav/header_nav';
import ReviewIndex from '../review_index/review_index_container';
import { Link } from 'react-router-dom';

import '../reset.css';
import './business_show.css';
import './business_rating.css';
import '../review_index/review_index.css';

class BusinessShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rating: 0}
    this.resetRatingToSelected = this.resetRatingToSelected.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.match.params.businessId) 
      this.props.fetchBusinessAndReviewsWithAuthors(this.props.match.params.businessId)
        .catch(() => this.props.history.push("/splash"));
  }

  componentDidUpdate(prevProps) {
    if (this._isMounted && this.props.match.params.businessId && prevProps.match.params.businessId !== this.props.match.params.businessId)
      this.props.fetchBusinessAndReviewsWithAuthors(this.props.match.params.businessId)
        .catch(() => this.props.history.push("/splash"));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  hoverRating(rating) {
    return e => {
      e.preventDefault();
      this.setState({ rating: rating })
    }
  }

  resetRatingToSelected() {
    this.setState({ rating: 0 });
  }

  render() {
    const { business, currentUser, currentUserReview } = this.props;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentDay = days[today.getDay()];
    const currentTime = today.getHours() + ":" + today.getMinutes();
    return (
      <div className="business-show-container">
        <HeaderNav />
        <div className="business-show-content-container">
          <main className="business-show-content">
            <h1 className="business-show-header">{business.name || ""}</h1>
            <span className={`business-half-stars-${(
              Math.round((this.props.reviews.reduce(
                (totalRating, currentReview) => /* get total sum of review ratings then divide by length to get average */
                  totalRating + currentReview.rating, 0 /* inital value */)
                ) / this.props.reviews.length)
              ) * 2}`}>
            </span>
            <span className="business-show-price-rating">{"$".repeat(business.priceRating)}</span>
            {/* review highlights */}
            <div className="business-show-location-and-schedule-container">
              <h3 className="business-show-location-and-search-container-header">Location & Hours</h3>
              <div className="business-show-location-and-schedule-content">
                <div className="business-show-location-container">
                  <div className="business-show-location-map">
                    what's a map? it's right there
                  </div>
                  <div className="business-show-location-address">
                    <p>{business.address}</p>
                  </div>
                </div>
                <div className="business-show-schedule-container">
                  <table className="business-show-schedule-list">
                    <tbody>
                    {business.schedules ? business.schedules.map(schedule =>
                      <tr key={`schedule-item-${schedule._id}`} className="business-show-schedule-trst-item">
                        <th className="business-show-schedule-day">{schedule.day.slice(0, 3)}</th>
                        <td className="business-show-schedule-time">{parseInt(schedule.startTime) < 12 ? schedule.startTime + " am" : (parseInt(schedule.startTime.slice(0,2)) - 12) + schedule.startTime.slice(2) + " pm"} - {parseInt(schedule.endTime) < 12 ? schedule.endTime + " am" : (parseInt(schedule.endTime.slice(0,2)) - 12) + schedule.endTime.slice(2) + " pm"}</td>
                        <td className="business-show-schedule-open-now">{currentDay === schedule.day && parseInt(schedule.startTime) < parseInt(currentTime) && parseInt(currentTime) < parseInt(schedule.endTime) ? "Open now" : null}</td>
                      </tr>
                    ) : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="business-show-reviews-container">
              <div className="business-show-review-form-starter">
                {Object.keys(currentUser).length > 0 ?
                <div className="review-form-currentUser">
                  <img className="review-form-currentUser-avatar" src={currentUser.avatarUrl} alt=""></img>
                  <div className="review-form-currentUser-details">
                    <span className="review-form-item-currentUser-name">{currentUser.firstName || ""} {currentUser.lastName || ""}</span>
                    <span className="review-form-currentUser-zipcode">{currentUser.zipCode || ""}</span>
                    {/* add review count later */}
                  </div>
                </div>
                : <i className="review-form-empty-profile"></i>}
                {Object.keys(currentUser).length > 0 ?
                  (Object.keys(currentUserReview).length === 0 ?
                  <div className="review-form-creator">
                    <span
                      onMouseOut={this.resetRatingToSelected}
                      className={`review-form-half-stars-${(
                        Math.round((this.state.rating) * 2))}`}>
                      <div
                        onClick={() => this.props.history.push(`/businesses/${business._id}/review/1`)}
                        onMouseOver={this.hoverRating(1)}
                        className="review-form-star-select-option"></div>
                      <div
                        onClick={() => this.props.history.push(`/businesses/${business._id}/review/2`)}
                        onMouseOver={this.hoverRating(2)}
                        className="review-form-star-select-option"></div>
                      <div
                        onClick={() => this.props.history.push(`/businesses/${business._id}/review/3`)}
                        onMouseOver={this.hoverRating(3)}
                        className="review-form-star-select-option"></div>
                      <div
                        onClick={() => this.props.history.push(`/businesses/${business._id}/review/4`)}
                        onMouseOver={this.hoverRating(4)}
                        className="review-form-star-select-option"></div>
                      <div
                        onClick={() => this.props.history.push(`/businesses/${business._id}/review/5`)}
                        onMouseOver={this.hoverRating(5)}
                        className="review-form-star-select-option"></div>
                    </span>
                    <Link 

                      className="review-creator-link" 
                      to={`/businesses/${business._id}/review/0`}>
                      Start your review of<strong>{business.name}</strong>.
                    </Link>
                  </div>
                    : <div className="review-index-item-content">
                        <div className="review-index-item-rating-and-date">
                          <span className={`half-stars-${(
                            Math.round((currentUserReview.rating) * 2))}`}></span>
                          <span className="review-index-item-date">{currentUserReview.createdAt.slice(0, 10)}</span>
                        </div>
                        <p className="review-index-item-body">{currentUserReview.body}</p>
                        <div className="current-user-review-options">
                        <Link className="current-user-review-edit-link" to={`/businesses/${business._id}/review/edit`}><i className="fas fa-pencil-alt current-user-edit-icon"></i>Edit Review</Link>
                          <button className="current-user-review-delete-button"
                            onClick={() => this.props.deleteReview(currentUserReview._id)}>
                            <i className="far fa-trash-alt current-user-review-delete-icon"></i>
                          </button>
                        </div>
                      </div>)
                  : <div className="review-form-creator">
                      <Link className="review-creator-link" to="/login">Log in to write a review</Link>
                    </div>}
              </div>
              <ReviewIndex />
            </div>
          </main>
          <aside className="business-show-sidebar">
            <ul className="business-show-sidebar-list">
              {business.phoneNumber ? <li><i className="fas fa-phone-alt business-sidebar-phone-icon"></i>{business.phoneNumber}</li> : null}
              {business.address ? <li><i className="fas fa-directions business-sidebar-directions-icon"></i>{business.address}</li> : null}
            </ul>
          </aside>
        </div>
      </div>
    )
  }
}

export default BusinessShow;