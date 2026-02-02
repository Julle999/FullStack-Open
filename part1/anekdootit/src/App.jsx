
const Header = (props) => {
  console.log("header:"+props.course)
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )

}


const Part = ({ part }) => {
  console.log('creating part')

  return(
    <div>
      <p>{part.name} {part.value}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  console.log('How many parts: '+parts.length)
  return(
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  )
}


const Total = (props) => {
  console.log(props.total)

  return(
    <div>
      <p>{props.total} {props.value}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React', 
      value: 10
    },
    {
      name: 'Using props to pass data', 
      value: 7
    },
    {
      name: 'State of a component', 
      value: 14
    }
  ]

  return (
    <div>
      
      <Header course={course}/>
      <Content parts={parts}/>
      {/*<Content part={part2} exercises={exercises2}/>*/}
      {/*<Content part={part3} exercises={exercises3}/>*/}
      <Total total="Number of exercises" value={parts[0].value}/>
    </div>
  )
}

export default App