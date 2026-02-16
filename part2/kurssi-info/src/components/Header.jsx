const Header = (props) => {
  console.log("header:"+props.course)
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )

}

export default Header