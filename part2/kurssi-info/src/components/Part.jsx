const Part = ({ part }) => {
  console.log('creating part')

  return(
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

export default Part