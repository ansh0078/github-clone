import mongoose, { Schema } from "mongoose";

const IssuesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  repositories: {
    type: Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
});

const Issue = mongoose.model("Issue", IssuesSchema);

export { Issue };
