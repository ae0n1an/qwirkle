import React from 'react'

type TokenProps = {
  colour: string;
  shape: string;
}

function DisplayToken(props: TokenProps) {
  const { colour, shape } = props;

  return (
    <div className={'shape ' + shape + ' ' + colour}></div>
  )
}

export default DisplayToken