import { Image } from "expo-image";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert, Text } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

import Button from "@/components/button";
import Input, { KeyboardTypeOptions } from "@/components/input";
import WarningHeader from "@/components/warningHeader";
import { viewportHeight } from "@/consts/viewport";
import { db } from "@/firebase/config";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
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
    postalCode: "Postal code",
};

export default function ShippingInfoPage(props: Props) {
    const { user } = useUser();
    const [foundId, setFoundId] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [line1, setLine1] = useState("");
    const [line2, setLine2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [buttonText, setButtonText] = useState("Submit Shipping Information");
    const [headerText, setHeaderText] = useState("Enter Shipping Details");

    const [changesMade, setChangesMade] = useState(false);
    const [attentive, setAttentive] = useState(false);

    const [orignalUser, setOriginalUser] = useState({
        name: "",
        email: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        province: "",
        postalCode: "",
    });

    useEffect(() => {
        //don't be attentive to changes made until things are done loading
        if (!attentive) return;
        //If the user is new, recognize the changes (enable the button) once all these values are present
        if (!foundId) {
            if (
                phone != orignalUser.phone &&
                line1 != orignalUser.line1 &&
                city != orignalUser.city &&
                province != orignalUser.province &&
                postalCode != orignalUser.postalCode
            ) {
                setChangesMade(true);
            }
            return;
        }
        //If info is found for the user, check if these values have changed
        if (
            name != orignalUser.name ||
            email != orignalUser.email ||
            phone != orignalUser.phone ||
            line1 != orignalUser.line1 ||
            line2 != orignalUser.line2 ||
            city != orignalUser.city ||
            province != orignalUser.province ||
            postalCode != orignalUser.postalCode
        ) {
            setChangesMade(true);
            return;
        }
        setChangesMade(false);
    }, [name, email, phone, line1, line2, city, province, postalCode]);

    const fetchCustomerData = async (custID: string) => {
        //If the shipping information is already linked to the account, fetch the data
        const response = await fetch(`${API_URL}/customer-data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                custID,
            }),
        });
        const {
            customer_name,
            customer_email,
            customer_phone,
            customer_line1,
            customer_line2,
            customer_city,
            customer_province,
            customer_postalCode,

            error,
        } = await response.json();
        return {
            customer_name,
            customer_email,
            customer_phone,
            customer_line1,
            customer_line2,
            customer_city,
            customer_province,
            customer_postalCode,

            error,
        };
    };

    const fetchCreateCustomer = async () => {
        //Create a customer from the values in the input field
        const response = await fetch(`${API_URL}/create-customer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                name,
                phone,
                line1,
                line2,
                city,
                province,
                postalCode,
                country: "CA",
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
                email,
                name,
                phone,
                line1,
                line2,
                city,
                province,
                postalCode,
                country: "CA",
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
                        const {
                            customer_name,
                            customer_email,
                            customer_phone,
                            customer_line1,
                            customer_line2,
                            customer_city,
                            customer_province,
                            customer_postalCode,

                            error,
                        } = await fetchCustomerData(userDetails.customerId);
                        if (error) {
                            console.log(error);
                            return;
                        }

                        setName(customer_name ?? placeholder.name);
                        setEmail(customer_email ?? placeholder.email);
                        setPhone(customer_phone ?? placeholder.phoneNumber);
                        setLine1(customer_line1 ?? placeholder.line1);
                        setLine2(customer_line2 ?? placeholder.line2);
                        setCity(customer_city ?? placeholder.city);
                        setProvince(customer_province ?? placeholder.province);
                        setPostalCode(
                            customer_postalCode ?? placeholder.postalCode,
                        );

                        setButtonText("Update Shipping Information");
                        setHeaderText("View Shipping Details");
                        setFoundId(userDetails.customerId);

                        setOriginalUser({
                            name: customer_name ?? placeholder.name,
                            email: customer_email ?? placeholder.email,
                            phone: customer_phone ?? placeholder.phoneNumber,
                            line1: customer_line1 ?? placeholder.line1,
                            line2: customer_line2 ?? placeholder.line2,
                            city: customer_city ?? placeholder.city,
                            province: customer_province ?? placeholder.province,
                            postalCode:
                                customer_postalCode ?? placeholder.postalCode,
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    setName(userDetails?.name ?? placeholder.name);
                    setEmail(userDetails?.email ?? placeholder.email);
                    setOriginalUser({
                        ...orignalUser,
                        name: userDetails?.name ?? placeholder.name,
                        email: userDetails?.email ?? placeholder.email,
                    });
                }
                setAttentive(true);
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
                /^(\(\+[0-9]{2}\))?([0-9]{3}-?)?([0-9]{3})-?([0-9]{4})(\/[0-9]{4})?$/gm,
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
        if (!name && name != placeholder.name) {
            Alert.alert("Please enter your full name.");
            return false;
        }
        if (!validateEmail(email)) {
            Alert.alert("Please enter your email.");
            return false;
        }
        if (!validateCanadianPhoneNumber(phone)) {
            Alert.alert("Please enter your phone number.");
            return false;
        }
        if (!line1 && line1 != placeholder.line1) {
            Alert.alert("Please enter the first line of your address.");
            return false;
        }
        if (!validateCanadianCity(city) && city != placeholder.city) {
            Alert.alert("Please enter the city of your address.");
            return false;
        }
        if (province == placeholder.province) {
            Alert.alert("Please select the province of your address.");
            return false;
        }
        if (!validateCanadianPostalCode(postalCode)) {
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

    const handleBackPress = () => {
        if (changesMade) {
            Alert.alert(
                "Discard Changes?",
                "You have unsaved changes. Are you sure you want to discard them and leave this screen?",
                [
                    {
                        text: "Don't Leave",
                        style: "cancel",
                        onPress: () => {},
                    },
                    {
                        text: "Discard",
                        style: "destructive",
                        onPress: () => router.back(),
                    },
                ],
            );
        } else {
            router.back();
        }
    };

    return (
        <View style={shippingInfoPageStyles.container}>
            <WarningHeader header={headerText} onPress={handleBackPress} />
            <Image
                contentFit="contain"
                source={
                    foundId == ""
                        ? require("@/assets/cartProgress/1.png")
                        : require("@/assets/cartProgress/2.png")
                }
                style={shippingInfoPageStyles.image}
            />
            <ScrollView>
                <Input
                    label="Full Name"
                    autoCapitalize
                    onChangeText={setName}
                    placeholder={name || placeholder.name}
                    value={name}
                />
                <Input
                    label="E-mail"
                    autoCapitalize={false}
                    keyboardType={KeyboardTypeOptions.emailAddress}
                    onChangeText={setEmail}
                    placeholder={email || placeholder.email}
                    value={email}
                />
                <Input
                    label="Phone"
                    autoCapitalize={false}
                    keyboardType={KeyboardTypeOptions.phonePad}
                    onChangeText={setPhone}
                    placeholder={phone || placeholder.phoneNumber}
                    value={phone}
                />

                <Input
                    label="Address 1"
                    autoCapitalize
                    onChangeText={setLine1}
                    placeholder={line1 || placeholder.line1}
                    value={line1}
                />
                <Input
                    label="Address 2 (optional)"
                    autoCapitalize
                    onChangeText={setLine2}
                    placeholder={line2 || placeholder.line2}
                    value={line2}
                />
                <Input
                    label="City"
                    autoCapitalize
                    onChangeText={setCity}
                    placeholder={city || placeholder.city}
                    value={city}
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
                        value={province}
                        data={provinceData}
                        imageField="image"
                        labelField="label"
                        valueField="value"
                        placeholder={placeholder.province}
                        onChange={(e) => setProvince(e.value)}
                    />
                </View>

                <Input
                    label="Postal code"
                    autoCapitalize
                    onChangeText={setPostalCode}
                    placeholder={postalCode || placeholder.postalCode}
                    value={postalCode.toUpperCase()}
                />
                <View style={shippingInfoPageStyles.extraSpace} />
            </ScrollView>
            <Button
                style={[
                    shippingInfoPageStyles.button,
                    !changesMade && shippingInfoPageStyles.buttonDisabled,
                ]}
                title={buttonText}
                onPress={handleCustomerInformation}
                disabled={!changesMade}
            />
        </View>
    );
}
