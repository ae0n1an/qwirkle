import React from 'react'

type PositionProps = {
  colour: string;
  shape: string;
}

function Position(props: PositionProps) {
  const { colour, shape } = props;

  const wrapper = {
    backgroundImage: 'url(./images/' + shape + colour + '.png)'
  };

  return (
    <div className='square'>
      <div className='shape' style={wrapper}></div>
    </div>
  )
}

export default Position