const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  comment: {
     type: String,
      required: true 
    },
  rating: { 
    type: Number,
     required: true, 
     min: 1,
      max: 5 
    },
  createdAt: { 
    type: Date,
     default: Date.now 
    },
});

module.exports = mongoose.model("Comment", CommentSchema);
