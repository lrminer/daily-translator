import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const initialState = { isSpanish: false, sliding: false, dir: "ENGLISH" };
const Translatable = (props) => {
  // const [isSpanish, setIsSpanish] = useState(initialState.isSpanish);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const slide = (dir) => {
    dispatch({ type: dir, isSpanish: "SPANISH" });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 50);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide("ENGLISH"),
    onSwipedRight: () => slide("SPANISH"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // useEffect(() => {}, []);

  return (
    <div
      {...handlers}
      style={{ marginTop: 10 }}
      // onClick={() => setIsSpanish(!isSpanish)}
    >
      {(state.isSpanish && props.spanish) || props.english}
    </div>
  );
};

function reducer(state, { type, language }) {
  switch (type) {
    case "reset":
      return initialState;
    case "ENGLISH":
      return {
        ...state,
        dir: "ENGLISH",
        sliding: true,
        isSpanish: false,
      };
    case "SPANISH":
      return {
        ...state,
        dir: "SPANISH",
        sliding: true,
        isSpanish: true,
      };
    case "stopSliding":
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default Translatable;
