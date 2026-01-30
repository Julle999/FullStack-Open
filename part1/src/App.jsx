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
  return(
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Julli'
  const ika = 10+17


  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Riku" age={10+16}/>
      <Hello name={nimi} age={ika}/>   
      <Footer/>
    </>
  )
}

export default App