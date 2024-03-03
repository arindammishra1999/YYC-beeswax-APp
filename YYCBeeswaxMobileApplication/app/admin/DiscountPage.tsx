import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import Button from "@/components/button";
import Popup from "@/components/popup";
import { colors } from "@/consts/styles";
import { viewportWidth } from "@/consts/viewport";
import { auth } from "@/firebase/config";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";
import { adminDiscountPageStyles } from "@/styles/adminDiscountPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function DiscountPage() {
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);
    const [logoutSpinner, setLogoutSpinner] = useState(false);
    const [selectedCodeType, setSelectedCodeType] = useState("");
    const [changesMade, setChangesMade] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");

    const [discountCodeData, setDiscountCodeData] = useState([
        { rewardCode: "SAVE25", discount: "25%" },
        { rewardCode: "BIGDISCOUNT", discount: "$50" },
        { rewardCode: "DECENT", discount: "50%" },
        { rewardCode: "HALFOFF", discount: "50%" },
    ]);

    // Insert UseEffect to pull all current discount codes from the database
    // Set a local variable called discountCodeData to store this data and figure out a proper order

    const deleteCode = () => {
        // Prompt the user with a warning asking if they want to delect the code
        // Delete the code from the database
    };

    const createCode = () => {
        // Grab whether it is using % or $ amount
        // Check whether the % is over 100 or if the discount code already exists
        // If any of these happen, throw a warning at the user
        // Otherwise insert the new code into the database and re render the page
        // Set discount code and discount amount fields to ""
    };

    async function logout() {
        try {
            setLogoutSpinner(true);
            setLogoutPopupVisible(false);
            await signOut(auth);
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLogoutSpinner(false);
        }
        router.replace("/");
    }

    const handleDiscountCodeChange = (text: string) => {
        setDiscountCode(text);
        setChangesMade(!!text && !!discountAmount);
    };

    const handleDiscountAmountChange = (text: string) => {
        setDiscountAmount(text);
        setChangesMade(!!text && !!discountCode);
    };
    return (
        <View style={mainStyles.container}>
            {logoutSpinner && (
                <View style={mainStyles.spinnerOverlay}>
                    <ActivityIndicator size="large" color={colors.yellow} />
                </View>
            )}
            <View style={adminDashboardPageStyles.header}>
                <Text style={adminDashboardPageStyles.headerTitle}>
                    Dashboard
                </Text>
                <Button
                    title="Sign Out"
                    style={adminDashboardPageStyles.button}
                    onPress={() => setLogoutPopupVisible(true)}
                />
            </View>
            <ScrollView style={adminDashboardPageStyles.page}>
                <View style={adminDiscountPageStyles.cardContainer}>
                    <View style={adminDashboardPageStyles.headerContainer}>
                        <Text style={adminDashboardPageStyles.headerTitle}>
                            Active Rewards Codes
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
                    {discountCodeData.map((item) => (
                        <View
                            style={adminDiscountPageStyles.item}
                            key={item.rewardCode}
                        >
                            <Text style={adminDiscountPageStyles.itemTitle}>
                                {item.rewardCode}
                            </Text>
                            <View
                                style={
                                    adminDiscountPageStyles.subDiscountRowContainer
                                }
                            >
                                <Text style={adminDiscountPageStyles.itemTitle}>
                                    {item.discount}
                                </Text>
                                <TouchableOpacity onPress={deleteCode}>
                                    <Ionicons
                                        name="trash"
                                        style={adminDiscountPageStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
                <View
                    style={[
                        adminDiscountPageStyles.cardContainer,
                        adminDiscountPageStyles.bottom,
                    ]}
                >
                    <View style={adminDashboardPageStyles.headerContainer}>
                        <Text style={adminDashboardPageStyles.headerTitle}>
                            Create a New Code
                        </Text>
                    </View>
                    <View style={adminDiscountPageStyles.inputContainer}>
                        <TextInput
                            style={adminDiscountPageStyles.codeInput}
                            placeholder="Discount Code"
                            onChangeText={handleDiscountCodeChange}
                        />
                        <View style={adminDiscountPageStyles.subInputContainer}>
                            <TextInput
                                style={adminDiscountPageStyles.amountInput}
                                keyboardType="numeric"
                                placeholder="Discount Amount"
                                onChangeText={handleDiscountAmountChange}
                            />
                            <SelectList
                                data={["Percentage %", "Dollar Value $"]}
                                boxStyles={{
                                    width: viewportWidth * 0.38,
                                    height: 55,
                                    alignItems: "center",
                                }}
                                dropdownStyles={
                                    adminDiscountPageStyles.dropdown
                                }
                                setSelected={setSelectedCodeType}
                                defaultOption={{ key: "1", value: "%" }}
                                search={false}
                                save="value"
                            />
                        </View>
                        <TouchableOpacity
                            style={[
                                adminDiscountPageStyles.button,
                                !changesMade &&
                                    adminDiscountPageStyles.buttonDisabled,
                            ]}
                            onPress={createCode}
                            disabled={!changesMade}
                        >
                            <Text style={adminDiscountPageStyles.buttonText}>
                                Create Code
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Popup
                    subTitle="Are you sure you want to logout? This will take you back
                    to the login screen."
                    option1Text="No"
                    option2Text="Yes"
                    visible={logoutPopupVisible}
                    changeVisibility={() => setLogoutPopupVisible(false)}
                    option1Action={() => setLogoutPopupVisible(false)}
                    option2Action={logout}
                />
            </ScrollView>
        </View>
    );
}
