import React from 'react';
import HeaderNav from '../header_nav/header_nav';
import { Link } from 'react-router-dom';

import './review_form.css';
import './review_form_rating.css';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentUserReview;
    this.state['selected'] = this.props.currentUserReview.rating;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.selectRating = this.selectRating.bind(this);
    this.resetRatingToSelected = this.resetRatingToSelected.bind(this);
  }

  componentDidMount() {
    this.props.fetchBusinessAndReviewsWithAuthors(this.props.match.params.businessId)
      .then(() => this.setState({
        businessId: this.props.business._id,
        businessName: this.props.business.name
      }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.businessId !== this.props.match.params.businessId)
      this.props.fetchBusinessAndReviewsWithAuthors(this.props.match.params.businessId);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === 'edit') {
      this.props.formAction(this.state._id, this.state).then(() => this.props.history.push(`/businesses/${this.state.businessId}`));
    } else {
      this.props.formAction(this.state).then(() => this.props.history.push(`/businesses/${this.state.businessId}`));
    }
  }

  update(e) {
    this.setState({body: e.target.value})
  }

  ratingMessage(rating) {
    switch (rating) {
      case 1:
        return "Eek! Methinks not."
      case 2:
        return "Meh. I've experienced better."
      case 3:
        return "A-OK."
      case 4:
        return "Yay! I'm a fan."
      case 5:
        return "Woohoo! As good as it gets!"
      default:
        return "Select your rating"
    }
  }

  selectRating(rating) {
    this.setState({selected: rating});
  }

  hoverRating(rating) {
    return e => {
      e.preventDefault();
      this.setState({rating: rating})
    }
  }

  resetRatingToSelected() {
    this.setState({rating: this.state.selected});
  }

  render() {
    const { business, formType } = this.props;

    return (
      <div className="review-form-content-container">
        <HeaderNav />
        <div className="review-form-container">
          <div className="review-form-content">
            <h2 className="review-form-header"><Link to={`/businesses/${business._id}`}>{business.name}</Link></h2>
            <form className="review-form">
              <div className="review-form-rating">
                <span 
                  onMouseOut={this.resetRatingToSelected}
                  className={`review-form-half-stars-${(
                  Math.round((this.state.rating) * 2))}`}>
                    <div 
                      onClick={() => this.selectRating(1)}
                      onMouseOver={this.hoverRating(1)}
                      className="review-form-star-select-option"></div>
                    <div 
                      onClick={() => this.selectRating(2)}
                      onMouseOver={this.hoverRating(2)}
                      className="review-form-star-select-option"></div>
                    <div 
                      onClick={() => this.selectRating(3)}
                      onMouseOver={this.hoverRating(3)}
                      className="review-form-star-select-option"></div>
                    <div 
                      onClick={() => this.selectRating(4)}
                      onMouseOver={this.hoverRating(4)}
                      className="review-form-star-select-option"></div>
                    <div 
                      onClick={() => this.selectRating(5)}
                      onMouseOver={this.hoverRating(5)}
                      className="review-form-star-select-option"></div>
                  </span>
                  <span className="review-form-rating-message">{this.ratingMessage(this.state.rating)}</span>
              </div>
              <textarea 
                className="review-form-textarea" cols="70" rows="10"
                placeholder="Your review helps others learn about great local businesses.&#10;Please don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees."
                value={this.state.body}
                onChange={this.update}></textarea>
            </form>
            <button
              className="review-form-submit-button"
              onClick={this.handleSubmit}>{formType === 'edit' ? "Edit" : "Post"} Review</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewForm;