import { useFocusEffect } from "@react-navigation/native";
import {
    PaymentSheet,
    StripeProvider,
    useStripe,
} from "@stripe/stripe-react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { getProductData } from "../../firebase/getCollections/getProducts";

import Button from "@/components/button";
import CartProductCard from "@/components/cards/cartProductCard";
import TotalBillCard, {
    LoadingTotalBillCard,
} from "@/components/cards/totalBillCard";
import Header from "@/components/header";
import { colors } from "@/consts/styles";
import { db } from "@/firebase/config";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { newOrder } from "@/firebase/setCollections/newOrder";
import { cartPageStyles } from "@/styles/cartPageStyles";
import { totalBillCardStyles } from "@/styles/components/totalBillCardStyles";

const API_URL = `http://${process.env.EXPO_PUBLIC_LOCAL_IP}:3000`;
const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_PUBLISHABLE_KEY;

export default function CartPage() {
    const [shippingInfo, setShippingInfo] = useState("");
    const [ICartItems, setICartItems] = useState<ICartItem[]>([]);
    const [stripeCustomerId, setStripeCustomerId] = useState("");
    const [disableButton, setDisableButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [taxProvince, setTaxProvince] = useState("Alberta");
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    const [isUpdatedPageLoading, setIsUpdatedPageLoading] = useState(false);
    const [discountPopupVisible, setDiscountPopupVisible] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [discountCodeApplied, setDiscountCodeApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountType, setDiscountType] = useState(true);

    const { user } = useUser();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const applyDiscount = async () => {
        try {
            const querySnapshot = await getDocs(
                query(
                    collection(db, "discounts"),
                    where("code", "==", discountCode),
                ),
            );
            if (!querySnapshot.empty) {
                setDiscountCodeApplied(true);
                const discountDoc = querySnapshot.docs[0];
                const discountData = discountDoc.data();
                setDiscountAmount(discountData.amount);
                setDiscountType(discountData.type);
                setDiscountCodeApplied(true);
                setDiscountCode("");
                Alert.alert(
                    "Success!",
                    "This discount code has been applied to your cart.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                setDiscountPopupVisible(false);
                            },
                        },
                    ],
                );
            } else {
                Alert.alert(
                    "No Discount Found",
                    "There is no discount code matching the one you entered.",
                    [
                        {
                            text: "OK",
                        },
                    ],
                );
            }
        } catch (error) {
            console.error("Error finding document ", error);
        }
    };

    const calculateDiscountedBill = (items: ICartItem[]) => {
        const subTotal = items.reduce(
            (total, item) => total + item.quantity * item.dynamicPrice,
            0,
        );
        if (discountType) {
            const discount = subTotal * (discountAmount / 100);
            return discount >= subTotal ? 0 : subTotal - discount;
        } else {
            return discountAmount >= subTotal ? 0 : subTotal - discountAmount;
        }
    };

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

    const calculateTotalItemsCost = (items: ICartItem[]) => {
        if (discountCodeApplied) {
            return calculateDiscountedBill(items);
        }
        return items.reduce(
            (total, item) => total + item.quantity * item.dynamicPrice,
            0,
        );
    };

    const calculateGSTCost = (items: ICartItem[]) => {
        const totalItemsCost = calculateTotalItemsCost(items);
        const preTaxPrice = totalItemsCost + 10; // added the shipping cost

        const taxRates: Record<string, number> = {
            Alberta: 0.05,
            "British Columbia": 0.12,
            Saskatchewan: 0.11,
            Manitoba: 0.12,
            Ontario: 0.13,
            Quebec: 0.14975,
            "New Brunswick": 0.15,
            "Newfoundland and Labrador": 0.15,
            "Prince Edward Island": 0.15,
            "Nova Scotia": 0.15,
        };
        const taxRate = taxRates[taxProvince] || 0.05;
        return preTaxPrice * taxRate;
    };

    const calculateTotalBill = (items: ICartItem[]) => {
        const preTaxPrice = calculateTotalItemsCost(items);

        const shippingFee = 10; // Set your shipping fee
        const gstCost = calculateGSTCost(items);

        return preTaxPrice + shippingFee + gstCost;
    };

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        setICartItems((prevICartItems) => {
            return prevICartItems?.map((item) => {
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

        setICartItems(
            (prevICartItems) =>
                prevICartItems?.filter((item) => item.id !== productId),
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchCartData = async () => {
                try {
                    const cartData = await SecureStore.getItemAsync("cart");
                    if (!cartData) return;
                    const parsedCart = JSON.parse(cartData) as {
                        productId: string;
                        quantity: number;
                        choices?: { title: string; name: string }[];
                        dynamicPrice: number;
                    }[];

                    const products: { id: string; data: IProduct }[] =
                        await getProductData();

                    if (!products) {
                        console.error("Products is undefined.");
                        return;
                    }

                    const productDetails: ICartItem[] = await Promise.all(
                        parsedCart.map(
                            async ({
                                productId,
                                quantity,
                                choices,
                                dynamicPrice,
                            }) => {
                                const product = products.find(
                                    (product) => product.id === productId,
                                );

                                if (!product) {
                                    console.warn(
                                        `Product with ID ${productId} not found.`,
                                    );
                                    return {
                                        id: "",
                                        quantity: 0,
                                        data: {
                                            categories: [],
                                            description: "",
                                            name: "",
                                            stock: 0,
                                            url: "",
                                        },
                                        dynamicPrice: 0,
                                    };
                                }

                                const item: ICartItem = {
                                    id: product.id,
                                    quantity,
                                    data: {
                                        categories: product.data.categories,
                                        description: product.data.description,
                                        name: product.data.name,
                                        stock: product.data.stock,
                                        url: product.data.url ?? "",
                                    },
                                    dynamicPrice,
                                };

                                if (choices) item.choices = choices;

                                return item;
                            },
                        ),
                    );

                    const filteredProductDetails = productDetails.filter(
                        (product) => product !== null,
                    );
                    setICartItems(filteredProductDetails);
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            };

            fetchCartData();
        }, [discountCode]),
    );

    const parseOrder = (items: any[]) => {
        if (!items) return;
        const parsedProducts: IOrderProduct[] = [];
        const today = new Date();
        items.forEach((item) => {
            const orderProduct = {
                amount: item.quantity,
                name: item.data.name,
                costPer: item.dynamicPrice,
                choices: item?.choices || [],
            };
            parsedProducts.push(orderProduct);
        });
        return {
            date: today,
            total: calculateTotalItemsCost(items),
            products: parsedProducts,
            shippingInfo,
            taxes: calculateGSTCost(items),
            discount: discountAmount,
        } as IOrder;
    };

    const openPaymentSheet = async () => {
        setIsPaymentLoading(true);
        await initializePaymentSheet();
        setIsPaymentLoading(false);
        const { error } = await presentPaymentSheet();
        if (error) {
            Alert.alert(`${error.code}`, error.message);
        } else {
            const order = parseOrder(ICartItems);

            if (user?.uid && order) {
                await newOrder(user?.uid, order);
            }
            router.push("/checkout/ReviewInfoPage");
            setDiscountCodeApplied(false);
            setDiscountAmount(0);
            setDiscountCode("");
            setDiscountType(true);
            //Empty the cart on successful purchase
            await SecureStore.setItemAsync("cart", JSON.stringify([]));
            setICartItems([] as any[]);
        }
    };

    const fetchPaymentSheetParams = async () => {
        let customerIdFromDatabase = "";
        if (user?.uid) {
            const userDetails = await getUserById(user.uid);
            if (userDetails?.customerId)
                customerIdFromDatabase = userDetails.customerId;
        }

        const totalValueCart = calculateTotalBill(ICartItems);

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
        const addressString =
            retrievedShippingInfo.line1 +
            " " +
            retrievedShippingInfo.line2 +
            ", " +
            retrievedShippingInfo.city +
            ", " +
            retrievedShippingInfo.province +
            ", " +
            retrievedShippingInfo.postalCode;
        setShippingInfo(addressString);
        setTaxProvince(retrievedShippingInfo.province);
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
            setIsUpdatedPageLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //Everytime an item changes in the cart, and the stripe id is found, re-init the payment sheet
        if (stripeCustomerId) initializePaymentSheet();
    }, [ICartItems]);

    if (ICartItems.length == 0) {
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
            <View>
                <View style={cartPageStyles.container}>
                    <Header header="Your Cart" noBackArrow />

                    <Text style={cartPageStyles.messageText}>
                        You are not logged in. Please log in to an account to
                        view your cart.
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
            </View>
        );
    }

    return (
        //Here there's at least 1 item in the cart, and the stripe id is found
        <View style={cartPageStyles.container}>
            {isPaymentLoading && (
                <View style={cartPageStyles.spinnerOverlay}>
                    <ActivityIndicator size="large" color={colors.yellow} />
                </View>
            )}
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
                            {ICartItems.map((product: any) => (
                                <CartProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.data.name}
                                    image={product.data.url}
                                    price={product.dynamicPrice}
                                    quantity={product.quantity}
                                    onQuantityChange={handleQuantityChange}
                                    onRemoveProduct={handleRemoveProduct}
                                    choices={product?.choices}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {ICartItems.length > 0 && (
                        <View style={totalBillCardStyles.cardContainer}>
                            {isUpdatedPageLoading ? (
                                <LoadingTotalBillCard />
                            ) : (
                                <TotalBillCard
                                    totalItemsCost={calculateTotalItemsCost(
                                        ICartItems,
                                    )}
                                    shippingCost={10}
                                    gstCost={calculateGSTCost(ICartItems)}
                                    totalBill={calculateTotalBill(ICartItems)}
                                    taxProvince={taxProvince}
                                    discountAmount={discountAmount}
                                    discountType={discountType}
                                />
                            )}
                            <TouchableOpacity
                                onPress={() => setDiscountPopupVisible(true)}
                            >
                                <Text style={cartPageStyles.discountCodeLink}>
                                    Add Discount Code
                                </Text>
                            </TouchableOpacity>
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
                                        setIsUpdatedPageLoading(true);
                                    }}
                                    style={cartPageStyles.button}
                                />
                            )}
                            <Button
                                title="Continue to Payment"
                                style={[
                                    cartPageStyles.button,
                                    (disableButton ||
                                        !loading ||
                                        isUpdatedPageLoading) &&
                                        cartPageStyles.buttonDisabled,
                                ]}
                                disabled={
                                    disableButton ||
                                    !loading ||
                                    isUpdatedPageLoading
                                }
                                onPress={openPaymentSheet}
                            />
                        </View>
                    )}
                </View>
                <Modal
                    animationType="slide"
                    transparent
                    visible={discountPopupVisible}
                    onRequestClose={() => {
                        setDiscountPopupVisible(!discountPopupVisible);
                    }}
                >
                    <View style={[cartPageStyles.codePopupContainer]}>
                        <TouchableWithoutFeedback
                            onPress={() => setDiscountPopupVisible(false)}
                        >
                            <View style={cartPageStyles.touchableOverlay} />
                        </TouchableWithoutFeedback>
                        <View style={cartPageStyles.popupView}>
                            <View style={cartPageStyles.popupHeaderContainer}>
                                <Text style={cartPageStyles.headerTitle}>
                                    Add Discount Code
                                </Text>
                            </View>
                            <View style={cartPageStyles.inputContainer}>
                                <TextInput
                                    style={cartPageStyles.codeInput}
                                    placeholder="Discount Code"
                                    placeholderTextColor="grey"
                                    value={discountCode}
                                    onChangeText={setDiscountCode}
                                />
                                <TouchableOpacity
                                    style={[cartPageStyles.discountButton]}
                                    onPress={() => applyDiscount()}
                                >
                                    <Text
                                        style={
                                            cartPageStyles.discountButtonText
                                        }
                                    >
                                        Apply Code
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </StripeProvider>
        </View>
    );
}
