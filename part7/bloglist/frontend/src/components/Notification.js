import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return
  }

  return (
    <div style={{ margin: '5px 0px' }}>
      <Alert severity={notification.type}>{notification.message}</Alert>
    </div>
  )

  // return <div style={style}>{notification.message}</div>
}

export default Notification
