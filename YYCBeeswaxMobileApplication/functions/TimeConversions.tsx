export function convertTimestampToDateTime(seconds: number): string {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(seconds);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "short" as const,
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }).format(dateTime);

    return formattedDate;
}

export function secondsToDate(seconds: number): Date {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(seconds);

    return dateTime;
}
