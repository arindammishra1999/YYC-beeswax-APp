import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";

import Header from "@/components/header";
import { selectedProductID } from "@/components/productSimpleCard";
import { getProductDataById } from "@/firebase/getCollections/getProductByID";
import { mainStyles } from "@/styles/mainStyles";
import { productPageStyles } from "@/styles/productPageStyles";

export default function ProductPage() {
    const [productName, setProductName] = useState(String);
    const [productDescription, setProductDescription] = useState(String);
    const [productPrice, setProductPrice] = useState(Number);
    const [productStock, setProductStock] = useState(Number);
    const [productURL, setProductURL] = useState(String);
    const [quantity, setQuantity] = useState(1);

    function increase() {
        if (quantity < productStock) setQuantity(quantity + 1);
    }

    function decrease() {
        if (quantity > 1) setQuantity(quantity - 1);
    }

    useEffect(() => {
        getProductDataById(selectedProductID).then((products) => {
            if (products) {
                setProductName(products.name);
                setProductDescription(products.description);
                setProductPrice(products.price);
                setProductStock(products.stock);
                setProductURL(products.url);
            } else {
                console.log("Issue getting products");
            }
        });
    }, []);

    return (
        <View style={mainStyles.container}>
            <Header header="" />
            <ScrollView contentContainerStyle={productPageStyles.display}>
                <Image
                    resizeMode="contain"
                    source={{ uri: productURL !== "" ? productURL : undefined }}
                    style={productPageStyles.image}
                />
                <View style={productPageStyles.productDetails}>
                    <Text style={productPageStyles.productName}>
                        {productName}
                    </Text>
                    <Text style={productPageStyles.productShortDescription}>
                        This is where a short description will go.
                    </Text>
                    <View style={productPageStyles.productQuantitySection}>
                        <TouchableOpacity
                            style={productPageStyles.quantityButton}
                            onPress={decrease}
                        >
                            <Text style={productPageStyles.quantityButtonText}>
                                -
                            </Text>
                        </TouchableOpacity>
                        <Text style={productPageStyles.productQuantity}>
                            {(quantity < 10 ? "0" : "") + quantity.toString()}
                        </Text>
                        <TouchableOpacity
                            style={productPageStyles.quantityButton}
                            onPress={increase}
                        >
                            <Text style={productPageStyles.quantityButtonText}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={productPageStyles.productPrice}>
                        $
                        {(
                            Math.round(productPrice * 100 * quantity) / 100
                        ).toFixed(2)}
                    </Text>
                    <View style={productPageStyles.productNavBar}>
                        <Text style={productPageStyles.productNavBarSelected}>
                            Details
                        </Text>
                        <Text style={productPageStyles.productNavBarUnselected}>
                            Reviews
                        </Text>
                    </View>

                    <Text style={productPageStyles.productDescription}>
                        {productDescription}
                    </Text>
                </View>
            </ScrollView>
            <View style={productPageStyles.bottomSection}>
                <TouchableOpacity
                    style={productPageStyles.button}
                    onPress={() => router.replace("/dashboard/HomePage")}
                >
                    <Text style={productPageStyles.buttonText}>
                        Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
