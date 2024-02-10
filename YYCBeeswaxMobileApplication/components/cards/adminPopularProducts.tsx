import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import AdminCardHeader from "@/components/adminCardHeader";
import AdminProductCard from "@/components/cards/adminProductCard";
import { getProductData } from "@/firebase/getCollections/getProducts";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminPopularProductsCard() {
    const [allProducts, setAllProducts] = useState([] as any);

    useEffect(() => {
        getProductData().then((products: any) => {
            if (products) {
                products.sort(
                    (
                        one: { data: { price: number } },
                        two: { data: { price: number } },
                    ) => two.data.price - one.data.price,
                );
                setAllProducts(products);
            } else {
                console.log("Issue getting products");
            }
        });
    }, []);

    return (
        <View
            style={[
                adminDashboardPageStyles.cardContainer,
                adminDashboardPageStyles.bottom,
            ]}
        >
            <AdminCardHeader title="Popular Products" />
            <View style={adminDashboardPageStyles.subTitle}>
                <Text style={adminDashboardPageStyles.overviewText}>
                    Products
                </Text>
                <Text style={adminDashboardPageStyles.overviewText}>
                    Earnings
                </Text>
            </View>
            <View>
                {allProducts.map((product: any) => (
                    <AdminProductCard
                        key={product.id}
                        image={product.data.url}
                        name={product.data.name}
                        earnings={product.data.price}
                        id={product.id}
                    />
                ))}
            </View>
        </View>
    );
}
