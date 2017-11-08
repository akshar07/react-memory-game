import React,{Component} from 'react'
import {GameBoard} from './GameBoard'
import {Stopwatch} from './timer'
let seriesArray = 'got, suits, hoc, stranger, lost, daredevil, house, ww, avatar, thatshow, sg, dexter, sherlock, bones, narcos, flash, gotham, spartacus'
const arrCopy = seriesArray.slice()

seriesArray = seriesArray.toLowerCase().split(', ')

export class Game extends Component{
    constructor(props) {
		super(props);
		this.restart = this.restart.bind(this);
		this.resetTime = null;

		this.checkMatch = this.checkMatch.bind(this);

        this.state = this.initialState();
        this.changeDifficulty=this.changeDifficulty.bind(this)
    }
    initialState() {
        let difficultyLevel=8;
		return {
            difficulty:difficultyLevel,
			deck: this.shuffleDeck(difficultyLevel),
			pairs: [],
            moves: 0,
			selected: [],
            endMsg:  '',
           
		};
    }
    clickHandler(cardId) {
        
        if(this.state.moves>1){
            this.refs.timer.handleStartClick()
        }
		//  early return in case cards been selected this round or the timer is 'on'
		if(this.state.selected.includes(cardId) || this.resetTime) {
			return;
		}
      
		if(this.state.selected.length >= 1) {
			this.resetTime = setTimeout(() => {
				this.checkMatch();
			}, 500);
		}

		this.state.selected.push(cardId)

    // console.log(cid, 'PROPS', this.state.selected);
		this.setState({
			selected: this.state.selected
		})
    }
    changeDifficulty(n){
        this.restart();
        // difficulty=n;
        this.setState({
            deck:this.shuffleDeck(n),
            difficulty:n
        })
      console.log(this.state)
       
    }
    checkMatch() {
		let moves = this.state.moves;
		let pairs = this.state.pairs;

		const matchSelected = this.state.selected.map((id) => {
			return this.state.deck[id];
		});

		if(matchSelected[0] === matchSelected[1]) {
			pairs = pairs.concat(this.state.selected);
		}

		this.setState({
			selected: [],
			moves,
			pairs
		});

		this.resetTime = null;
        console.log(this.state.pairs.length)
		if(this.state.pairs.length === this.state.difficulty*2) {
			this.setState({
				endMsg: 'You win !!!!'
			});
            alert("You Win. Game will restart in 5 seconds")
			const newGame = setTimeout(() => {
				this.restart();
			}, 5000);
		}
    }
 
    render () {
        let difficulty="easy";
        if(this.state.difficulty==8){
            difficulty="easy"
        }
        else if(this.state.difficulty==18){
            difficulty="hard"
        }
        const gameboard = <GameBoard difficultyLevel={difficulty}
                                     deck={this.state.deck} 
                                     clickHandler={this.clickHandler.bind(this)} 
                                     selected={this.state.selected}
                                     pairs={this.state.pairs} />
          return (
                <div>
                    <div className='endMsg'>{ this.state.endMsg }</div>
                   
                    <div className="difficulty">
                    <label> Diffficulty Level:</label>
                        <a onClick={this.changeDifficulty.bind(this,8)} 
                           className={difficulty=='easy'?'active':''}>Easy</a>
                        <a onClick={this.changeDifficulty.bind(this,18)}
                           className={difficulty=='hard'?'active':''}>Hard</a>
                       <Stopwatch ref={instance => { this.child = instance; }}/>
                    </div>
                    <div className='score'>
                        <span>{this.state.pairs.length / 2}</span>
                    </div>

                    {gameboard}
                </div>
            );
      }
   
    pickCards(n){
       
        const deck = [];
		let seriesCopy = seriesArray.slice();
        let i = 0;
        while (i < n) {
		    let j = 0;
			const randomNumber = this.randomNumber(seriesCopy);
            const newCard = seriesCopy.splice(randomNumber, 1)[0];

		    while (j < 2) {
                deck.push(newCard);
				j++;
            }
		i++;
        }
		return deck;
    }
    shuffleDeck(n) {
     
        let deck = this.pickCards(n);
    
        for(let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const tempVal = deck[i];
          deck[i] = deck[j];
          deck[j] = tempVal;
        }
        return deck;
      }
      randomNumber(arr) {
		const ourArray = arr;
		const min = 0;
		const max = ourArray.length - 1;  //  using length of our array so we never get a number out of range
		return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    restart() {
        this.child.handleResetClick();
        this.child.handleStartClick();
		this.setState(this.initialState());
	}
}
export default Game