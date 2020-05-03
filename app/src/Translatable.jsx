import React, { useEffect, useState } from "react";

const Translatable = (props) => {
  const [isSpanish, setIsSpanish] = useState(false);

  useEffect(() => {
     console.log('hello God') 
  }, []);

  return (
    <div style={{ marginTop: 10 }} onClick={()=>setIsSpanish(!isSpanish)}>
      {(isSpanish && props.spanish) || props.english}
    </div>
  );
};

export default Translatable;
