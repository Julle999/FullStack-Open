const Person = (props) => {
    return (
        <p>
            {props.name} - {props.number}
            <button onClick={() => props.handleDelete(props.person)}>Delete</button>
        </p>
    )
}

export default Person