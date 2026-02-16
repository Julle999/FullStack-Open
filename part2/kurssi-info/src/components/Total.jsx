const Total = (props) => {
  //console.log(props.total)

  return(
    <div>
      <p><strong>total of {props.parts.reduce((sum, part)=> sum + part.exercises,0)} exercises</strong></p>
    </div>
  )
}

export default Total