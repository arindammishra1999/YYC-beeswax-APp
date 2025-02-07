import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import { useTranslation } from "react-i18next";
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

import Button from "@/components/button";
import CartProductCard from "@/components/cards/cartProductCard";
import TotalBillCard, {
    LoadingTotalBillCard,
} from "@/components/cards/totalBillCard";
import Header from "@/components/header";
import { colors } from "@/consts/styles";
import { db } from "@/firebase/config";
import { getProductDataById } from "@/firebase/getCollections/getProductByID";
import { getProductData } from "@/firebase/getCollections/getProducts";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { newOrder } from "@/firebase/setCollections/newOrder";
import { cartPageStyles } from "@/styles/cartPageStyles";
import { totalBillCardStyles } from "@/styles/components/totalBillCardStyles";
import { mainStyles } from "@/styles/mainStyles";

const API_URL = `http://${process.env.EXPO_PUBLIC_LOCAL_IP}:3000`;
const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_PUBLISHABLE_KEY;

export default function CartPage() {
    const { t } = useTranslation();
    const [shippingInfo, setShippingInfo] = useState("");
    const [ICartItems, setICartItems] = useState<ICartItem[]>([]);
    const [stripeCustomerId, setStripeCustomerId] = useState("");
    const [disableButton, setDisableButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [taxProvince, setTaxProvince] = useState("Alberta");
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdatedPageLoading, setIsUpdatedPageLoading] = useState(false);
    const [discountPopupVisible, setDiscountPopupVisible] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [discountCodeApplied, setDiscountCodeApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountType, setDiscountType] = useState(true);
    const navigation = useNavigation();

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
                    t("Success!"),
                    t("This discount code has been applied to your cart."),
                    [
                        {
                            text: t("OK"),
                            onPress: () => {
                                setDiscountPopupVisible(false);
                            },
                        },
                    ],
                );
            } else {
                Alert.alert(
                    t("No Discount Found"),
                    t(
                        "There is no discount code matching the one you entered.",
                    ),
                    [
                        {
                            text: t("OK"),
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

    const handleQuantityChange = async (
        productId: string,
        newQuantity: number,
    ) => {
        setDisableButton(true);
        setICartItems((prevICartItems) => {
            return prevICartItems?.map((item) => {
                if (item.id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDisableButton(false);
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
                    setIsLoading(false);
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
                imageUrl: item.data.url,
                id: item.id,
            };
            parsedProducts.push(orderProduct);
        });
        const taxInformation: Record<string, string> = {
            Alberta: "GST (5%)",
            "British Columbia": "PST (7%) + GST (5%)",
            Saskatchewan: "PST (6%) + GST (5%)",
            Manitoba: "PST (7%) + GST (5%)",
            Ontario: "HST (13%)",
            Quebec: "QST (9.975%) + GST (5%)",
            "New Brunswick": "HST (15%)",
            "Newfoundland and Labrador": "HST (15%)",
            "Prince Edward Island": "HST (15%)",
            "Nova Scotia": "HST (15%)",
        };
        return {
            date: today,
            total: calculateTotalItemsCost(items),
            products: parsedProducts,
            shippingInfo,
            taxes: calculateGSTCost(items),
            taxString: taxInformation[taxProvince],
            discount: discountAmount,
            // eslint-disable-next-line object-shorthand
            discountType: discountType,
            user: user?.uid,
        } as IOrder;
    };

    const fixStock = async (id: string, stock: number) => {
        try {
            const cartData = await SecureStore.getItemAsync("cart");
            if (cartData) {
                const parsedCart = JSON.parse(cartData) as {
                    productId: string;
                    quantity: number;
                }[];
                for (let i = 0; i < parsedCart.length; i++) {
                    if (parsedCart[i].productId == id)
                        parsedCart[i].quantity = stock;
                }
                await SecureStore.setItemAsync(
                    "cart",
                    JSON.stringify(parsedCart),
                );
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const validateStock = async (): Promise<boolean> => {
        let validStock = true;
        for (const item of ICartItems) {
            const productInfo = await getProductDataById(item.id);
            if (productInfo) {
                let enoughVariants = true;
                let minStock = productInfo.stock;
                if (item.choices && productInfo.variantsDynamic) {
                    const varDyn = productInfo.variantsDynamic;
                    item.choices.forEach((individualItem) => {
                        const itemsOption = varDyn.filter(
                            (e) => e.title == individualItem.title,
                        )[0].options;

                        const variantStock = itemsOption.filter(
                            (e) => e.name == individualItem.name,
                        )[0].stock;
                        if (item.quantity > variantStock) {
                            enoughVariants = false;
                            minStock =
                                minStock < variantStock
                                    ? minStock
                                    : variantStock;
                        }
                    });
                }

                if (item.quantity > productInfo.stock || !enoughVariants) {
                    validStock = false;

                    await handleQuantityChange(item.id, minStock);
                    if (minStock <= 0) {
                        await handleRemoveProduct(item.id);
                    } else {
                        await fixStock(item.id, minStock);
                    }
                }
            }
        }
        return validStock;
    };

    const openPaymentSheet = async () => {
        setIsPaymentLoading(true);
        const validStock = await validateStock();
        if (!validStock) {
            Alert.alert(
                "Low stock of a selected product, updated quantity in cart.",
            );
            setIsPaymentLoading(false);
            return;
        }

        await initializePaymentSheet();
        setIsPaymentLoading(false);
        const { error } = await presentPaymentSheet();
        setIsPaymentLoading(true);
        if (error) {
            setIsPaymentLoading(false);
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
            setIsPaymentLoading(false);
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
        const unsubscribe = navigation.addListener("blur", () => {
            setIsLoading(true);
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        //Everytime an item changes in the cart, and the stripe id is found, re-init the payment sheet
        if (stripeCustomerId) initializePaymentSheet();
    }, [ICartItems]);
    if (isLoading) {
        return (
            <View style={mainStyles.spinnerOverlay}>
                <ActivityIndicator size="large" color={colors.yellow} />
            </View>
        );
    }
    if (ICartItems.length == 0) {
        return (
            <View style={cartPageStyles.container}>
                <Header header={t("Your Cart")} noBackArrow />
                <Text style={cartPageStyles.messageText}>
                    {t(
                        "Your cart is empty! Go ahead and check out our products.",
                    )}
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
                    <Text style={cartPageStyles.buttonText}>
                        {t("Shop Now")}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!user) {
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
            {isPaymentLoading && (
                <View style={cartPageStyles.spinnerOverlay}>
                    <ActivityIndicator size="large" color={colors.yellow} />
                </View>
            )}
            <StripeProvider publishableKey={PUBLISHABLE_KEY ?? ""}>
                <View>
                    <Header header={t("Your Cart")} noBackArrow />
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
                                    {t("Add Discount Code")}
                                </Text>
                            </TouchableOpacity>
                            {stripeCustomerId == "" && (
                                <Button
                                    style={cartPageStyles.button}
                                    title={t("Add Shipping Details")}
                                    onPress={() => {
                                        router.push(
                                            "/checkout/ShippingInfoPage",
                                        );
                                    }}
                                />
                            )}
                            {stripeCustomerId != "" && (
                                <Button
                                    title={t("View Shipping Details")}
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
                                title={t("Continue to Payment")}
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
                                    {t("Add Discount Code")}
                                </Text>
                            </View>
                            <View style={cartPageStyles.inputContainer}>
                                <TextInput
                                    style={cartPageStyles.codeInput}
                                    placeholder={t("Discount Code")}
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
                                        {t("Apply Code")}
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
