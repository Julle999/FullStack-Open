const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/Julle999"> Julle999</a>
    </div>
  )
}


const Hello = (props) => {
  console.log(props)
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

const App = (props) => {
  const {counter} = props
  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
      <div>{counter}</div>
    </div>
  )
}

export default App