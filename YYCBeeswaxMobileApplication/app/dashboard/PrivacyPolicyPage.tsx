import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { mainStyles } from "@/styles/mainStyles";
import Header from "@/components/header";
import { ScrollView } from "react-native-gesture-handler";
import { privacyPolicyPageStyles } from "@/styles/privacyPolicyPageStyles";

export default function PrivacyPolicyPage() {
    return (
        <View style={mainStyles.container}>
            <Header header="Privacy Policy" />
            <ScrollView style={privacyPolicyPageStyles.textContainer}>
                <Text style={privacyPolicyPageStyles.headerText}>
                    Privacy Policy
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    We collect personal information from our customers in the
                    regular course of doing business. This page lets you know
                    exactly how we’re protecting the information you entrust to
                    us. {"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    What personal information do you collect about me?{" "}
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}We collect the following information about you: {"\n"}
                    {"\n"}
                    {"\u2022"} Name{"\n"}
                    {"\u2022"} Address{"\n"}
                    {"\u2022"} Postal Code{"\n"}
                    {"\u2022"} Phone Number{"\n"}
                    {"\u2022"} Email Address{"\n"}
                    {"\u2022"} Purchase history{"\n"}
                    {"\u2022"} Customer satisfaction info{"\n"}
                    {"\u2022"} Opinions about products and services
                    {"\n"}
                    {"\n"}
                    When you visit our web site, we also collect:{"\n"}
                    {"\n"}
                    {"\u2022"} information about your computer, including your
                    IP address, the type of operating system and browser you
                    use, and your computer’s location{"\n"}
                    {"\u2022"} what pages you visit on our site and what links
                    you click on
                    {"\n"}
                    {"\u2022"} what other sites you’ve visited recently
                    (basically, how you got to our website!){"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    How do you use this information?
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}The main reasons we collect personal information from
                    you are:{"\n"}
                    {"\n"}
                    {"\u2022"} Complaints{"\n"}
                    {"\u2022"} Contests/Surveys{"\n"}
                    {"\u2022"} Customer relationship management{"\n"}
                    {"\u2022"} Customer service{"\n"}
                    {"\u2022"} Delivery services{"\n"}
                    {"\u2022"} Marketing{"\n"}
                    {"\u2022"} Orders{"\n"}
                    {"\u2022"} Returns{"\n"}
                    {"\u2022"} To complete a sale/transaction
                    {"\n"}
                    {"\n"}If it’s a necessary part of any of these transactions,
                    we may disclose your information to another company. For
                    example, we pass on your name and address to a courier
                    company to complete a delivery.{"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    Use of Personal Information for Secondary Reasons
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    We also may use your personal information for other,
                    secondary reasons, including:{"\n"}
                    {"\n"}
                    {"\u2022"} To complete a sale/transaction{"\n"}
                    {"\u2022"} Marketing{"\n"}
                    {"\u2022"} Customer service{"\n"}
                    {"\u2022"} Contests/Surveys{"\n"}
                    {"\u2022"} Delivery services
                    {"\n"}
                    {"\u2022"} Returns{"\n"}
                    {"\u2022"} Orders{"\n"}
                    {"\u2022"} Complaints{"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    Sharing of Personal Information with Third Parties
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    Sometimes, we also share your personal information with
                    other companies, including:{"\n"}
                    {"\n"}
                    {"\u2022"} Partners{"\n"}
                    {"\u2022"} Third party contractors (such as a courier
                    company){"\n"}
                    {"\n"}We use Hotjar on this website to improve user
                    experience. Check out their privacy policy{" "}
                    <Text
                        style={privacyPolicyPageStyles.linkText}
                        onPress={() =>
                            Linking.openURL("https://www.hotjar.com/privacy/")
                        }
                    >
                        here.
                    </Text>
                    {"\n"}
                    {"\n"}We will also disclose your personal information if we
                    are required by law to do so.{"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    How do you get my consent?
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    When you provide us with personal information to complete a
                    transaction, verify your credit card, place an order,
                    arrange for a delivery or return a purchase, we assume you
                    consent to our collecting it and using it for that specific
                    reason only.{"\n"}
                    {"\n"}If we ask you for personal information for a secondary
                    reason, like marketing, we will ask you directly for your
                    consent.{"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    How do I get more information?
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}We are happy to answer any questions you may have
                    about your personal information. If you would like more
                    information about our policies, or you would like to see
                    exactly what personal information we have about you in our
                    records, or you wish to register a complaint, please{" "}
                    <Text
                        style={privacyPolicyPageStyles.linkText}
                        onPress={() =>
                            Linking.openURL("https://yycwax.com/contact-us/")
                        }
                    >
                        contact us
                    </Text>
                    <Text style={privacyPolicyPageStyles.bodyText}>
                        .{"\n"}
                        {"\n"}
                        You can also contact the{" "}
                    </Text>
                    <Text
                        style={privacyPolicyPageStyles.linkText}
                        onPress={() =>
                            Linking.openURL("https://www.priv.gc.ca/")
                        }
                    >
                        Privacy Commissioner of Canada
                    </Text>
                    <Text style={privacyPolicyPageStyles.bodyText}>
                        {" or the "}
                    </Text>
                    <Text
                        style={privacyPolicyPageStyles.linkText}
                        onPress={() => Linking.openURL("https://oipc.ab.ca/")}
                    >
                        Office of the Information and Privacy Commissioner of
                        Alberta
                    </Text>
                    <Text style={privacyPolicyPageStyles.bodyText}>
                        {" "}
                        for assistance.
                        {"\n"}
                        {"\n"}
                    </Text>
                </Text>
            </ScrollView>
        </View>
    );
}
