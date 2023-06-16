import React from "react";

type PositionProps = {
  tokens: { colour: string; shape: string; }[][];
}

function TokenHolder() {
  return (
    <>
    <div className= 'holder'>
        <div className={'tile ' + shape}>
        <div className={'shape ' + shape + ' ' + colour}></div>
        </div>
    </div>
    </>
  );
}

export default TokenHolder