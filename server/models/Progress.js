const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
  },
  hrApproval: {
    type: String,
  },
  interview: {
    type: String,
  },
  interviewDate: {
    type: String,
  },
  finalResult: {
    type: String, // ✅ New field
    enum: ["Selected", "Rejected"],
  },
}, { timestamps: true }); // (optional) adds createdAt, updatedAt

module.exports = mongoose.model("Progress", progressSchema);
