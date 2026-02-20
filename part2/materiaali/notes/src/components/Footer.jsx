const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    borderTop: 'solid',
    marginTop: 25,
    paddingTop: 0,
    borderColor: 'blue'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Trying to Do Computer Science, University of Jyväskylä 2026
      </p>
    </div>
  )
}

export default Footer