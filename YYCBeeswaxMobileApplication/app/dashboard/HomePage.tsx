import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";

import CategoryCard from "@/components/categoryCard";
import ItemCard from "@/components/itemCard";
import Navbar from "@/components/navbar";
import { colors } from "@/consts/styles";
import { getProductData } from "@/firebase/getCollections/getProducts";
import { homePageStyles } from "@/styles/homePageStyles";
import { mainStyles } from "@/styles/mainStyles";

export let searchTerm: string = "";

export default function HomePage() {
    const [allProducts, setAllProducts] = useState([] as any);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        getProductData().then((products) => {
            if (products) {
                setAllProducts(products);
            } else {
                console.log("Issue getting products");
            }
        });
    }, []);

    return (
        <View style={mainStyles.container}>
            <ScrollView>
                <View style={homePageStyles.container}>
                    <Image
                        resizeMode="contain"
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
                                router.push("/dashboard/SearchPage");
                            }}
                            returnKeyType="search"
                        />
                    </View>
                    <Text style={homePageStyles.headerText}>
                        Shop by Category
                    </Text>
                    <View style={homePageStyles.categoriesContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <CategoryCard iconName="candle" title="Candles" />
                            <CategoryCard
                                iconName="lipstick"
                                title="Lip Balm"
                            />
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
                            {allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.data.url}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    <Text style={homePageStyles.headerText}>Best Sellers</Text>
                    <View style={homePageStyles.horizontalScrollContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.data.url}
                                />
                            ))}
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
                            {allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.data.url}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <Navbar currentPage="Home" />
        </View>
    );
}
