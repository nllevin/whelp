import React from 'react';
import HeaderNav from '../header_nav/header_nav';
import ReviewIndex from '../review_index/review_index_container';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import dogImage1 from '../../public/dog-image-1.jpg'
import dogImage2 from '../../public/dog-image-2.jpg'
import dogImage3 from '../../public/dog-image-3.jpg'
import dogImage4 from '../../public/dog-image-4.jpg'
import dogImage5 from '../../public/dog-image-5.jpg'
import dogImage6 from '../../public/dog-image-6.jpg'
import dogImage7 from '../../public/dog-image-7.jpg'
import dogImage8 from '../../public/dog-image-8.jpeg'
import dogImage9 from '../../public/dog-image-9.jpg'
import dogImage10 from '../../public/dog-image-10.jpg'
import dogImage11 from '../../public/dog-image-11.jpeg'
import dogImage12 from '../../public/dog-image-12.jpeg'
import dogImage13 from '../../public/dog-image-13.jpg'
import dogImage14 from '../../public/dog-image-14.jpg'
import dogImage15 from '../../public/dog-image-15.jpg'
import dogImage16 from '../../public/dog-image-16.jpg'
import dogImage17 from '../../public/dog-image-17.jpg'
import dogImage18 from '../../public/dog-image-18.jpg'
import dogImage19 from '../../public/dog-image-19.jpg'
import dogImage20 from '../../public/dog-image-20.jpg'
import dogImage21 from '../../public/dog-image-21.jpg'
import dogImage22 from '../../public/dog-image-22.jpg'
import dogImage23 from '../../public/dog-image-23.jpg'
import dogImage24 from '../../public/dog-image-24.png'
import dogImage25 from '../../public/dog-image-25.jpg'
import dogImage26 from '../../public/dog-image-26.jpg'
import dogImage27 from '../../public/dog-image-27.jpg'
import dogImage28 from '../../public/dog-image-28.jpg'
import dogImage29 from '../../public/dog-image-29.jpg'
import dogImage30 from '../../public/dog-image-30.jpg'

import '../reset.css';
import './business_show.css';
import './business_rating.css';
import '../review_index/review_index.css';

class BusinessShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      rating: 0, 
      carouselArray: 
        this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])}
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

  imageSelect(num) {
    switch (num) {
      case 1:
        return dogImage1;
      case 2:
        return dogImage2;
      case 3:
        return dogImage3;
      case 4:
        return dogImage4;
      case 5:
        return dogImage5;
      case 6:
        return dogImage6;
      case 7:
        return dogImage7;
      case 8:
        return dogImage8;
      case 9:
        return dogImage9;
      case 10:
        return dogImage10;
      case 11:
        return dogImage11;
      case 12:
        return dogImage12;
      case 13:
        return dogImage13;
      case 14:
        return dogImage14;
      case 15:
        return dogImage15;
      case 16:
        return dogImage16;
      case 17:
        return dogImage17;
      case 18:
        return dogImage18;
      case 19:
        return dogImage19;
      case 20:
        return dogImage20;
      case 21:
        return dogImage21;
      case 22:
        return dogImage22;
      case 23:
        return dogImage23;
      case 24:
        return dogImage24;
      case 25:
        return dogImage25;
      case 26:
        return dogImage26;
      case 27:
        return dogImage27;
      case 28:
        return dogImage28;
      case 29:
        return dogImage29;
      case 30:
        return dogImage30;
      default:
        return dogImage1
    }
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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
        <Carousel className="business-show-carousel" slidesToShow={4} cellSpacing={2} slidesToScroll={4}>
          {this.state.carouselArray.map(
            num => <img
              key={`carousel-img-${num}`}
              className="business-show-carousel-img"
              src={this.imageSelect(num)} alt="" />
          )}
        </Carousel>
        <div className="business-show-content-container">
          <main className="business-show-content">
            <h1 className="business-show-header">{business.name || ""}</h1>
            <span className="business-show-rating-container">
              <span className={`business-half-stars-${(
                Math.round((this.props.reviews.reduce(
                  (totalRating, currentReview) => /* get total sum of review ratings then divide by length to get average */
                    totalRating + currentReview.rating, 0 /* inital value */)
                  ) / this.props.reviews.length)
                ) * 2}`}>
              </span>
              <span>{this.props.reviews.length} Reviews</span>
            </span>
            <span className="business-show-price-rating">{"$".repeat(business.priceRating)}</span>
            <button></button>
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
                      <span
                        onMouseOut={this.resetRatingToSelected}
                        className={`review-form-half-stars-${(
                          Math.round((this.state.rating) * 2))}`}>
                        <div
                          onClick={() => this.props.history.push(`/login`)}
                          onMouseOver={this.hoverRating(1)}
                          className="review-form-star-select-option"></div>
                        <div
                          onClick={() => this.props.history.push(`/login`)}
                          onMouseOver={this.hoverRating(2)}
                          className="review-form-star-select-option"></div>
                        <div
                          onClick={() => this.props.history.push(`/login`)}
                          onMouseOver={this.hoverRating(3)}
                          className="review-form-star-select-option"></div>
                        <div
                          onClick={() => this.props.history.push(`/login`)}
                          onMouseOver={this.hoverRating(4)}
                          className="review-form-star-select-option"></div>
                        <div
                          onClick={() => this.props.history.push(`/login`)}
                          onMouseOver={this.hoverRating(5)}
                          className="review-form-star-select-option"></div>
                      </span>
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