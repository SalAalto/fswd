import './Notification.css';

/**
 * Notification component to display informational or error messages.
 *
 * @param {{type: string, text: string} | null} message - The message object containing the type and text, or null if no message is to be displayed.
 */
const Notification = ({ message }) => {
    // Return nothing if there is no message to display.
    if (message === undefined || message?.text === '') {
        return null;
    }
    console.log(message.info)

    // Determine the CSS class based on the message type and render the message text.
    const notificationClass = message.type === 'info' ? 'notification' : 'error';

    return <div className={notificationClass}>{message.text}</div>;
}

export default Notification;
