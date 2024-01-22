import { router, useLocalSearchParams } from "expo-router";
import React, { Suspense, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Header from "@/components/header";
import { getProductDataById } from "@/firebase/getCollections/getProductByID";
import { mainStyles } from "@/styles/mainStyles";
import { productPageStyles } from "@/styles/productPageStyles";

interface IProduct {
    name: string;
    description: string;
    categories: string[];
    variants?: {
        name: string;
        values: string[];
    };
    price: number;
    stock: number;
    url?: string;
}

export default function ProductId() {
    const { productId } = useLocalSearchParams() as Record<string, string>;

    const [product, setProduct] = useState<IProduct>({
        name: "",
        description: "",
        categories: [],
        price: 0,
        stock: 0,
        url: undefined,
    });
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<string>();

    function increase() {
        if (quantity < product.stock) setQuantity(quantity + 1);
    }

    function decrease() {
        if (quantity > 1) setQuantity(quantity - 1);
    }

    useEffect(() => {
        (async () => {
            const products = (await getProductDataById(productId)) as
                | IProduct
                | undefined;
            if (products) {
                setProduct(products);
                if (products.variants) {
                    setSelectedVariant(products.variants.values[0]);
                }
            } else {
                console.log("Issue getting products");
            }
        })();
    }, []);

    return (
        <View style={mainStyles.container}>
            <Header header={product.name} />
            <ScrollView contentContainerStyle={productPageStyles.display}>
                <Suspense fallback={<Text>Loading...</Text>}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: product.url }}
                        style={productPageStyles.image}
                    />
                </Suspense>
                <View style={productPageStyles.productDetails}>
                    <View style={productPageStyles.productHeadingContainer}>
                        <View>
                            <Text style={productPageStyles.productName}>
                                {product.name}
                            </Text>
                            <Text
                                style={
                                    productPageStyles.productShortDescription
                                }
                            >
                                This is where a short description will go.
                            </Text>
                        </View>
                        <View style={productPageStyles.productQuantitySection}>
                            <TouchableOpacity
                                style={productPageStyles.quantityButton}
                                onPress={decrease}
                            >
                                <Text
                                    style={productPageStyles.quantityButtonText}
                                >
                                    -
                                </Text>
                            </TouchableOpacity>
                            <Text style={productPageStyles.productQuantity}>
                                {quantity.toString().padStart(2, "0")}
                            </Text>
                            <TouchableOpacity
                                style={productPageStyles.quantityButton}
                                onPress={increase}
                            >
                                <Text
                                    style={productPageStyles.quantityButtonText}
                                >
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={productPageStyles.productPriceContainer}>
                        <Text style={productPageStyles.productPrice}>
                            ${(product.price * quantity).toFixed(2)}
                        </Text>
                        {product.variants && (
                            <View
                                style={
                                    productPageStyles.productVariantsContainer
                                }
                            >
                                <Text
                                    style={
                                        productPageStyles.productVariantsTitle
                                    }
                                >
                                    {product.variants.name}
                                </Text>
                                <Dropdown
                                    data={product.variants.values.map(
                                        (value) => ({
                                            label: value,
                                            value,
                                        }),
                                    )}
                                    maxHeight={200}
                                    style={productPageStyles.productDropdown}
                                    placeholder="Select"
                                    selectedTextStyle={
                                        productPageStyles.productDropdownText
                                    }
                                    labelField="label"
                                    valueField="value"
                                    value={selectedVariant}
                                    onChange={({ value }) => {
                                        setSelectedVariant(value);
                                    }}
                                />
                            </View>
                        )}
                    </View>
                    <View style={productPageStyles.productNavBar}>
                        <Text style={productPageStyles.productNavBarSelected}>
                            Details
                        </Text>
                        <Text style={productPageStyles.productNavBarUnselected}>
                            Reviews
                        </Text>
                    </View>

                    <Text style={productPageStyles.productDescription}>
                        {product.description}
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
