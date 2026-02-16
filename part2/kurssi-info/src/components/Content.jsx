import Part from "./Part"


const Content = ({ parts }) => {
  console.log('How many parts: '+parts.length)
  return(
    <div>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
    </div>
  )
}

export default Content