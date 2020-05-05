const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const bible = require("./english-bible.json");
const spanishBible = require("./spanish-bible.json");
const combinedBible = bible.map((x, i) => {
  return [x, spanishBible[i]];
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("app/build"));
}


const changeDailyVerse = (bible) => {
  const bookIndex = Math.floor(Math.random() * bible.length);
  const book = bible[bookIndex];
  const chapterIndex = Math.floor(
    Math.random() * bible[bookIndex].chapters.length
  );
  const chapter = bible[bookIndex].chapters[chapterIndex];
  const line = chapter[Math.floor(Math.random() * chapter.length)];

  // console.log("book", book);
  // console.log("chapter", chapter);
  // console.log("line", line);
  return {
    book: book.name,
    line,
  };
};

const changeDailyChapter = (bible) => {
  const bookIndex = Math.floor(Math.random() * bible.length);
  //   console.log("bookIndex", bookIndex);

  const book = bible[bookIndex][0].name;
  console.log("book", book);
  //   const bookName = book.name;

  //   console.log(bookIndex);
  const chapterIndex = Math.floor(
    Math.random() * bible[bookIndex][0].chapters.length
  );
  //   console.log("chapterIndex", chapterIndex);
  //   console.log("bible[bookIndex][0]", bible[bookIndex][0]);
  const chapter = combinedBible[bookIndex][0].chapters[chapterIndex];
  const spChapter = combinedBible[bookIndex][1].chapters[chapterIndex];
  //   console.log("chapter", chapter);
  //   const spChapter = combinedBible[bookIndex][1].chapters[chapterIndex];
  //   const line = chapter[Math.floor(Math.random() * chapter.length)];
  //   const verse = chapter.join("\n");
  //   console.log("book", book);
  //   console.log("chapter", chapter);
  //   console.log("verse", verse);
  return {
    book,
    chapterNo: chapterIndex + 1,
    chapter,
    spChapter,
  };
};

const data = changeDailyChapter(combinedBible);

require('./routes/api-routes')(app);
app.get("/api", (req, res) => {
  res.json(data);
});

console.log(path.join(__dirname, "./app/build/index.html"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
