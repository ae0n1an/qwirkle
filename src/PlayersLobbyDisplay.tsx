import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface IApplicationProps {
    players: {
        id: string,
        name: string,
        avatar: string
    }[];
    isHost: boolean
}

const PlayersLobbyDisplay: React.FunctionComponent<IApplicationProps> = (props) => {
    const { players, isHost } = props;

    const renderedOutput: JSX.Element[] = []

    const handleKickClick = () => {
        // Create a temporary textarea to copy the text
        console.log("kick")
      };

    players.forEach((player, index) => {
        renderedOutput.push(<div className="mdl-list__item" key={index}>
        <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">person</i>
            <span>{player.name}</span>
        </span>
        {index === 0 ? <div className="mdl-list__item-secondary-action">Host</div> : 
            (isHost ? <div className="mdl-list__item-secondary-action"><button title="Kick" className="mdl-button mdl-js-button mdl-button--icon" onClick={handleKickClick}><CloseIcon/></button></div> : <></>)}
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