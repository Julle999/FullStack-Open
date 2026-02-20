import Person from "./Person"
const Persons = (props) => {
    return(
        <div>
            {props.arr.map(person =>
            <Person 
                key={person.name} 
                name={person.name} 
                number={person.number} 
                handleDelete={props.handleDelete} 
                person={person}/>
            )}
        </div>
    )
}

export default Persons