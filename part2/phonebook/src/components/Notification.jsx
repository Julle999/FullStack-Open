const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    const notificationStyle = {
        background: 'lightgray',
        border: 'solid',
        borderColor: 'green',
        padding: 15,
        fontSize: 20,
        color: 'green',
        marginBottom: 10,
        borderRadius: 5
    }

    return (
        <div style={notificationStyle} className="error">
            {message}
        </div>
    )
}

export default Notification