const mongoose = require("mongoose");
const { Schema } = mongoose;

const whatsappSchema = new Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

module.exports = mongoose.model("messagecontents", whatsappSchema);
