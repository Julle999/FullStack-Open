import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text}) => {
  //console.log("button", {text}, "pressed")
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ value, text }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({stats}) => {
  const votes = stats[0]+stats[1]+stats[2]
  let result;
  if (votes < 1) {
    result = <div>No feedback given</div>
  } else {

    const goods = (stats[0]*1)+(stats[2]*-1)
    const avrg = goods/votes
    result = <table>
      <tbody>
        <StatisticLine value={stats[0]} text="good"/>
        <StatisticLine value={stats[1]} text="neutral"/>
        <StatisticLine value={stats[2]} text="bad"/>
        <StatisticLine value={votes} text="all"/>
        <StatisticLine value={avrg} text="average"/>
        <StatisticLine value={stats[0]/votes*100+ "%"} text="positive"/>
      </tbody>
    </table>  
  }
    return result
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const stats = [good, neutral, bad]

  //const votes = bad+good+neutral
  //const goods = (good*1)+(bad*-1)
  //const avrg = goods/votes

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
      <Statistics stats={stats}/>
    </div>
  )
}

export default App