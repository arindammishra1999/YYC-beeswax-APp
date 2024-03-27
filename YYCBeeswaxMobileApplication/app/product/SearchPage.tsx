import levenshtein from "damerau-levenshtein";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from "react-native";

import { searchTerm } from "@/app/dashboard/HomePage";
import ProductSimpleCard from "@/components/cards/productSimpleCard";
import Header from "@/components/header";
import { colors } from "@/consts/styles";
import { getProductData } from "@/firebase/getCollections/getProducts";
import { mainStyles } from "@/styles/mainStyles";
import { queryPageStyles } from "@/styles/queryPageStyles";

interface LevenshteinResponse {
    steps: number;
    relative: number;
    similarity: number;
}

export default function SearchPage() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [validProducts, setValidProducts] = useState([] as any);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getProductData().then((products) => {
            if (products) {
                setValidProducts(searchAlgorithm(products));
            } else {
                console.log("Issue getting products");
            }
            setIsLoading(false);
        });
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getProductData().then((products) => {
                if (products) {
                    setValidProducts(searchAlgorithm(products));
                } else {
                    console.log("Issue getting products");
                }
                setIsLoading(false);
            });
            setRefreshing(false);
        }, 2000);
    }, []);

    function searchAlgorithm(allProducts: any): any[] {
        //This is the algorithm to filter out products based off of a users search
        //It starts by iterating through the list of all of the products
        //It prepares two lists, one contains the search terms, and the other contains the values to compare them against
        //The first comparisons checks if a substring of a product term exists in their search
        //The second comparisons uses a fuzzy search by comparing string metrics using the Damerau-Levenshtein distance
        //Whenever a match is made, the product gets added to the screen, and the loop moves to the next product

        //These values can be changed, they appear valid with the current data set
        const minSimilarity: number = 0.8;
        const maxStepCount: number = 3;
        const minWordLength: number = 2; //Used alongside valid step count, otherwise single letters can be converted into numbers too easily
        const productsInCategory: any[] = [];

        allProducts.forEach((product: any) => {
            const productCategories: string[] = product.data.categories;
            const productNameTerms: string[] = product.data.name.split(" ");

            //Combine to search through them using a single for loop
            const productTerms: string[] = productCategories
                .concat(productNameTerms)
                .map((v) => v.toLowerCase()); //lower case as case conversion counts as a step

            //When the user searches using multiple terms, iterate through them
            const searchTerms: string[] = searchTerm
                .split(" ")
                .map((v) => v.toLowerCase());

            for (let i = 0; i < productTerms.length; i++) {
                //Check if the search term exists as a substring, and also is more than 2 characters long
                const foundSubstring = searchTerms.some(
                    (r) =>
                        productTerms[i].includes(r) && r.length > minWordLength,
                );
                if (foundSubstring) {
                    productsInCategory.push(product);
                    break;
                }

                //If the search term isn't found as a substring, do a fuzzy search
                let includeProduct: boolean = false;
                for (let j = 0; j < searchTerms.length; j++) {
                    const lev: LevenshteinResponse = levenshtein(
                        productTerms[i],
                        searchTerms[j],
                    );
                    if (
                        lev.similarity > minSimilarity ||
                        (lev.steps < maxStepCount &&
                            productTerms[i].length > minWordLength)
                    ) {
                        includeProduct = true;
                        break;
                    }
                }
                if (includeProduct) {
                    productsInCategory.push(product);
                    break;
                }
            }
        });
        return productsInCategory;
    }

    if (isLoading) {
        return (
            <View style={mainStyles.spinnerOverlay}>
                <ActivityIndicator size="large" color={colors.yellow} />
            </View>
        );
    }

    if (validProducts.length > 0) {
        return (
            <View style={queryPageStyles.container}>
                <Header header={t("Results for: ") + searchTerm} />
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
                        {validProducts.map((product: any) => (
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
    } else {
        return (
            <View style={mainStyles.container}>
                <Header header={t("Search Results")} />
                <Text style={queryPageStyles.messageText}>
                    {t("Sorry, nothing was found for")} {searchTerm}.
                </Text>
                <TouchableOpacity
                    style={queryPageStyles.button}
                    onPress={() => router.push("/dashboard/HomePage")}
                >
                    <Text style={queryPageStyles.buttonText}>
                        {t("Shop Other Products")}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
