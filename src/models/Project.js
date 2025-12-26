// models/Project.js
const mongoose = require("mongoose");

const githubRepoSchema = new mongoose.Schema(
  {
    repoName: {
      type: String,
      required: true,
    },
    repoUrl: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    photoUrl: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    githubRepos: {
      type: [githubRepoSchema],
      default: null,
    },

    deploymentUrl: {
      type: String,
      default: null,
    },

    techStack: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
