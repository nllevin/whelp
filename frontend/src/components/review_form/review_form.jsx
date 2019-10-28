import React from 'react';
import HeaderNav from '../header_nav/header_nav';
import { Link } from 'react-router-dom';

import './review_form.css';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentUserReview;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
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

  render() {
    const { business } = this.props;
    return (
      <div className="review-form-content-container">
        <HeaderNav />
        <div className="review-form-container">
          <div className="review-form-content">
            <h2 className="review-form-header"><Link to={`/businesses/${business._id}`}>{business.name}</Link></h2>
            <form className="review-form">
              <span>Select your rating</span>
              <textarea 
                className="review-form-textarea" cols="70" rows="10"
                placeholder="Your review helps others learn about great local businesses.
                  Please don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees."
                value={this.state.body}
                onChange={this.update}></textarea>
            </form>
            <button
              className="review-form-submit-button"
              onClick={this.handleSubmit}>Post Review</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewForm;