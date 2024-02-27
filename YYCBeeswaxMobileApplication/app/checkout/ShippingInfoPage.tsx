import { Image } from "expo-image";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert, Text, ActivityIndicator } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

import Button from "@/components/button";
import Header from "@/components/header";
import Input, { KeyboardTypeOptions } from "@/components/input";
import { colors } from "@/consts/styles";
import { viewportHeight } from "@/consts/viewport";
import { db } from "@/firebase/config";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { useUnsavedChangesCheck } from "@/lib/hooks/useUnsavedChangesCheck";
import { mainStyles } from "@/styles/mainStyles";
import { shippingInfoPageStyles } from "@/styles/shippingInfoPageStyles";

const API_URL = "http://10.0.2.2:3000"; //Need this to link with a server, unsure if its different for apple

type Props = {
    customerID?: string;
};

const provinceData = [
    {
        label: "Alberta",
        value: "Alberta",
        image: require("@/assets/provinces/Alberta.jpg"),
    },
    {
        label: "British Columbia",
        value: "British Columbia",
        image: require("@/assets/provinces/British_Columbia.jpg"),
    },
    {
        label: "Manitoba",
        value: "Manitoba",
        image: require("@/assets/provinces/Manitoba.jpg"),
    },
    {
        label: "New Brunswick",
        value: "New Brunswick",
        image: require("@/assets/provinces/New_Brunswick.jpg"),
    },
    {
        label: "Newfoundland and Labrador",
        value: "Newfoundland and Labrador",
        image: require("@/assets/provinces/Newfoundland_and_Labrador.jpg"),
    },
    {
        label: "Nova Scotia",
        value: "Nova Scotia",
        image: require("@/assets/provinces/Nova_Scotia.jpg"),
    },
    {
        label: "Ontario",
        value: "Ontario",
        image: require("@/assets/provinces/Ontario.jpg"),
    },
    {
        label: "Prince Edward Island",
        value: "Prince Edward Island",
        image: require("@/assets/provinces/Prince_Edward_Island.jpg"),
    },
    {
        label: "Quebec",
        value: "Quebec",
        image: require("@/assets/provinces/Quebec.jpg"),
    },
    {
        label: "Saskatchewan",
        value: "Saskatchewan",
        image: require("@/assets/provinces/Saskatchewan.jpg"),
    },
];

const placeholder = {
    name: "Full Name",
    email: "E-mail",
    phoneNumber: "Phone number",
    line1: "Street, PO Box, or Company Name",
    line2: "Apartment, Suite, Unit, or Building",
    city: "City, District, Suburb, Town, or Village",
    province: "Select a Province",
    country: "CA",
    postalCode: "Postal code",
};

