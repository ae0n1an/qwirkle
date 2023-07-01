import React from 'react'
import { Token } from './classes/token';
import CategoryIcon from '@mui/icons-material/Category';

type TokenCountDisplayProps = {
  tokenCount: number;
}

function TokenCountDisplay(props: TokenCountDisplayProps) {
  const { tokenCount } = props;

  return (
    <div className="mdl-list">
        <div className="mdl-list__item">
            <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-icon">category</i>
            <span>Remaining Tokens</span>
            </span>
            <div className="mdl-list__item-secondary-action">{tokenCount}</div>
        </div>
    </div>
  )
}

export default TokenCountDisplay