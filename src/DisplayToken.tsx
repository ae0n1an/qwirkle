import { Token } from './classes/token';

type TokenProps = {
  token: Token;
}

function DisplayToken(props: TokenProps) {
  const { token } = props;

  return (
    <div className={'shape ' + token.getShape() + ' ' + token.getColour()}></div>
  )
}

export default DisplayToken