const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  }
});

const BusinessSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  schedules: [ScheduleSchema],
  priceRating: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

BusinessSchema.index({name: 1, address: 1}, {unique: true});

const Business = mongoose.model('Business', BusinessSchema);
module.exports = Business;