export default function ShippingInfoPage(props: Props) {
    const { user } = useUser();
    const [foundId, setFoundId] = useState("");

    const [selectedMode, setSelectedMode] = useState(0);
    const buttonText = [
        "Submit Shipping Information",
        "Update Shipping Information",
    ];
    const headerText = ["Enter Shipping Details", "View Shipping Details"];
    const imageSource = [
        require("@/assets/cartProgress/1.png"),
        require("@/assets/cartProgress/2.png"),
    ];

    const [changesMade, setChangesMade] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [shippingInfo, setShippingInfo] = useState<IShippingInfo>({
        name: "",
        email: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        province: "",
        country: "CA",
        postalCode: "",
    });

    const [orignalUser, setOriginalUser] = useState<IShippingInfo>({
        name: "",
        email: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        province: "",
        country: "CA",
        postalCode: "",
    });

    useEffect(() => {
        if (isLoading) return;
        //If the user is new, recognize the changes (enable the button) once all these values are present
        if (!foundId) {
            if (
                shippingInfo.phone != orignalUser.phone &&
                shippingInfo.line1 != orignalUser.line1 &&
                shippingInfo.city != orignalUser.city &&
                shippingInfo.province != orignalUser.province &&
                shippingInfo.postalCode != orignalUser.postalCode
            ) {
                setChangesMade(true);
            }
            return;
        }
        //If info is found for the user, check if these values have changed
        if (
            shippingInfo.name != orignalUser.name ||
            shippingInfo.email != orignalUser.email ||
            shippingInfo.phone != orignalUser.phone ||
            shippingInfo.line1 != orignalUser.line1 ||
            shippingInfo.line2 != orignalUser.line2 ||
            shippingInfo.city != orignalUser.city ||
            shippingInfo.province != orignalUser.province ||
            shippingInfo.country != orignalUser.country ||
            shippingInfo.postalCode != orignalUser.postalCode
        ) {
            setChangesMade(true);
            return;
        }
        setChangesMade(false);
    }, [shippingInfo]);

    useUnsavedChangesCheck(!changesMade);

    const fetchCustomerData = async (custID: string) => {
        //Retrives cutomer data from the server, assuming that it exsists.
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
        return { retrievedShippingInfo, error };
    };

    const fetchCreateCustomer = async () => {
        //Create a customer from the values in the input field
        const response = await fetch(`${API_URL}/create-customer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shippingInfo,
            }),
        });
        const { customerId, error } = await response.json();
        return { customerId, error };
    };

    const fetchUpdateCustomer = async () => {
        //Update a customers data with the data currently in the input fields
        const response = await fetch(`${API_URL}/update-customer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                foundId,
                shippingInfo,
            }),
        });
        const { customerId, error } = await response.json();
        return { customerId, error };
    };

    useEffect(() => {
        //If the shipping information is already linked to the account, autofill the input fields
        (async () => {
            if (user?.uid) {
                const userDetails = await getUserById(user.uid);
                if (userDetails?.customerId) {
                    try {
                        const { retrievedShippingInfo, error } =
                            await fetchCustomerData(userDetails.customerId);
                        if (error) {
                            console.log(error);
                            return;
                        }
                        setShippingInfo({
                            ...shippingInfo,
                            name:
                                retrievedShippingInfo.name ?? placeholder.name,
                            email:
                                retrievedShippingInfo.email ??
                                placeholder.email,
                            phone:
                                retrievedShippingInfo.phone ??
                                placeholder.phoneNumber,
                            line1:
                                retrievedShippingInfo.line1 ??
                                placeholder.line1,
                            line2:
                                retrievedShippingInfo.line2 ??
                                placeholder.line2,
                            city:
                                retrievedShippingInfo.city ?? placeholder.city,
                            province:
                                retrievedShippingInfo.province ??
                                placeholder.province,
                            country:
                                retrievedShippingInfo.country ??
                                placeholder.country,
                            postalCode:
                                retrievedShippingInfo.postalCode ??
                                placeholder.postalCode,
                        });

                        setSelectedMode(1);
                        setFoundId(userDetails.customerId);
                        setOriginalUser({
                            ...orignalUser,
                            name:
                                retrievedShippingInfo.name ?? placeholder.name,
                            email:
                                retrievedShippingInfo.email ??
                                placeholder.email,
                            phone:
                                retrievedShippingInfo.phone ??
                                placeholder.phoneNumber,
                            line1:
                                retrievedShippingInfo.line1 ??
                                placeholder.line1,
                            line2:
                                retrievedShippingInfo.line2 ??
                                placeholder.line2,
                            city:
                                retrievedShippingInfo.city ?? placeholder.city,
                            province:
                                retrievedShippingInfo.province ??
                                placeholder.province,
                            country:
                                retrievedShippingInfo.country ??
                                placeholder.country,
                            postalCode:
                                retrievedShippingInfo.postalCode ??
                                placeholder.postalCode,
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    setShippingInfo({
                        ...shippingInfo,
                        name: userDetails?.name ?? placeholder.name,
                        email: userDetails?.email ?? placeholder.email,
                    });
                    setOriginalUser({
                        ...orignalUser,
                        name: userDetails?.name ?? placeholder.name,
                        email: userDetails?.email ?? placeholder.email,
                    });
                }
                setIsLoading(false);
            }
        })();
    }, []);

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const validateCanadianPostalCode = (postalCode: string) => {
        return String(postalCode)
            .toLowerCase()
            .match(
                /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
            );
    };

    const validateCanadianPhoneNumber = (phoneNumber: string) => {
        //Checks that the phone number is in a canadian format
        return String(phoneNumber)
            .toLowerCase()
            .match(
                /^1?(\(\+[0-9]{2}\))?([0-9]{3}-?)?([0-9]{3})-?([0-9]{4})(\/[0-9]{4})?$/gm,
            );
    };

    const validateCanadianCity = (city: string) => {
        //Checks that the city is at least 1 word that doesn't contain a number
        return String(city)
            .toLowerCase()
            .match(/\b[^\d\W]+\b/);
    };

    function customerInfoValid() {
        //Some checks just ensure that the value is present, others use regex to ensure that its valid
        if (!shippingInfo.name && shippingInfo.name != placeholder.name) {
            Alert.alert("Please enter your full name.");
            return false;
        }
        if (!validateEmail(shippingInfo.email)) {
            Alert.alert("Please enter your email.");
            return false;
        }
        if (!validateCanadianPhoneNumber(shippingInfo.phone)) {
            Alert.alert("Please enter your phone number.");
            return false;
        }
        if (!shippingInfo.line1 && shippingInfo.line1 != placeholder.line1) {
            Alert.alert("Please enter the first line of your address.");
            return false;
        }
        if (
            !validateCanadianCity(shippingInfo.city) &&
            shippingInfo.city != placeholder.city
        ) {
            Alert.alert("Please enter the city of your address.");
            return false;
        }
        if (shippingInfo.province == placeholder.province) {
            Alert.alert("Please select the province of your address.");
            return false;
        }
        if (!validateCanadianPostalCode(shippingInfo.postalCode)) {
            Alert.alert("Please enter the postal code of your address.");
            return false;
        }
        return true;
    }

    const handleCustomerInformation = async () => {
        if (!customerInfoValid()) return;
        if (foundId) {
            //The user has shipping information linked to their account, thus update it
            try {
                const { customerId, error } = await fetchUpdateCustomer();
                if (!customerId) {
                    console.log("User Not Found");
                    return;
                }
                if (error) {
                    console.log(error);
                    return;
                }
                Alert.alert("Information changed successfully.", "", [
                    { text: "OK", onPress: () => router.back() },
                ]);
            } catch (error) {
                console.log(error);
            }
        } else {
            //Couldn't find shipping information linked to the account, so create and link it
            try {
                const { customerId, error } = await fetchCreateCustomer();
                if (error) {
                    console.log(error);
                    return;
                }

                const userId = user?.uid;
                try {
                    if (!userId) {
                        console.log("User Not Found");
                        return;
                    }
                    await setDoc(
                        doc(db, "users", userId),
                        {
                            ...(customerId != "" && { customerId }),
                        },
                        { merge: true },
                    );
                    user.reload(); //reload the user to ensure that the app knows that the shipping info exists
                    Alert.alert(
                        "Shippining Information saved successfully.",
                        "",
                        [{ text: "OK", onPress: () => router.back() }],
                    );
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setChangesMade(false);
    };

    if (isLoading) {
        return (
            <View style={mainStyles.spinnerOverlay}>
                <ActivityIndicator size="large" color={colors.yellow} />
            </View>
        );
    }

    return (
        <View style={shippingInfoPageStyles.container}>
            <Header header={headerText[selectedMode]} />
            <Image
                contentFit="contain"
                source={imageSource[selectedMode]}
                style={shippingInfoPageStyles.image}
            />
            <ScrollView>
                <Input
                    label="Full Name"
                    autoCapitalize
                    onChangeText={(name) =>
                        setShippingInfo({ ...shippingInfo, name })
                    }
                    placeholder={shippingInfo.name || placeholder.name}
                    value={shippingInfo.name}
                />
                <Input
                    label="E-mail"
                    autoCapitalize={false}
                    keyboardType={KeyboardTypeOptions.emailAddress}
                    onChangeText={(email) =>
                        setShippingInfo({ ...shippingInfo, email })
                    }
                    placeholder={shippingInfo.email || placeholder.email}
                    value={shippingInfo.email}
                />
                <Input
                    label="Phone"
                    autoCapitalize={false}
                    keyboardType={KeyboardTypeOptions.phonePad}
                    onChangeText={(phone) =>
                        setShippingInfo({ ...shippingInfo, phone })
                    }
                    placeholder={shippingInfo.phone || placeholder.phoneNumber}
                    value={shippingInfo.phone}
                />

                <Input
                    label="Address 1"
                    autoCapitalize
                    onChangeText={(line1) =>
                        setShippingInfo({ ...shippingInfo, line1 })
                    }
                    placeholder={shippingInfo.line1 || placeholder.line1}
                    value={shippingInfo.line1}
                />
                <Input
                    label="Address 2 (optional)"
                    autoCapitalize
                    onChangeText={(line2) =>
                        setShippingInfo({ ...shippingInfo, line2 })
                    }
                    placeholder={shippingInfo.line2 || placeholder.line2}
                    value={shippingInfo.line2}
                />
                <Input
                    label="City"
                    autoCapitalize
                    onChangeText={(city) =>
                        setShippingInfo({ ...shippingInfo, city })
                    }
                    placeholder={shippingInfo.city || placeholder.city}
                    value={shippingInfo.city}
                />
                <View style={shippingInfoPageStyles.dropdownContainer}>
                    <Text style={shippingInfoPageStyles.dropdownLabel}>
                        Province
                    </Text>
                    <SelectCountry
                        style={shippingInfoPageStyles.dropdown}
                        selectedTextStyle={
                            shippingInfoPageStyles.dropdownSelectedText
                        }
                        placeholderStyle={
                            shippingInfoPageStyles.dropdownPlaceholder
                        }
                        imageStyle={shippingInfoPageStyles.dropdownImage}
                        iconStyle={shippingInfoPageStyles.dropdownArrowIcon}
                        maxHeight={viewportHeight * 0.4}
                        value={shippingInfo.province}
                        data={provinceData}
                        imageField="image"
                        labelField="label"
                        valueField="value"
                        placeholder={placeholder.province}
                        onChange={(e) =>
                            setShippingInfo({
                                ...shippingInfo,
                                province: e.value,
                            })
                        }
                    />
                </View>

                <Input
                    label="Postal code"
                    autoCapitalize
                    onChangeText={(postalCode) =>
                        setShippingInfo({ ...shippingInfo, postalCode })
                    }
                    placeholder={
                        shippingInfo.postalCode || placeholder.postalCode
                    }
                    value={shippingInfo.postalCode.toUpperCase()}
                />
                <View style={shippingInfoPageStyles.extraSpace} />
            </ScrollView>
            <Button
                style={[
                    shippingInfoPageStyles.button,
                    !changesMade && shippingInfoPageStyles.buttonDisabled,
                ]}
                title={buttonText[selectedMode]}
                onPress={handleCustomerInformation}
                disabled={!changesMade}
            />
        </View>
    );
}
