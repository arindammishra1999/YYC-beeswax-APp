import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { Suspense, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Header from "@/components/header";
import Popup from "@/components/popup";
import Reviews from "@/components/product/reviews";
import { getProductDataById } from "@/firebase/getCollections/getProductByID";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import { useUnsavedChangesCheck } from "@/lib/hooks/useUnsavedChangesCheck";
import { mainStyles } from "@/styles/mainStyles";
import { productPageStyles } from "@/styles/productPageStyles";

export default function Product() {
    const { productId } = useLocalSearchParams();

    const [showPopup, setShowPopup] = useState(false);
    const [changesMade, setChangesMade] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [orignialQuantity, setOriginalQuantity] = useState(-1);

    const [product, setProduct] = useState<IProduct>({
        name: "",
        description: "",
        categories: [],
        price: 0,
        stock: 0,
        url: undefined,
    });

    const [selectedVariant, setSelectedVariant] = useState<string>();
    const [selectedMode, setSelectedMode] = useState(0);

    const buttonText = ["Add to Cart", "Update Quantity in Cart"];
    const popupTitleText = ["Success!", "Quantity Updated!"];
    const popupSubtitleText = [
        "This item has been added to your cart!",
        "The quantity of this item has been updated in your cart!",
    ];

    const addToCart = () => {
        // Ensure that product ID and quantity are present
        if (productId && quantity > 0) {
            // Get existing cart data from SecureStore or initialize an empty array
            SecureStore.getItemAsync("cart").then((cartData) => {
                const cart = cartData ? JSON.parse(cartData) : [];
                // Check if the product is already in the cart
                const existingProductIndex = cart.findIndex(
                    (item: any) => item.productId === productId,
                );

                if (existingProductIndex !== -1) {
                    // Update quantity if the product is already in the cart
                    cart[existingProductIndex].quantity = quantity;
                } else {
                    // Add the new product to the cart
                    cart.push({
                        productId,
                        quantity,
                    });
                }

                // Save the updated cart data to SecureStore
                SecureStore.setItemAsync("cart", JSON.stringify(cart)).then(
                    () => {
                        setShowPopup(true);
                    },
                );
            });
        }
    };

    useEffect(() => {
        if (productId) {
            SecureStore.getItemAsync("cart").then((cartData) => {
                const cart = cartData ? JSON.parse(cartData) : [];
                // Check if the product is already in the cart
                const existingProductIndex = cart.findIndex(
                    (item: any) => item.productId === productId,
                );
                if (existingProductIndex !== -1) {
                    setQuantity(cart[existingProductIndex].quantity);
                    setOriginalQuantity(cart[existingProductIndex].quantity);
                    setSelectedMode(1);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (orignialQuantity == quantity) setChangesMade(false);
    }, [quantity]);

    function increase() {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
            setChangesMade(true);
        }
    }

    function decrease() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setChangesMade(true);
        }
    }

    useUnsavedChangesCheck(
        !changesMade ||
            showPopup ||
            quantity == orignialQuantity ||
            (orignialQuantity == -1 && quantity == 1),
    );

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
                        <View style={productPageStyles.productTitleSection}>
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
                                style={[
                                    productPageStyles.quantityButton,
                                    quantity == 1 &&
                                        productPageStyles.buttonDisabled,
                                ]}
                                onPress={decrease}
                                disabled={quantity == 1}
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
                                style={[
                                    productPageStyles.quantityButton,
                                    quantity == product.stock &&
                                        productPageStyles.buttonDisabled,
                                ]}
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
                    style={[
                        productPageStyles.button,
                        orignialQuantity == quantity &&
                            productPageStyles.buttonDisabled,
                    ]}
                    onPress={addToCart}
                    disabled={orignialQuantity == quantity}
                >
                    <Text style={productPageStyles.buttonText}>
                        {buttonText[selectedMode]}
                    </Text>
                </TouchableOpacity>
            </View>
            <Popup
                visible={showPopup}
                changeVisibility={() => setShowPopup(false)}
                option1Text="Keep Shopping"
                option2Text="Checkout Now"
                option1Action={() => {
                    setChangesMade(false);
                    setOriginalQuantity(quantity);
                    setShowPopup(false);
                }}
                option2Action={() => {
                    setChangesMade(false);
                    router.push("/dashboard/CartPage");
                }}
                title={popupTitleText[selectedMode]}
                subTitle={popupSubtitleText[selectedMode]}
            />
        </View>
    );
}
