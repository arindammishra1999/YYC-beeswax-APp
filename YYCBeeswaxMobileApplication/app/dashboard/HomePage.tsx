import React from "react";
import { Text, View, Image, TextInput, ScrollView } from "react-native";
import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";
import { homePageStyles } from "@/styles/homePageStyles";
import CategoryCard from "@/components/categoryCard";
import ItemCard from "@/components/itemCard";

export default function HomePage() {
    return (
        <View style={mainStyles.container}>
            <ScrollView>
                <View style={homePageStyles.container}>
                    <Image
                        resizeMode="contain"
                        source={require("../../assets/YYCBeeswaxFullLogo.png")}
                        style={homePageStyles.logo}
                    />
                    <TextInput
                        style={homePageStyles.searchBar}
                        placeholder="Search all Products"
                    />
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
                            <ItemCard
                                image={require("../../assets/tempImages/pillarCandles.jpg")}
                                title="Candles"
                            ></ItemCard>
                            <ItemCard
                                image={require("../../assets/tempImages/pillarCandles.jpg")}
                                title="Candles with long text this is crazy"
                            ></ItemCard>
                            <ItemCard
                                image={require("../../assets/tempImages/pillarCandles.jpg")}
                                title="Candles"
                            ></ItemCard>
                            <ItemCard
                                image={require("../../assets/tempImages/pillarCandles.jpg")}
                                title="Candles"
                            ></ItemCard>
                        </ScrollView>
                    </View>
                    <Text style={homePageStyles.headerText}>Best Sellers</Text>
                    <View style={homePageStyles.horizontalScrollContainer}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <ItemCard
                                image={require("../../assets/tempImages/pillarCandles.jpg")}
                                title="Candles"
                            ></ItemCard>
                            <ItemCard
                                image={require("../../assets/tempImages/pillarCandles.jpg")}
                                title="Candles"
                            ></ItemCard>
                            <ItemCard
                                image={require("../../assets/tempImages/pillarCandles.jpg")}
                                title="Candles"
                            ></ItemCard>
                            <ItemCard
                                image={require("../../assets/tempImages/pillarCandles.jpg")}
                                title="Candles"
                            ></ItemCard>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <Navbar currentPage="Home" />
        </View>
    );
}
