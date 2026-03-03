const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content} | {note.important.toString()}
      <button className="nappi" onClick={toggleImportance}>{label}</button>
    </li>

  )
}

export default Note