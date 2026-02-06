import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text}) => {
  //console.log("button", {text}, "pressed")
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({ value, text }) => <div>{text} {value}</div>


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const votes = bad+good+neutral
  const goods = (good*1)+(bad*-1)
  const avrg = goods/votes

  const addGood = () => {
    console.log("adding good")
    setGood(good + 1)
  }

  const addNeutral = () => {
    console.log("adding neutral")
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    console.log("adding bad")
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={addGood} text="good"/>
      <Button onClick={addNeutral} text="neutral"/>
      <Button onClick={addBad} text="bad"/>
      <Header text="statistics"/>
      <Statistic value={good} text="good"/>
      <Statistic value={neutral} text="neutral"/>
      <Statistic value={bad} text="bad"/>
      <Statistic value={votes} text="all"/>
      <Statistic value={avrg} text="average"/>
      <Statistic value={good/votes+ "%"} text="positive"/>
    </div>
  )
}

export default App