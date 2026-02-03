
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total="Number of exercises" value={course.parts.reduce(
                                                (sum, part)=> sum + part.exercises,0
      )}/>
      {/*<p>
        {course.parts.reduce((sum, part)=> sum + part.exercises,0)}
        </p>*/}
    </div>
  )
}

export default App