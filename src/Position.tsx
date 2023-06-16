import React from 'react'

type PositionProps = {
  colour: string;
  shape: string;
}

function Position(props: PositionProps) {
  const { colour, shape } = props;

  return (
    <div className={'tile ' + shape}>
      <div className={'shape ' + shape + ' ' + colour}></div>
    </div>
  )
}

export default Position