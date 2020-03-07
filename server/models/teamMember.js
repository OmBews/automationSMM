const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  firstImage: {
    type: String
  },
  secondImage: {
    type: String
  },
  thirdImage: {
    type: String
  },
  followers: {
    type: String
  },
  limitCounter: {
    type: Number,
    default: 0
  }
});

module.exports = TeamMember = mongoose.model(
  "TeamMemberSchema",
  TeamMemberSchema
);
