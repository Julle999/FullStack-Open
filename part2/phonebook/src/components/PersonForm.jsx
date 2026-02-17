const PersonForm = (props) => {
    //console.log({props})
    return (
        <form onSubmit={props.onSubmit}>
            <div>name: <input value={props.nameValue}onChange={props.nameOnChange}/></div>
            <div>number: <input value={props.numValue} onChange={props.numOnChange}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm