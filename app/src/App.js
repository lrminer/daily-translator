import React from "react";
import "./App.css";
import axios from "axios";
import Translatable from "./Translatable";

class App extends React.Component {
  state = {
    todaysReading: {
      book: "Genesis",
      chapterNo: 1,
      english: [
        `In the beginning God created the heavens and the earth.`,
        `Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.`,
        `And God said, “Let there be light,” and there was light.`,
        `God saw that the light was good, and he separated the light from the darkness.`,
        `God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day.`,
      ],
      spanish: ["test"],
    },
  };
  componentDidMount() {
    axios.get("/api").then((response) => {
      console.log(response);
      const { chapter, book, spChapter, chapterNo } = response.data;
      this.setState({
        todaysReading: {
          book,
          english: chapter,
          spanish: spChapter,
          chapterNo,
        },
      });
    });
  }
  render() {
    return (
      <>
        <div style={{ margin: 40 }}>
          <h1>Today's Verse:</h1>
          <h2>
            Book: {this.state.todaysReading.book}{" "}
            {this.state.todaysReading.chapterNo}
          </h2>
          {this.state.todaysReading.english.map((item, index) => (
            <Translatable
              key={index}
              english={`${index + 1} ${item}`}
              spanish={`${index + 1} ${
                this.state.todaysReading.spanish[index]
              }`}
            />
          ))}
        </div>
      </>
    );
  }
}

export default App;
