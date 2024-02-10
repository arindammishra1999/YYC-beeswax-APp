import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { Suspense, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Header from "@/components/header";
import Reviews from "@/components/product/reviews";
import { getProductDataById } from "@/firebase/getCollections/getProductByID";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import { mainStyles } from "@/styles/mainStyles";
import { productPageStyles } from "@/styles/productPageStyles";

export default function Product() {
    const { productId } = useLocalSearchParams();

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
            const products = await getProductDataById(productId as string);
            if (products) {
                setProduct(products);
                if (products.variants) {
                    setSelectedVariant(products.variants.values[0]);
                }
            }
        })();
    }, []);

    const [tab, setTab] = useState("details");

    const { getMoreReviews } = useReviews();

    return (
        <View style={mainStyles.container}>
            <Header header={product.name} />
            <ScrollView
                contentContainerStyle={productPageStyles.display}
                onScrollEndDrag={getMoreReviews}
            >
                <Suspense fallback={<Text>Loading...</Text>}>
                    <Image
                        contentFit="cover"
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
                        <Text
                            style={
                                tab == "details"
                                    ? productPageStyles.productNavBarSelected
                                    : productPageStyles.productNavBarUnselected
                            }
                            onPress={() => setTab("details")}
                        >
                            Details
                        </Text>
                        {product.additionalInfo && (
                            <Text
                                style={
                                    tab == "additionalInfo"
                                        ? productPageStyles.productNavBarSelected
                                        : productPageStyles.productNavBarUnselected
                                }
                                onPress={() => setTab("additionalInfo")}
                            >
                                Details
                            </Text>
                        )}
                        <Text
                            style={
                                tab == "reviews"
                                    ? productPageStyles.productNavBarSelected
                                    : productPageStyles.productNavBarUnselected
                            }
                            onPress={() => setTab("reviews")}
                        >
                            Reviews
                        </Text>
                    </View>
                    {tab == "details" && (
                        <Text style={productPageStyles.productDescription}>
                            {product.description}
                        </Text>
                    )}
                    {tab == "additionalInfo" && <></>}
                    {tab == "reviews" && (
                        <Reviews
                            productId={productId as string}
                            product={product}
                        />
                    )}
                </View>
            </ScrollView>
            <View style={productPageStyles.bottomSection}>
                <TouchableOpacity
                    style={productPageStyles.button}
                    onPress={() => router.push("/dashboard/HomePage")}
                >
                    <Text style={productPageStyles.buttonText}>
                        Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
