const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    subTitle: { type: String },
    image: { type: String, required: true },
    content: { type: String, required: true },
    tags: {
      type: [String],
      default: [],
      index: true,
      set: (tags) => tags.map((tag) => tag.toLowerCase().trim()),
    },

    metaTitle: { type: String, maxlength: 90 },
    metaDescription: { type: String, maxlength: 160 },
    metaKeywords: { type: [String], default: [] },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    contentType: {
      type: String,
      default: "BlogPosting",
      enum: ["Article", "BlogPosting", "NewsArticle", "TechArticle"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorDisplayName: {
      type: String,
      default: "Editor",
    },
    canonicalUrl: {
      type: String,
      validate: {
        validator: function (v) {
          if (!v || v.trim() === "") return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    isPopular: {
      type: Boolean,
      default: false,
      index: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    readingTime: {
      type: Number,
      default: 0,
    },
    faqs: [
      {
        question: { type: String, maxlength: 200 },
        answer: { type: String, maxlength: 500 },
      },
    ],

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
