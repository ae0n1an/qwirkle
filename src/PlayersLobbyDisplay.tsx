import React, { useContext } from 'react';
import { Player } from './classes/player';
import CategoryIcon from '@mui/icons-material/Category';
import DisplayPlayer from './DisplayPlayer';

export interface IApplicationProps {
    players: {nickname: string, avatar: string}[];
}

const PlayersLobbyDisplay: React.FunctionComponent<IApplicationProps> = (props) => {
    const { players } = props;

    const renderedOutput: JSX.Element[] = []

    players.forEach((player) => {
        renderedOutput.push(<div className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">person</i>
            <span>{player.nickname}</span>
        </span>
        <div className="mdl-list__item-secondary-action">{player.nickname}</div>
    </div>)
    });

    return (
        <>
            <div className="mdl-list">
                {renderedOutput}
            </div>
        </>
    );
};

export default PlayersLobbyDisplay;