const axios = require("axios");
// const cheerio = require("cheerio");
const mongoose = require("mongoose");

const db = require("../models");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/dailytranslator";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = (app) => {
  app.get("/api/comments", (req, res) => {
    db.Comment.find({}, function (err, data) {
      if (err) res.json(err);
      else res.json(data);
    });
  });

  app.get("/api/comments/:id", (req, res) => {
    const { id } = req.params;
    db.Comment.find({
      _id: id,
    })
      //   .populate("comments")
      .then((dbArticle) => {
        res.json(dbArticle);
      });
  });

  app.post("/api/comments", (req, res) => {
    db.Comment.create(req.body).then((dbComment) => {
      console.log(dbComment);
      res.json();
    });
  });
};
