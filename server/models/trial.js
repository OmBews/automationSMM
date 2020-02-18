const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrialSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Trial = mongoose.model("TrialSchema", TrialSchema);
