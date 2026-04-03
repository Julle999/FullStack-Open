//import { addMessage } from "../reducers/notificationReducer"
import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(state => state.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  //TODO: jos message on '' return tyhjä
  if (message === '') {
    return
  }
  
  return <div style={style}>{message}</div>
}

export default Notification
