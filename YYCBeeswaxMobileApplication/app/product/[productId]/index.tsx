import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Timestamp } from "firebase/firestore";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Header from "@/components/header";
import Popup from "@/components/popup";
import Reviews from "@/components/product/reviews";
import { colors, fonts } from "@/consts/styles";
import { getProductDataById } from "@/firebase/getCollections/getProductByID";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import { useUnsavedChangesCheck } from "@/lib/hooks/useUnsavedChangesCheck";
import { mainStyles } from "@/styles/mainStyles";
import { productPageStyles } from "@/styles/productPageStyles";

export default function Product() {
    const { t } = useTranslation();
    const { productId } = useLocalSearchParams();

    const [showPopup, setShowPopup] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [changedOptions, setChangedOptions] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFromCart, setIsLoadingFromCart] = useState(true);

    const [quantity, setQuantity] = useState(1);
    const [orignialQuantity, setOriginalQuantity] = useState(-1);

    const [dynamicPrice, setDynamicPrice] = useState(-1);
    const [dynamicStock, setDynamicStock] = useState(-1);

    const [product, setProduct] = useState<IProduct>({
        name: "",
        description: "",
        categories: [],
        price: 0,
        stock: 0,
        url: undefined,
        lastUpdated: Timestamp.fromDate(new Date()),
    });

    const [selectedDynamicVariant, setSelectedDynamicVariant] =
        useState<IDynamicVariant[]>();
    const [selectedMode, setSelectedMode] = useState(0);
    const [validDV, setValidDV] = useState(true);

    const buttonText = [t("Add to Cart"), t("Update Quantity in Cart")];
    const popupTitleText = [t("Success!"), t("Quantity Updated!")];
    const popupSubtitleText = [
        t("This item has been added to your cart!"),
        t("The quantity of this item has been updated in your cart!"),
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
                    cart[existingProductIndex].dynamicPrice = dynamicPrice;

                    const choices = selectedDynamicVariant?.map((variant) => {
                        return {
                            title: variant.title,
                            name: variant.name,
                        };
                    });
                    if (choices) {
                        cart[existingProductIndex].choices = choices;
                    }
                } else {
                    // Add the new product to the cart
                    const choices = selectedDynamicVariant?.map((variant) => {
                        return {
                            title: variant.title,
                            name: variant.name,
                        };
                    });

                    if (choices) {
                        cart.push({
                            productId,
                            quantity,
                            choices,
                            dynamicPrice,
                        });
                    } else {
                        cart.push({
                            productId,
                            quantity,
                            dynamicPrice,
                        });
                    }
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
            SecureStore.getItemAsync("cart").then(function (cartData) {
                const cart = cartData ? JSON.parse(cartData) : [];
                // Check if the product is already in the cart
                const existingProductIndex = cart.findIndex(
                    (item: any) => item.productId === productId,
                );
                if (existingProductIndex !== -1) {
                    setQuantity(cart[existingProductIndex].quantity);
                    setOriginalQuantity(cart[existingProductIndex].quantity);
                    setSelectedMode(1);
                    (async () => {
                        const products = await getProductDataById(
                            productId as string,
                        );
                        if (products) {
                            if (products.variantsDynamic) {
                                if (cart[existingProductIndex].choices) {
                                    const knownChoices: IDynamicVariant[] =
                                        cart[existingProductIndex].choices.map(
                                            (choice: {
                                                title: string;
                                                name: string;
                                            }) => {
                                                const matchingVariant =
                                                    products.variantsDynamic?.filter(
                                                        (e) =>
                                                            e.title ==
                                                            choice.title,
                                                    );

                                                let optPrice = -1;
                                                let optStock = -1;

                                                matchingVariant?.forEach(
                                                    (va) => {
                                                        const matchingOption =
                                                            va.options.filter(
                                                                (e) =>
                                                                    e.name ==
                                                                    choice.name,
                                                            );
                                                        optPrice =
                                                            matchingOption[0]
                                                                .price;
                                                        optStock =
                                                            matchingOption[0]
                                                                .stock;
                                                    },
                                                );

                                                const selection = {
                                                    name: choice.name,
                                                    price: optPrice,
                                                    stock: optStock,
                                                    title: choice.title,
                                                };

                                                return selection;
                                            },
                                        );
                                    setSelectedDynamicVariant(knownChoices);

                                    const currentPrice = knownChoices.reduce(
                                        (n, { price }) => n + price,
                                        0,
                                    );
                                    setDynamicPrice(
                                        currentPrice == 0
                                            ? products.price
                                            : currentPrice,
                                    );

                                    const minStock = knownChoices.reduce(
                                        (prev, curr) =>
                                            prev.stock < curr.stock
                                                ? prev
                                                : curr,
                                    ).stock;

                                    setDynamicStock(minStock);
                                    setValidDV(true);
                                }
                            }
                        }
                    })();
                }
                setIsLoadingFromCart(false);
            });
        }
    }, []);

    useEffect(() => {
        if (orignialQuantity == quantity) setChangesMade(false);
    }, [quantity]);

    function increase() {
        if (quantity < dynamicStock) {
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
            !changedOptions ||
            showPopup ||
            quantity == orignialQuantity ||
            (orignialQuantity == -1 && quantity == 1),
    );

    useEffect(() => {
        (async () => {
            const products = await getProductDataById(productId as string);
            if (products) {
                setProduct(products);
                setDynamicPrice(products.price);
                setDynamicStock(products.stock);
                if (products.variantsDynamic) {
                    setValidDV(false);
                    const placeholders = products.variantsDynamic.map(
                        (variant) => {
                            return {
                                name: "Select..",
                                price: -1,
                                stock: -1,
                                title: "",
                            };
                        },
                    );
                    setSelectedDynamicVariant(placeholders);
                }
                setIsLoading(false);
            }
        })();
    }, []);

    const [tab, setTab] = useState("details");

    const { getMoreReviews } = useReviews();

    function handleDynamicVariant(value: IDynamicVariant, index: number) {
        if (!selectedDynamicVariant) return;
        const tempVariant = selectedDynamicVariant;
        tempVariant[index] = value;
        setSelectedDynamicVariant(tempVariant);
        const currentPrice = tempVariant.reduce((n, { price }) => n + price, 0);
        setDynamicPrice(currentPrice == 0 ? product.price : currentPrice);

        const minStock = tempVariant.reduce((prev, curr) =>
            prev.stock < curr.stock ? prev : curr,
        ).stock;
        setDynamicStock(minStock);

        if (minStock < quantity && validDV) {
            setQuantity(minStock);
        }

        setValidDV(
            selectedDynamicVariant.filter(
                (e) => e.price == -1 || e.title == "" || e.stock == -1,
            ).length == 0,
        );

        setChangesMade(true);

        setChangedOptions(true);
    }

    if (isLoading || isLoadingFromCart) {
        return (
            <View style={mainStyles.spinnerOverlay}>
                <ActivityIndicator size="large" color={colors.yellow} />
            </View>
        );
    }

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
                                {t(
                                    "This is where a short description will go.",
                                )}
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
                                    (quantity == dynamicStock || !validDV) &&
                                        productPageStyles.buttonDisabled,
                                ]}
                                onPress={increase}
                                disabled={quantity == dynamicStock || !validDV}
                            >
                                <Text
                                    style={productPageStyles.quantityButtonText}
                                >
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={productPageStyles.productPriceVariantsContainer}
                    >
                        <Text style={productPageStyles.productPrice}>
                            $
                            {validDV
                                ? (dynamicPrice * quantity).toFixed(2)
                                : "---.00"}
                        </Text>
                        <View
                            style={productPageStyles.productVariantsContainer}
                        >
                            {selectedDynamicVariant &&
                                product?.variantsDynamic?.map(
                                    (variant, index) => (
                                        <View
                                            style={
                                                productPageStyles.variantContainer
                                            }
                                            key={
                                                variant.options[index].name +
                                                index.toString()
                                            }
                                        >
                                            <Text
                                                style={
                                                    productPageStyles.variantTitle
                                                }
                                            >
                                                {variant.title}
                                            </Text>

                                            <Dropdown
                                                data={variant.options.map(
                                                    (option) => ({
                                                        value: option,
                                                        label: option.name,
                                                    }),
                                                )}
                                                labelField="label"
                                                valueField="value"
                                                value={
                                                    selectedDynamicVariant[
                                                        index
                                                    ].name
                                                }
                                                onChange={(value) =>
                                                    handleDynamicVariant(
                                                        {
                                                            ...value.value,
                                                            title: variant.title,
                                                        },
                                                        index,
                                                    )
                                                }
                                                style={
                                                    productPageStyles.variantDropdown
                                                }
                                                placeholder={
                                                    selectedDynamicVariant[
                                                        index
                                                    ].name
                                                }
                                                placeholderStyle={
                                                    productPageStyles.variantDropdownText
                                                }
                                                selectedTextStyle={
                                                    productPageStyles.variantDropdownText
                                                }
                                                key={
                                                    variant.options[index]
                                                        .name + index.toString()
                                                }
                                                fontFamily={fonts.main}
                                            />
                                        </View>
                                    ),
                                )}
                        </View>
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
                            {t("Details")}
                        </Text>
                        {t(product.additionalInfo) && (
                            <Text
                                style={
                                    tab == "additionalInfo"
                                        ? productPageStyles.productNavBarSelected
                                        : productPageStyles.productNavBarUnselected
                                }
                                onPress={() => setTab("additionalInfo")}
                            >
                                t(Details)
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
                            {t("Reviews")}
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
                        ((orignialQuantity == quantity && !changedOptions) ||
                            !validDV) &&
                            productPageStyles.buttonDisabled,
                    ]}
                    onPress={addToCart}
                    disabled={
                        (orignialQuantity == quantity && !changedOptions) ||
                        !validDV
                    }
                >
                    <Text style={productPageStyles.buttonText}>
                        {buttonText[selectedMode]}
                    </Text>
                </TouchableOpacity>
            </View>
            <Popup
                visible={showPopup}
                changeVisibility={() => setShowPopup(false)}
                option1Text={t("Keep Shopping")}
                option2Text={t("Checkout Now")}
                option1Action={() => {
                    setChangesMade(false);
                    setChangedOptions(false);
                    setOriginalQuantity(quantity);
                    router.push("/dashboard/HomePage");
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
