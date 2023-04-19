const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  const style = {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  }

  return <div style={style}>{message}</div>
}

export default Notification
