import React from 'react';
import HeaderNav from '../header_nav/header_nav';
import ReviewIndex from '../review_index/review_index_container';
import { Link } from 'react-router-dom';

import '../reset.css';
import './business_show.css';
import './business_rating.css';

class BusinessShow extends React.Component {
  componentDidMount() {
    this.props.fetchBusinessAndReviewsWithAuthors(this.props.match.params.businessId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.businessId !== this.props.match.params.businessId)
      this.props.fetchBusinessAndReviewsWithAuthors(this.props.match.params.businessId);
  }

  render() {
    const { business } = this.props;
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
                <Link to={`/businesses/${business._id}/review`}>Start your review of<strong>{business.name}</strong></Link>
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