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

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  
const increaseByOne = () => {
    console.log('increasing, value before', counter)    
setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)    
setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)    
setCounter(0)
  }

  //const handleClick = () => {
  //  console.log('clicked')
  //  //setCounter(counter+1)
  //}

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
      <Display counter={counter}/>
      {/*<div>{counter}</div>*/}
            <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />           
    </div>
  )
}

export default App