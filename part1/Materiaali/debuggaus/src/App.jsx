import { useState } from 'react'

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the map is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')} | {allClicks.length}
    </div>
  )
} 

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
      console.log('value now', newValue)
      setValue(newValue)
    }

   //const hello = (who) => () => {
  //    console.log('hello', who)
  //  }
  

  //const [clicks, setClicks] = useState({ left: 0, right: 0 })
  //const [left, setLeft] = useState(0)
  //const [right, setRight] = useState(0)
  //const [allClicks, setAll] = useState([])
  //const [total, setTotal] = useState(0)

//const handleLeftClick = () => {
//  setAll(allClicks.concat('L'))
//  const updatedLeft = left + 1
//  setLeft(updatedLeft)
//  setTotal(updatedLeft + right)
//}
//
//const handleRightClick = () =>{
//  setAll(allClicks.concat('R'))
//  const updatedRight = right + 1
//  setRight(updatedRight)
//  setTotal(left + updatedRight)
//}

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value +1)}>increment</button>
      {/*<div>
        {left}
        <Button onClick={handleLeftClick} text='left'/>
        <Button onClick={handleRightClick} text='right'/>
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <History allClicks={allClicks}/>
      </div>*/}
    </div>
  )
}

export default App