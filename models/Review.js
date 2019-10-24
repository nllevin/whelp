const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  authorId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  businessId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ReviewSchema.index({ authorId: 1 });
ReviewSchema.index({ businessId: 1 });
ReviewSchema.index({ authorId: 1, businessId: 1}, { unique: true });

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;