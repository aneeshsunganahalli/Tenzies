import React from 'react';
import Die from '../Components/Die'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import './App.css'

function App() {

  const [diceState, setDiceState] = React.useState(() => generateAllNewDice())

  const gameWon = diceState.every(die => die.isHeld) && diceState.every(die => die.value === diceState[0].value)

  function generateAllNewDice() {
    const numberArray = [];
    for(let i=0;i<10;i++){
      let randomNumber = Math.floor(Math.random() * 6) + 1;
      numberArray.push({
        value: randomNumber, 
        isHeld: false,
        id: nanoid()
      })
    }
    return numberArray;
  }

  function rollDice(){
    if(!gameWon){
    setDiceState(oldDice => oldDice.map(die => 
      die.isHeld?
      die : {...die, value: Math.ceil(Math.random() * 6)}
    ))
  }
    else {
      setDiceState(generateAllNewDice());
    }
  }


  function hold(id){
      setDiceState(oldDice => oldDice.map(die => 
       die.id === id?
        {...die, isHeld: !die.isHeld} : die
      )
    )
  }

  const diceElements = diceState.map(dieObj => 
  <Die 
    key={dieObj.id} 
    value={dieObj.value} 
    isHeld={dieObj.isHeld} 
    hold={() => hold(dieObj.id)} 
    id={dieObj.id}
  />)

  return (
      <main>
        {gameWon && <Confetti />}
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button onClick={rollDice} className='roll'>
          {gameWon? "New Game" : "Roll"}
        </button>
      </main>
  )
}

export default App
