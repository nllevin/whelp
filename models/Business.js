const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  schedules: [scheduleSchema],
  priceRating: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

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

const Business = mongoose.model('Business', BusinessSchema);
module.exports = Business;