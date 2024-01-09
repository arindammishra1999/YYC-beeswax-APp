import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, ScrollView } from "react-native";
import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";
import { homePageStyles } from "@/styles/homePageStyles";
import CategoryCard from "@/components/categoryCard";
import ItemCard from "@/components/itemCard";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "@/consts/styles";
import { getProductData } from "../../firebase/getCollections/getProducts";

export default function HomePage() {
    const [allProducts, setAllProducts] = useState([] as any);

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
                        source={require("../../assets/YYCBeeswaxFullLogo.png")}
                        style={homePageStyles.logo}
                    />
                    <View style={homePageStyles.searchBarContainer}>
                        <Icon
                            name="search"
                            size={20}
                            color="black"
                            style={homePageStyles.searchIcon}
                        />
                        <TextInput
                            style={homePageStyles.searchBar}
                            placeholder="Search all Products"
                            placeholderTextColor={colors.darkGrey}
                            onSubmitEditing={() =>
                                console.log("Search bar clicked")
                            }
                            returnKeyType="search"
                        />
                    </View>
                    <Text style={homePageStyles.headerText}>
                        Shop by Category
                    </Text>
                    <View style={homePageStyles.categoriesContainer}>
                        <CategoryCard
                            iconName="candle"
                            title="Candles"
                        ></CategoryCard>
                        <CategoryCard
                            iconName="lipstick"
                            title="Lip Balm"
                        ></CategoryCard>
                        <CategoryCard
                            iconName="lotion"
                            title="Lotion"
                        ></CategoryCard>
                    </View>
                    <Text style={homePageStyles.headerText}>New Arrivals</Text>
                    <View style={homePageStyles.horizontalScrollContainer}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
                                    image={product.data.url}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    <Text style={homePageStyles.headerText}>Best Sellers</Text>
                    <View style={homePageStyles.horizontalScrollContainer}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
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
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {allProducts.map((product: any) => (
                                <ItemCard
                                    key={product.id}
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
