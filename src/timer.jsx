
export default function Timer(props){
  return (
    <div className="roll-timer-container">
      <h3 className="timer">
        Timer
        <p className="time">{props.time}s</p>
      </h3>

      <h3 className="roll-container">
        Rolls
        <p className="roll">{props.count}</p>
      </h3>
    </div>
  )
}