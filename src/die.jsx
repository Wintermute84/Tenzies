import { nanoid } from "nanoid"
export function Die(props){
  return(
    <button className={`die ${props.held ? "held" : undefined}`} 
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.isHeld ? "held" : "not held"}`}>
      {props.no}
    </button>
  )
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateAllNewDice(range){
  let numArray = []

  for(let i=0;i<range;i+=1){
    numArray.push({
      value:getRandomInt(1,7),
      isHeld:false,
      id:nanoid()
    })
  }

  return numArray;
}