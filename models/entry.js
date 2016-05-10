var mongoose = require("mongoose");

var entrySchema = new mongoose.Schema({
  title: {type: String},
  date: {type: String},
  content: {type: String},
  userId: {type: String, required: true}
}, {timestamps: {created_at: "created_at"}});

module.exports = mongoose.model("Entry", entrySchema);
