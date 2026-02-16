const Header = (props) => {
  console.log("header:"+props.name)
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )

}

export default Header