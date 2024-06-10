export function formatTime(dateString: string) {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Specify the options for the time format without seconds
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Dhaka'
    };

    // Format the date to the local time of Dhaka, Bangladesh
    const formattedTime = date.toLocaleTimeString('en-US', {});

    return formattedTime;
}
