import Confetti from 'react-confetti'
import { useState, useEffect } from 'react'
export default function ConfettiEffect(){
  const [dimensions, setDimension] = useState([window.innerHeight, window.innerWidth])
  useEffect(() => {
        function watchWindowDimension (){
            setDimension([this.window.innerHeight, window.innerWidth])
        }
        window.addEventListener("resize",watchWindowDimension)  
        return function () {
          window.removeEventListener("resize",watchWindowDimension)
        }
      }, [])
  return (
    <Confetti width={dimensions[1]} height={dimensions[0]}/>
  )
}