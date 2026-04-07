import { useFeedback } from "../store"

const Statistics = () => {
  const { good, neutral, bad } = useFeedback()

  //const good = 0
  //const neutral = 0
  //const bad = 0
  const all = bad + neutral + good 
  const goods = (good*1)+(bad*-1)
  const average = all > 0 ? goods/all : 0 
  const positive = all > 0 ? good/all*100+ "%" : 0
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>goods</td><td>{goods}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
