import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, FlatList } from "react-native";
import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";
import ItemCard from "@/components/itemCard";
import { router } from "expo-router";
import Header from "@/components/header";
import { cartPageStyles } from "@/styles/cartPageStyles";
import { getProductData } from "../../firebase/getCollections/getProducts"; // Import the function to fetch product details

interface CartItem {
    id: number;
    productId: string;
}

export default function CartPage() {
    const [emptyCart, setEmptyCart] = useState(true);
    const [cartItems, setCartItems] = useState<CartItem[]>([
        // Replace this with your cart items fetched from the database
        { id: 1, productId: "Product 1" },
        { id: 2, productId: "Mason candle beeswax" },
    ]);

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

    if (!emptyCart) {
        return (
            <View style={cartPageStyles.container}>
                <Header header="Your Cart" noBackArrow={true} />
                <Text style={cartPageStyles.messageText}>
                    Your cart is empty! Go ahead and check out our products.
                </Text>
                <Image
                    resizeMode="contain"
                    source={require("@/assets/shopping.gif")}
                    style={cartPageStyles.gif}
                />
                <TouchableOpacity
                    style={cartPageStyles.button}
                    onPress={() => router.replace("./HomePage")}
                >
                    <Text style={cartPageStyles.buttonText}>Shop Now</Text>
                </TouchableOpacity>
                <Navbar currentPage="Cart" />
            </View>
        );
    } else {
        return (
            <View style={cartPageStyles.container}>
                <View style={cartPageStyles.headerContainer}>
                    <Header header="Your Cart" />
                </View>
                {allProducts.map((product: any) => (
                    <View
                        key={product.id}
                        style={cartPageStyles.productContainer}
                    >
                        <ItemCard key={product.id} image={product.data.url} />
                    </View>
                ))}
                <Navbar currentPage="Cart" />
            </View>
        );
    }
}
