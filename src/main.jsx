import { Die, generateAllNewDice, getRandomInt } from './die.jsx'
import ConfettiEffect from './confetti.jsx'
import { useState, useRef, useEffect } from 'react';
import Timer from './timer.jsx';
import './App.css'
import { nanoid } from 'nanoid';
import { preconnect } from 'react-dom';


export default function Main (){
  const [diceRoll,setDiceRoll] = useState(() => generateAllNewDice(10))
  const [rollCount,setRollCount] = useState(0)
  const buttonRef = useRef(null)
  const [timer,setTimer] = useState(0)
  const intervalRef = useRef(null)

  const gameWon = diceRoll.every(die => die.isHeld) && diceRoll.every(die => die.value === diceRoll[0].value)

  useEffect(() => {
    intervalRef.current = setInterval(()=>{
      setTimer(prevTime => prevTime+1)
    },1000)

    return () => clearInterval(intervalRef.current)
  },[])

  useEffect(() => {
  if (gameWon) {
    clearInterval(intervalRef.current);
    }
  }, [gameWon]);
  

  const dieArray = diceRoll.map((no) => <Die no={no.value} held={no.isHeld} key={no.id} hold={()=>{
    toggleHold(no.id)
  }} id={no.id}/>)

  
  useEffect(()=>{
      if(gameWon){
        buttonRef.current.focus()
      }
  }, [gameWon])
  
  function toggleHold(id){
    setDiceRoll(oldDice => oldDice.map(die => 
       die.id===id ? {...die,
                      isHeld:!die.isHeld}
                        :
                      die))
    
  }

  function simulateDie(){
    if(gameWon){
      setTimer(0)
        intervalRef.current = setInterval(()=>{
          setTimer(prevTime => prevTime+1)
        },1000)
      setRollCount(0)
      setDiceRoll(generateAllNewDice(10))
    }
    else{
      setDiceRoll(prevRoll => prevRoll.map(item => {
      return item.isHeld ? item : {
        value:getRandomInt(1,7),
        isHeld:false,
        id:nanoid()
      }
    }))
    setRollCount(gameWon ? 0 : prevCount => prevCount+1)
    }}

  return (
    <main>
      {gameWon && <ConfettiEffect />}
      <div aria-live="polite" className='sr-only'>{gameWon && <p>Congrats! You Won! Press "New Game" to start the game again!</p>}</div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
      <Timer count={rollCount} time={timer} gameWon={gameWon}/>
      <div className='die-container'>
        {dieArray}
      </div>
      <button ref={buttonRef} onClick={simulateDie} className="roll-die-button">{gameWon ? "New Game" :"Roll"}</button>
    </main>
  )
}