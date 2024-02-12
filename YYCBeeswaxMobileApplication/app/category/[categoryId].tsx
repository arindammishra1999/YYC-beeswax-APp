import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import ProductSimpleCard from "@/components/cards/productSimpleCard";
import Header from "@/components/header";
import { colors } from "@/consts/styles";
import { getProductDataByCategory } from "@/firebase/getCollections/getProductByCategory";
import { queryPageStyles } from "@/styles/queryPageStyles";

export default function CategoryId() {
    const { categoryId } = useLocalSearchParams() as Record<string, string>;
    const [refreshing, setRefreshing] = useState(false);
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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getProductDataByCategory(categoryId).then((products) => {
                if (products) {
                    setAllProductsInCategory(products);
                } else {
                    console.log("Issue getting products");
                }
            });
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={queryPageStyles.container}>
            <Header header={categoryId + " Page"} />
            <View>
                <ScrollView
                    contentContainerStyle={queryPageStyles.display}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.yellow}
                        />
                    }
                >
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
