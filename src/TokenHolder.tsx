import React from "react";
import {useEffect, useState} from 'react';
import { Token } from "./classes/token";
import { Position } from "./classes/position";
import DisplayPosition from "./DisplayPosition";
import { Player } from "./classes/player";
import { Board } from "./classes/board";
import { Game } from "./classes/game";

type TokenHolderProps = {
  player: Player;
  setBoard: React.Dispatch<React.SetStateAction<{board: Board;}>>
  setPlayer: React.Dispatch<React.SetStateAction<{player: Player;}>>
  game: Game;
  playerById: boolean;
  playerId: string
}

function TokenHolder(props: TokenHolderProps) {
  const { player, setBoard, setPlayer, game, playerById, playerId } = props;
  const tokens = player.getTokens()

  const renderedOutput: JSX.Element[] = []

  tokens.forEach((token) => {
    const position = new Position()
    position.placeToken(token)
    const handleClick = () => {
      token.notify();
    };
    renderedOutput.push(<DisplayPosition position={position} highlighted={token === player.getSelectedToken()} playerById={playerById} playerId={playerId} setBoard={setBoard} setPlayer={setPlayer} game = {game} onClick = {handleClick}></DisplayPosition>)
  });

  for (let i = 0; i < tokens.length; i++) { // add tokens to the token holder
    
  }

  const wrapper = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    transition: '300ms',
    margin: '4%'
  };

  return (
    <>
    <div style={wrapper}>
        {renderedOutput}
    </div>
    </>
  );
}

export default TokenHolder