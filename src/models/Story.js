// models/Story.js
const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    photoUrl: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: false,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    expiredAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

storySchema.pre("save", function (next) {
  if (!this.expiredAt) {
    this.expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model("Story", storySchema);
