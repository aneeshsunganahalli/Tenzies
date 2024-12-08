import React from 'react';
import Die from '../Components/Die'
import { nanoid } from 'nanoid';
import './App.css'

function App() {

  const [diceState, setDiceState] = React.useState(generateAllNewDice())
  

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
    setDiceState(oldDice => oldDice.map(die => 
      die.isHeld?
      die : {...die, value: Math.ceil(Math.random() * 6)}
    ))
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
        <div className="dice-container">
          {diceElements}
        </div>
        <button onClick={rollDice} className='roll'>
          Roll
        </button>
      </main>
  )
}

export default App
