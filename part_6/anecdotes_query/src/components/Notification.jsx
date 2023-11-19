import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
    const notification = useNotificationValue();

    // Define notification style
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    };

    // Render nothing if there is no notification
    if (!notification) {
        return null;
    }

    // Render notification
    return (
        <div style={style}>
            {notification}
        </div>
    );
};

export default Notification;
