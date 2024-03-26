import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import loadLanguageSettings from "@/app/profile/LanguagePage";
import CategoryCard from "@/components/cards/categoryCard";
import ItemCard, { LoadingItemCard } from "@/components/cards/itemCard";
import { colors } from "@/consts/styles";
import { getProductData } from "@/firebase/getCollections/getProducts";
import { shuffleArray } from "@/lib/utility";
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
    const { t } = useTranslation();
    const [allProducts, setAllProducts] = useState<
        { id: string; data: IProduct }[]
    >([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const sortedByRating = [...allProducts].sort((a, b) => {
        return (b.data.reviews?.avg ?? 0) - (a.data.reviews?.avg ?? 0);
    });
    const shuffled = shuffleArray([...allProducts]);
    const sortedByDate = [...allProducts].sort((a, b) => {
        return a.data.lastUpdated - b.data.lastUpdated;
    });

    async function setAllProductData() {
        const products = await getProductData();
        setAllProducts(products);
    }

    useEffect(() => {
        (async () => {
            await setAllProductData();
            setLoading(false);
            loadLanguageSettings();
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
                    contentContainerStyle={{ minHeight: "100%" }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.yellow}
                        />
                    }
                >
                    <View style={homePageStyles.container}>
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
                                {t("Error Loading Products:")}
                            </Text>
                            <Text style={{ fontSize: 18, textAlign: "center" }}>
                                {t("Please check your internet connection")}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={mainStyles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.yellow}
                    />
                }
            >
                <View style={homePageStyles.container}>
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
                            placeholder={t("Search all Products")}
                            placeholderTextColor={colors.darkGrey}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={() => {
                                searchTerm = searchQuery;
                                router.push("/product/SearchPage");
                            }}
                            returnKeyType="search"
                        />
                    </View>
                    <Text style={homePageStyles.headerText}>
                        {t("Shop by Category")}
                    </Text>
                    <View style={homePageStyles.categoriesContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <CategoryCard
                                iconName="candle"
                                englishTitle="Candles"
                                title={t("Candles")}
                            />
                            <CategoryCard
                                iconName="lipstick"
                                englishTitle="Lip Balm"
                                title={t("Lip Balm")}
                            />
                            <CategoryCard
                                iconName="lotion"
                                englishTitle="Lotion"
                                title={t("Lotion")}
                            />
                            <CategoryCard
                                iconName="store"
                                englishTitle="Other"
                                title={t("Other")}
                            />
                        </ScrollView>
                    </View>
                    <Text style={homePageStyles.headerText}>
                        {t("New Arrivals")}
                    </Text>
                    <View style={homePageStyles.horizontalScrollContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {loading ? (
                                <LoadingItemCardList />
                            ) : (
                                sortedByDate.map((product: any) => (
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
                        {t("Best Sellers")}
                    </Text>
                    <View style={homePageStyles.horizontalScrollContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {loading ? (
                                <LoadingItemCardList />
                            ) : (
                                sortedByRating.map((product: any) => (
                                    <ItemCard
                                        key={product.id}
                                        id={product.id}
                                        image={product.data.url}
                                        title={t(product.data.name)}
                                        price={product.data.price}
                                    />
                                ))
                            )}
                        </ScrollView>
                    </View>
                    <Text style={homePageStyles.headerText}>
                        {t("Recommended for You")}
                    </Text>
                    <View style={homePageStyles.lastHorizontalScrollContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {loading ? (
                                <LoadingItemCardList />
                            ) : (
                                shuffled.map((product: any) => (
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
                </View>
            </ScrollView>
        </View>
    );
}
