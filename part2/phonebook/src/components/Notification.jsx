const Notification = ({ message, style }) => {
    if (message === null) {
        return null
    }
    const notificationStyleSuccess = {
        background: 'lightgray',
        border: 'solid',
        borderColor: 'green',
        padding: 15,
        fontSize: 20,
        color: 'green',
        marginBottom: 10,
        borderRadius: 5
    }
    const notificationStyleFail = {
        background: 'lightgray',
        border: 'solid',
        borderColor: 'red',
        padding: 15,
        fontSize: 20,
        color: 'red',
        marginBottom: 10,
        borderRadius: 5
    }

    return (
        <div style={style ? notificationStyleSuccess : notificationStyleFail} className="error">
            {message}
        </div>
    )
}

export default Notification