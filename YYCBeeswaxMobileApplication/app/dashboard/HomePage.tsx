import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import CategoryCard from "@/components/cards/categoryCard";
import ItemCard, { LoadingItemCard } from "@/components/cards/itemCard";
import { colors } from "@/consts/styles";
import { getProductData } from "@/firebase/getCollections/getProducts";
import { homePageStyles } from "@/styles/homePageStyles";
import { mainStyles } from "@/styles/mainStyles";

export let searchTerm: string = "";

function LoadingItemCardList() {
    return (
        <>
            <LoadingItemCard />
            <LoadingItemCard />
            <LoadingItemCard />
        </>
    );
}

export default function HomePage() {
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    async function setAllProductData() {
        const products = await getProductData();
        setAllProducts(products);
    }

    useEffect(() => {
        (async () => {
            await setAllProductData();
            setLoading(false);
        })();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setAllProductData();
            setRefreshing(false);
        }, 2000);
    }, []);

    if (!loading && allProducts.length == 0) {
        return (
            <View style={mainStyles.container}>
                <ScrollView
                    contentContainerStyle={homePageStyles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.yellow}
                        />
                    }
                >
                    <Image
                        contentFit="contain"
                        source={require("@/assets/YYCBeeswaxFullLogo.png")}
                        style={homePageStyles.logo}
                    />
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 30,
                        }}
                    >
                        <MaterialIcons
                            name="error-outline"
                            size={150}
                            color="gray"
                        />
                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                            Error Loading Products:
                        </Text>
                        <Text style={{ fontSize: 18, textAlign: "center" }}>
                            Please check your internet connection
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={mainStyles.container}>
            <ScrollView
                contentContainerStyle={homePageStyles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.yellow}
                    />
                }
            >
                <Image
                    contentFit="contain"
                    source={require("@/assets/YYCBeeswaxFullLogo.png")}
                    style={homePageStyles.logo}
                />
                <View style={homePageStyles.searchBarContainer}>
                    <Feather
                        name="search"
                        size={20}
                        color="black"
                        style={homePageStyles.searchIcon}
                    />
                    <TextInput
                        style={homePageStyles.searchBar}
                        placeholder="Search all Products"
                        placeholderTextColor={colors.darkGrey}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={() => {
                            searchTerm = searchQuery;
                            router.push("/product/SearchPage");
                        }}
                        returnKeyType="search"
                    />
                </View>
                <Text style={homePageStyles.headerText}>Shop by Category</Text>
                <View style={homePageStyles.categoriesContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <CategoryCard iconName="candle" title="Candles" />
                        <CategoryCard iconName="lipstick" title="Lip Balm" />
                        <CategoryCard iconName="lotion" title="Lotion" />
                        <CategoryCard iconName="store" title="Other" />
                    </ScrollView>
                </View>
                <Text style={homePageStyles.headerText}>New Arrivals</Text>
                <View style={homePageStyles.horizontalScrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {loading ? (
                            <LoadingItemCardList />
                        ) : (
                            allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.data.url}
                                    title={product.data.name}
                                    price={product.data.price}
                                />
                            ))
                        )}
                    </ScrollView>
                </View>
                <Text style={homePageStyles.headerText}>Best Sellers</Text>
                <View style={homePageStyles.horizontalScrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {loading ? (
                            <LoadingItemCardList />
                        ) : (
                            allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.data.url}
                                    title={product.data.name}
                                    price={product.data.price}
                                />
                            ))
                        )}
                    </ScrollView>
                </View>
                <Text style={homePageStyles.headerText}>
                    Recommended for You
                </Text>
                <View style={homePageStyles.lastHorizontalScrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {loading ? (
                            <LoadingItemCardList />
                        ) : (
                            allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.data.url}
                                    title={product.data.name}
                                    price={product.data.price}
                                />
                            ))
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}
