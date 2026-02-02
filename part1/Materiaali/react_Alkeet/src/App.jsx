import { useState } from "react"

const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/Julle999"> Julle999</a>
    </div>
  )
}


const Hello = (props) => {
  {/*console.log(props)*/}
  const brnyear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }
  return(
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
      <p>So you are probably born {brnyear()}</p>
    </div>
  )
}

const App = () => {
  const [counter, setCounter] = useState(50)

  const handleClick = () => {
    console.log('clicked')
    //setCounter(counter+1)
  }

  {/*setTimeout(
    () => setCounter(counter + 1),
    20000
  )*/}

  //console.log('rendering...', counter)

  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
            <button onClick={() => setCounter(0)}> 
        zero
      </button>
    </div>
  )
}

export default App