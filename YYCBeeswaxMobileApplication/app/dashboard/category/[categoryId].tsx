import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import Header from "@/components/header";
import ProductSimpleCard from "@/components/productSimpleCard";
import { getProductDataByCategory } from "@/firebase/getCollections/getProductByCategory";
import { queryPageStyles } from "@/styles/queryPageStyles";

export default function CategoryId() {
    const { categoryId } = useLocalSearchParams() as Record<string, string>;

    const [allProductsInCategory, setAllProductsInCategory] = useState(
        [] as any,
    );
    useEffect(() => {
        getProductDataByCategory(categoryId).then((products) => {
            if (products) {
                setAllProductsInCategory(products);
            } else {
                console.log("Issue getting products");
            }
        });
    }, []);

    return (
        <View style={queryPageStyles.container}>
            <Header header={categoryId + " Page"} />
            <View>
                <ScrollView contentContainerStyle={queryPageStyles.display}>
                    {allProductsInCategory.map((product: any) => (
                        <ProductSimpleCard
                            key={product.id}
                            image={product.data.url}
                            name={product.data.name}
                            price={product.data.price}
                            id={product.id}
                        />
                    ))}
                    <View style={queryPageStyles.extraSpace} />
                </ScrollView>
            </View>
        </View>
    );
}
