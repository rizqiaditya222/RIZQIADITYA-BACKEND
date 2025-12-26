// models/Statistic.js
const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },

    todayVisit: {
      type: Number,
      default: 0,
    },

    todayComment: {
      type: Number,
      default: 0,
    },

    todayMessage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Statistic", statisticSchema);
