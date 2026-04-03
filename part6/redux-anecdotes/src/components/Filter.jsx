import { useDispatch } from "react-redux"
import { filterChenge } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    dispatch(filterChenge(event.target.value))
    // input-kentän arvo muuttujassa event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter