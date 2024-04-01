export function calculateOverview(orders: any[]): {
    totalCustomers: number;
    totalSales: number;
    averageOrderValue: number;
    totalOrders: number;
} {
    const customerSet = new Set();
    let totalSales = 0;

    orders.forEach((order: any) => {
        customerSet.add(order.data.user);
        totalSales += order.data.total;
    });
    return {
        totalCustomers: customerSet.size,
        totalSales,
        averageOrderValue: totalSales != 0 ? totalSales / orders.length : 0,
        totalOrders: orders.length,
    };
}

export function generateChartData(
    orders: any[],
    startDate: Date,
    endDate: Date,
): {
    labels: string[];
    datasets: any[];
} {
    const datasetData: any[] = [];
    const datasets = [{ strokeWidth: 2, data: datasetData }];
    let labels: string[] = [];

    const intervals = getIntervals(startDate, endDate);
    const formattedDates = intervals
        .map((date) => formatDate(date))
        .filter((_, index) => index % 2 === 0);
    labels = formattedDates;

    // console.log(orders);
    intervals.forEach((intervalStartDate, index) => {
        const intervalEndDate = intervals[index + 1] || endDate;
        const salesBetweenInterval = orders.reduce((totalSales, order) => {
            const orderDate = new Date(order.data.date.seconds * 1000); // Assuming orders have a timestamp field
            if (orderDate >= intervalStartDate && orderDate < intervalEndDate) {
                return totalSales + order.data.total;
            }
            return totalSales;
        }, 0);
        datasetData.push(salesBetweenInterval);
    });

    datasets[0].data = datasetData;
    return {
        labels,
        datasets,
    };
}

const formatDate = (date: Date): string => {
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
};

function getIntervals(startDate: Date, endDate: Date): Date[] {
    const intervalDates: Date[] = [];
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    let intervals = 6;
    if (diffInDays <= 7.1 && diffInDays >= 1) {
        intervals = 7;
    } else if (diffInDays <= 30 && diffInDays >= 1) {
        intervals = 4;
    }

    const intervalInMs = diffInMs / intervals;
    for (let i = 0; i < intervals; i++) {
        const intervalDate = new Date(startDate.getTime() + i * intervalInMs);
        intervalDates.push(intervalDate);
    }

    return intervalDates;
}

interface Product {
    name: string;
    url: string;
    sales: number;
    id: string;
}
export function calculateBestSellers(orders: any[]): any[] {
    const productSet = new Set<Product>();

    orders.forEach((order) => {
        order.data.products.forEach((product: any) => {
            const existingProduct = Array.from(productSet).find(
                (p) => p.id === product.id,
            );
            if (existingProduct) {
                existingProduct.sales += product.amount;
            } else {
                productSet.add({
                    name: product.name,
                    url: product.imageUrl,
                    sales: product.amount * product.costPer,
                    id: product.id,
                });
            }
        });
    });
    const sortedProducts = [...productSet].sort((a, b) => b.sales - a.sales);
    return sortedProducts;
}
