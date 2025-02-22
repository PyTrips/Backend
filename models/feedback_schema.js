const mongoose = require('mongoose');
const feedback_Schema = new mongoose.Schema({
    username: { type: String, required: true },
    feedback: {  type: String, required: true }
  });
  
  module.exports = mongoose.model('Feedback', feedback_Schema);  
