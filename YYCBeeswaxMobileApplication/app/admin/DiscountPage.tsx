import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import AdminHeader from "@/components/adminHeader";
import Button from "@/components/button";
import { colors, fonts } from "@/consts/styles";
import { viewportWidth } from "@/consts/viewport";
import { db } from "@/firebase/config";
import { getDiscountData } from "@/firebase/getCollections/getDiscounts";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";
import { adminDiscountPageStyles } from "@/styles/adminDiscountPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function DiscountPage() {
    const [addCodePopupVisible, setAddCodePopupVisible] = useState(false);
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [selectedCodeType, setSelectedCodeType] = useState(true);
    const [discountCode, setDiscountCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [discountCodeData, setDiscountCodeData] = useState([] as any);

    useEffect(() => {
        getDiscountData().then((discounts) => {
            if (discounts) {
                setDiscountCodeData(discounts);
            } else {
                console.log("Issue getting discounts");
            }
        });
    }, []);

    const deleteCode = (discountId: string) => {
        Alert.alert(
            "Delete Discount Code",
            "Are you sure you want to delete this discount code?",
            [
                {
                    text: "Don't Delete",
                    style: "cancel",
                    onPress: () => {},
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDiscount(discountId);
                        setDiscountCodeData((prevData: any) =>
                            prevData.filter(
                                (item: any) => item.id !== discountId,
                            ),
                        );
                    },
                },
            ],
        );
    };

    async function deleteDiscount(discountId: string) {
        try {
            const discountDocRef = doc(db, "discounts", discountId);
            await deleteDoc(discountDocRef);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    async function createCode(code: string, amount: string, type: boolean) {
        if (type) {
            if (parseFloat(amount) > 100) {
                Alert.alert(
                    "Invalid Discount Amount",
                    "Discount amount cannot be over 100%. Please try again.",
                );
                return;
            }
        }
        if (parseFloat(amount) <= 0) {
            Alert.alert(
                "Invalid Discount Amount",
                "Discount amount must be greater than 0. Please try again.",
            );
            return;
        }
        if (amount === "" || code === "") {
            Alert.alert(
                "Empty Fields",
                "One or more fields are empty. Please try again.",
            );
            return;
        }
        if (code.includes(" ")) {
            Alert.alert(
                "Invalid Discount Code",
                "Discount code cannot contain spaces. Please try again.",
            );
            return;
        }
        if (discountCodeData.some((item: any) => item.data.code === code)) {
            Alert.alert(
                "Invalid Discount Code",
                "Discount code already exists. Please try again.",
            );
            return;
        }
        setAddCodePopupVisible(false);
        setLoadingSpinner(true);
        await createDiscountCode(code, amount, type);
        setDiscountCode("");
        setDiscountAmount("");
        setLoadingSpinner(false);
    }

    async function createDiscountCode(
        code: string,
        amount: string,
        type: boolean,
    ) {
        try {
            const docRef = await addDoc(collection(db, "discounts"), {
                code,
                amount,
                type,
                created: new Date(),
            });
            setDiscountCodeData((prevData: any) => [
                {
                    id: docRef.id,
                    data: {
                        code,
                        amount,
                        type,
                    },
                },
                ...prevData,
            ]);
        } catch (error) {
            console.error("Error adding discount code: ", error);
        }
    }

    return (
        <KeyboardAvoidingView
            style={mainStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <AdminHeader header="Discounts Dashboard" />
            {loadingSpinner && (
                <View style={adminDiscountPageStyles.spinnerOverlay}>
                    <ActivityIndicator size="large" color={colors.yellow} />
                    <Text style={adminDiscountPageStyles.spinnerText}>
                        Adding new discount code...
                    </Text>
                </View>
            )}
            <ScrollView
                style={adminDashboardPageStyles.page}
                keyboardShouldPersistTaps="always"
            >
                <Button
                    title="Create Code"
                    style={adminDiscountPageStyles.headerButton}
                    onPress={() => setAddCodePopupVisible(true)}
                />
                <View style={adminDiscountPageStyles.cardContainer}>
                    <View style={adminDashboardPageStyles.headerContainer}>
                        <Text style={adminDashboardPageStyles.headerTitle}>
                            Active Discount Codes
                        </Text>
                    </View>
                    <View style={adminDashboardPageStyles.subTitle}>
                        <Text style={adminDashboardPageStyles.overviewText}>
                            Code
                        </Text>
                        <Text style={adminDashboardPageStyles.overviewText}>
                            Discount
                        </Text>
                    </View>
                    {discountCodeData.map((item: any) => (
                        <View
                            style={adminDiscountPageStyles.item}
                            key={item.id}
                        >
                            <Text style={adminDiscountPageStyles.itemTitle}>
                                {item.data.code}
                            </Text>
                            <View
                                style={
                                    adminDiscountPageStyles.subDiscountRowContainer
                                }
                            >
                                <Text style={adminDiscountPageStyles.itemTitle}>
                                    {item.data.type ? "" : "$"}
                                    {item.data.amount}
                                    {item.data.type ? "%" : ""}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => deleteCode(item.id)}
                                >
                                    <Ionicons
                                        name="trash"
                                        style={adminDiscountPageStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
                <Modal
                    animationType="fade"
                    transparent
                    visible={addCodePopupVisible}
                    onRequestClose={() => {
                        setAddCodePopupVisible(!addCodePopupVisible);
                    }}
                >
                    <View style={[adminDiscountPageStyles.codePopupContainer]}>
                        <TouchableWithoutFeedback
                            onPress={() => setAddCodePopupVisible(false)}
                        >
                            <View
                                style={adminDiscountPageStyles.touchableOverlay}
                            />
                        </TouchableWithoutFeedback>
                        <View style={adminDiscountPageStyles.popupView}>
                            <View
                                style={
                                    adminDiscountPageStyles.popupHeaderContainer
                                }
                            >
                                <Text
                                    style={adminDashboardPageStyles.headerTitle}
                                >
                                    Create a New Code
                                </Text>
                            </View>
                            <View
                                style={adminDiscountPageStyles.inputContainer}
                            >
                                <TextInput
                                    style={adminDiscountPageStyles.codeInput}
                                    placeholder="Discount Code"
                                    placeholderTextColor="grey"
                                    value={discountCode}
                                    onChangeText={setDiscountCode}
                                />
                                <View
                                    style={
                                        adminDiscountPageStyles.subInputContainer
                                    }
                                >
                                    <TextInput
                                        style={
                                            adminDiscountPageStyles.amountInput
                                        }
                                        keyboardType="numeric"
                                        placeholder="Discount Amount"
                                        placeholderTextColor="grey"
                                        value={discountAmount}
                                        onChangeText={setDiscountAmount}
                                    />
                                    <SelectList
                                        data={[
                                            "Dollar Value $",
                                            "Percentage %",
                                        ]}
                                        boxStyles={{
                                            width: viewportWidth * 0.38,
                                            height: 55,
                                            alignItems: "center",
                                            borderColor: "lightgrey",
                                        }}
                                        dropdownStyles={
                                            adminDiscountPageStyles.dropdown
                                        }
                                        setSelected={(value: string) => {
                                            setSelectedCodeType(
                                                value === "Percentage %",
                                            );
                                        }}
                                        defaultOption={{
                                            key: true,
                                            value: "Dollar Value $",
                                        }}
                                        search={false}
                                        save="value"
                                        fontFamily={fonts.main}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={[
                                        adminDiscountPageStyles.button,
                                        (!discountCode || !discountAmount) &&
                                            adminDiscountPageStyles.buttonDisabled,
                                    ]}
                                    onPress={() =>
                                        createCode(
                                            discountCode,
                                            discountAmount,
                                            selectedCodeType,
                                        )
                                    }
                                    disabled={!discountCode || !discountAmount}
                                >
                                    <Text
                                        style={
                                            adminDiscountPageStyles.buttonText
                                        }
                                    >
                                        Create Code
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
