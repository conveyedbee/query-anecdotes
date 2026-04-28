import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationProvider = (props) => {
    const [notification, setNotification] = useState('')

    const notify = (message) => {
        setNotification(message)
        setTimeout(() => {
        setNotification('')
        }, 3000)
    }
    
    return (
        <NotificationContext.Provider value={{ notification, setNotification, notify }}>
            {props.children}
        </NotificationContext.Provider>
    )
}