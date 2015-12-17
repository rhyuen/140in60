var mongoose = require("mongoose");

var entrySchema = new mongoose.Schema({
  title: {type: String},
  date: {type: String},
  content: {type: String}
});

module.exports = mongoose.model("Entry", entrySchema);
