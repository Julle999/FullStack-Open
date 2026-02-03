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

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
      console.log('value now', newValue)
      setValue(newValue)
    }

  return (
    <div>
      {value}
      <Button onClick={() => setToValue(1000)} text="thousand"/>
      <Button onClick={() => setToValue(0)} text="reset"/>
      <Button onClick={() => setToValue(value + 1)} text="increment"/>
    </div>
  )
}

export default App