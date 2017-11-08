import React from 'react';
import {Card} from './Card';

export const GameBoard=(props)=>{
    return (
        <div id='gameBoard' className={props.difficultyLevel}> {
                      props.deck.map((card, i) => {
                          return (
                              <Card
                                  className={card}
                                  handleClick={props.clickHandler.bind(this, i)}
                                  index={i}
                                  id={i}
                                  isSelected={props.selected.includes(i)}
                                  key={i}
                                  didMatch={props.pairs.includes(i)}
                              />
                          )
                      }, this)
                  }
              </div>
          )
}

export default GameBoard