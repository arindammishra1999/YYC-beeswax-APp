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

export function generateChartData(orders: any[]): {
    labels: string[];
    datasets: any[];
} {
    let datasets = [{ strokeWidth: 2 }];
    let labels: string[] = [];

    return {
        labels,
        datasets,
    };
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
