import { useFocusEffect } from "@react-navigation/native";
import {
    PaymentSheet,
    StripeProvider,
    useStripe,
} from "@stripe/stripe-react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { getProductData } from "../../firebase/getCollections/getProducts";

import Button from "@/components/button";
import CartProductCard from "@/components/cards/cartProductCard";
import TotalBillCard from "@/components/cards/totalBillCard";
import Header from "@/components/header";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { newOrder } from "@/firebase/setCollections/newOrder";
import { cartPageStyles } from "@/styles/cartPageStyles";
import { totalBillCardStyles } from "@/styles/components/totalBillCardStyles";

const API_URL = `http://${process.env.EXPO_PUBLIC_LOCAL_IP}:3000`;
const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_PUBLISHABLE_KEY;

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalBill, setTotalBill] = useState(0);
    const [stripeCustomerId, setStripeCustomerId] = useState("");
    const [disableButton, setDisableButton] = useState(true);
    const [loading, setLoading] = useState(false);

    const { user } = useUser();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const gatherCustomerId = async () => {
        //Find the users stripe id if it exists, allow them to pay if its found
        if (user?.uid) {
            user.reload();
            const userDetails = await getUserById(user.uid);
            if (userDetails?.customerId) {
                setStripeCustomerId(userDetails.customerId);
                setDisableButton(false);
            }
        }
    };

    gatherCustomerId();

    const calculateTotalItemsCost = (items: any[]) => {
        return items.reduce(
            (total, item) => total + item.quantity * item.data.price,
            0,
        );
    };

    const calculateGSTCost = (items: any[]) => {
        const totalItemsCost = calculateTotalItemsCost(items) + 10; // added the shipping cost
        const gstRate = 0.05;
        return totalItemsCost * gstRate;
    };

    const calculateTotalBill = (items: any[]) => {
        const totalItemsCost = calculateTotalItemsCost(items);
        const shippingFee = 10; // Set your shipping fee
        const gstCost = calculateGSTCost(items);

        return totalItemsCost + shippingFee + gstCost;
    };

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        setCartItems((prevCartItems) => {
            return prevCartItems.map((item) => {
                if (item.id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const handleRemoveProduct = async (productId: string) => {
        try {
            const cartData = await SecureStore.getItemAsync("cart");

            if (cartData) {
                const parsedCart = JSON.parse(cartData) as {
                    productId: string;
                    quantity: number;
                }[];

                const updatedCart = parsedCart.filter(
                    (item) => item.productId !== productId,
                );

                await SecureStore.setItemAsync(
                    "cart",
                    JSON.stringify(updatedCart),
                );
            }
        } catch (error) {
            console.error("Error removing product from SecureStore:", error);
        }

        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== productId),
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchCartData = async () => {
                try {
                    const cartData = await SecureStore.getItemAsync("cart");

                    if (cartData) {
                        const parsedCart = JSON.parse(cartData) as {
                            productId: string;
                            quantity: number;
                        }[];
                        const productDetails = await Promise.all(
                            parsedCart.map(async ({ productId, quantity }) => {
                                try {
                                    const products = await getProductData();
                                    if (products) {
                                        const product = products.find(
                                            (product: { id: string }) =>
                                                product.id === productId,
                                        );

                                        if (product) {
                                            return {
                                                ...product,
                                                quantity,
                                            };
                                        } else {
                                            console.warn(
                                                `Product with ID ${productId} not found.`,
                                            );
                                            return null;
                                        }
                                    } else {
                                        console.error("Products is undefined.");
                                        return null;
                                    }
                                } catch (error) {
                                    console.error(
                                        "Error fetching products:",
                                        error,
                                    );
                                    return null;
                                }
                            }),
                        );
                        const filteredProductDetails = productDetails.filter(
                            (product) => product !== null,
                        );

                        setCartItems(filteredProductDetails);
                    } else {
                    }
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            };

            fetchCartData();
        }, []),
    );

    const parseOrder = (items: any[]) => {
        if (!items) return;
        // eslint-disable-next-line prefer-const
        let parsedProducts: IOrderProduct[] = [];
        const today = new Date();
        items.forEach((item) => {
            const orderProduct = {
                amount: item.quantity,
                name: item.data.name,
                costPer: item.data.price,
            };
            parsedProducts.push(orderProduct);
        });
        return {
            date: today,
            total: totalBill,
            products: parsedProducts,
        } as IOrder;
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            Alert.alert(`${error.code}`, error.message);
        } else {
            const order = parseOrder(cartItems);

            if (user?.uid && order) {
                await newOrder(user?.uid, order);
            }
            router.push("/checkout/ReviewInfoPage");
            //Empty the cart on successful purchase
            await SecureStore.setItemAsync("cart", JSON.stringify([]));
            setCartItems([] as any[]);
        }
    };

    const fetchPaymentSheetParams = async () => {
        let customerIdFromDatabase = "";
        if (user?.uid) {
            const userDetails = await getUserById(user.uid);
            if (userDetails?.customerId)
                customerIdFromDatabase = userDetails.customerId;
        }

        const totalValueCart = calculateTotalBill(cartItems);

        setTotalBill(totalValueCart - calculateGSTCost(cartItems) - 10);
        //Need to send the price to the server as a string without a decimal point
        //e.g. $75.30 ==> 7530
        const cartValueString = (Math.round(totalValueCart * 100) / 100)
            .toFixed(2)
            .replace(".", "");

        const response = await fetch(`${API_URL}/payment-sheet`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customerIdFromDatabase,
                cartValueString,
            }),
        });

        const { paymentIntent, ephemeralKey, customer, errorPayment } =
            await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
            errorPayment,
        };
    };

    const fetchCustomerData = async (custID: string) => {
        //Use to load the billing address with info from the shipping address
        const response = await fetch(`${API_URL}/customer-data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                custID,
            }),
        });
        const { retrievedShippingInfo, error } = await response.json();
        if (error) console.log(error);
        return {
            retrievedShippingInfo,
        };
    };

    const initializePaymentSheet = async () => {
        try {
            const { paymentIntent, ephemeralKey, customer, errorPayment } =
                await fetchPaymentSheetParams();
            if (errorPayment) {
                console.log(errorPayment);
                return;
            }

            const { retrievedShippingInfo } = await fetchCustomerData(customer);

            const { error } = await initPaymentSheet({
                merchantDisplayName: "Example, Inc.",
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
                //methods that complete payment after a delay, like SEPA Debit and Sofort.
                allowsDelayedPaymentMethods: false,
                defaultBillingDetails: {
                    email: retrievedShippingInfo.email,
                    name: retrievedShippingInfo.name,
                    phone: retrievedShippingInfo.phone,
                    address: {
                        line1: retrievedShippingInfo.line1,
                        line2: retrievedShippingInfo.line2,
                        city: retrievedShippingInfo.city,
                        state: retrievedShippingInfo.state,
                        country: retrievedShippingInfo.country,
                        postalCode: retrievedShippingInfo.postalCode,
                    },
                },
                billingDetailsCollectionConfiguration: {
                    name: PaymentSheet.CollectionMode.ALWAYS,
                    email: PaymentSheet.CollectionMode.ALWAYS,
                    address: PaymentSheet.AddressCollectionMode.FULL,
                    attachDefaultsToPaymentMethod: true,
                },
            });
            if (error) console.log(error);
            if (!error) setLoading(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //Everytime an item changes in the cart, and the stripe id is found, re-init the payment sheet
        if (stripeCustomerId) initializePaymentSheet();
    }, [cartItems]);

    if (cartItems.length == 0) {
        return (
            <View style={cartPageStyles.container}>
                <Header header="Your Cart" noBackArrow />
                <Text style={cartPageStyles.messageText}>
                    Your cart is empty! Go ahead and check out our products.
                </Text>
                <Image
                    contentFit="contain"
                    source={require("@/assets/shopping.gif")}
                    style={cartPageStyles.gif}
                />
                <TouchableOpacity
                    style={cartPageStyles.buttonTouchableOpacity}
                    onPress={() => router.push("/dashboard/HomePage")}
                >
                    <Text style={cartPageStyles.buttonText}>Shop Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    if (!user) {
        //If the user isn't signed in, can't link a stripe id to their account, thus they must be signed in
        return (
            <View style={cartPageStyles.container}>
                <Header header="Your Cart" noBackArrow />

                <Text style={cartPageStyles.messageText}>
                    You are not logged in. Please log in to an account to view
                    your cart.
                </Text>
                <TouchableOpacity
                    style={cartPageStyles.buttonTouchableOpacity}
                    onPress={() => router.push("/auth/login")}
                >
                    <Text style={cartPageStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={cartPageStyles.signUpContainer}>
                    <Text style={cartPageStyles.signUpText}>
                        Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={cartPageStyles.signUpLink}
                            onPress={() => router.push("/auth/signup")}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        //Here there's at least 1 item in the cart, and the stripe id is found
        <View style={cartPageStyles.container}>
            <StripeProvider publishableKey={PUBLISHABLE_KEY ?? ""}>
                <View>
                    <Header header="Your Cart" noBackArrow />
                    <Image
                        contentFit="contain"
                        source={
                            stripeCustomerId == ""
                                ? require("@/assets/cartProgress/0.png")
                                : require("@/assets/cartProgress/2.png")
                        }
                        style={cartPageStyles.topImageContainer}
                    />
                    <View style={cartPageStyles.productsContainer}>
                        <ScrollView
                            contentContainerStyle={
                                cartPageStyles.scrollViewContainer
                            }
                        >
                            {cartItems.map((product: any) => (
                                <CartProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.data.name}
                                    image={product.data.url}
                                    price={product.data.price}
                                    quantity={product.quantity}
                                    onQuantityChange={handleQuantityChange}
                                    onRemoveProduct={handleRemoveProduct}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {cartItems.length > 0 && (
                        <View style={totalBillCardStyles.cardContainer}>
                            <TotalBillCard
                                totalItemsCost={calculateTotalItemsCost(
                                    cartItems,
                                )}
                                shippingCost={10}
                                gstCost={calculateGSTCost(cartItems)}
                                totalBill={calculateTotalBill(cartItems)}
                            />
                            {stripeCustomerId == "" && (
                                <Button
                                    style={cartPageStyles.button}
                                    title="Add Shipping Details"
                                    onPress={() => {
                                        router.push(
                                            "/checkout/ShippingInfoPage",
                                        );
                                    }}
                                />
                            )}
                            {stripeCustomerId != "" && (
                                <Button
                                    title="View Shipping Details"
                                    onPress={() => {
                                        router.push(
                                            "/checkout/ShippingInfoPage",
                                        );
                                    }}
                                    style={cartPageStyles.button}
                                />
                            )}
                            <Button
                                title="Continue to Payment"
                                style={[
                                    cartPageStyles.button,
                                    (disableButton || !loading) &&
                                        cartPageStyles.buttonDisabled,
                                ]}
                                disabled={disableButton || !loading}
                                onPress={openPaymentSheet}
                            />
                        </View>
                    )}
                </View>
            </StripeProvider>
        </View>
    );
}
