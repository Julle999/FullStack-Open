import { useState } from 'react'

const App = () => {
  //const [clicks, setClicks] = useState({ left: 0, right: 0 })
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  setLeft(left + 1)
}

const handleRightClick = () =>{
  setAll(allClicks.concat('R'))
  setRight(right + 1)
}


  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
}

export default App