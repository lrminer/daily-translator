const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
require("dotenv").config();
const bible = require("./english-bible.json");
// console.log(bible);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;
const changeDailyVerse = (bible) => {
  const bookIndex = Math.floor(Math.random() * bible.length);
  const book = bible[bookIndex];
  const chapterIndex = Math.floor(
    Math.random() * bible[bookIndex].chapters.length
  );
  const chapter = bible[bookIndex].chapters[chapterIndex];
  const line = chapter[Math.floor(Math.random() * chapter.length)];

  console.log("book", book);
  console.log("chapter", chapter);
  console.log("line", line);
  return {
    book: book.name,
    line,
  };
};

const changeDailyChapter = (bible) => {
  const bookIndex = Math.floor(Math.random() * bible.length);
  const book = bible[bookIndex];
  const chapterIndex = Math.floor(
    Math.random() * bible[bookIndex].chapters.length
  );
  const chapter = bible[bookIndex].chapters[chapterIndex];
  //   const line = chapter[Math.floor(Math.random() * chapter.length)];
  //   const verse = chapter.join("\n");
  //   console.log("book", book);
  //   console.log("chapter", chapter);
  //   console.log("verse", verse);
  return {
    book: book.name,
    chapter,
  };
};

// const data = changeDailyVerse(bible);
const data = changeDailyChapter(bible);

app.get("/api", (req, res) => {
  //   axios.get("dictionaryURL", req.body).then((data) => {
  res.json(data);
  //   });
});

console.log(path.join(__dirname, "./app/build/index.html"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./app/build/index.html"));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
