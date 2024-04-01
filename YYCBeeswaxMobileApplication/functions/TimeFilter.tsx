export function filterOrders(
    orders: { orders: any[] },
    startDate: Date,
    endDate: Date,
): any[] {
    const filteredOrders: any[] = [];
    orders.orders.forEach((order: any) => {
        const orderDate = new Date(order.data.date.seconds * 1000);
        if (
            orderDate.getTime() >= startDate.getTime() &&
            orderDate.getTime() <= endDate.getTime()
        ) {
            filteredOrders.push(order);
        }
    });
    return filteredOrders;
}
