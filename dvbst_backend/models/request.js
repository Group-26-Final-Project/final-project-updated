const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    candidateId: {
      type: String,
      ref: "Candidate",
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["COMPLAINT", "WITHDRAWAL"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);
