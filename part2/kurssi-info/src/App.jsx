
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
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  console.log('How many parts: '+parts.length)
  return(
    <div>
      
        {parts.map(part =>
          <Part part={part}/>
        )}
      
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

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10,
      id:1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id:2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id:3
    }
  ]
}

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App