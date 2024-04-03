export function filterOrders(
    orders: { orders: any[] },
    startDate: Date,
    endDate: Date,
): any[] {
    const filteredOrders: any[] = [];
    orders.orders.forEach((order: any) => {
        const orderDate = new Date(order.data.date.seconds * 1000);
        const startOfDay = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
        );
        const endOfDay = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() + 1,
        );
        if (
            orderDate.getTime() >= startOfDay.getTime() &&
            orderDate.getTime() <= endOfDay.getTime()
        ) {
            filteredOrders.push(order);
        }
    });
    return filteredOrders;
}
