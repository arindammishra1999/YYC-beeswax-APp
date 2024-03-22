import * as WebBrowser from "expo-web-browser";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

import Header from "@/components/header";
import { mainStyles } from "@/styles/mainStyles";
import { privacyPolicyPageStyles } from "@/styles/privacyPolicyPageStyles";

export default function PrivacyPolicyPage() {
    const { t } = useTranslation();
    return (
        <View style={mainStyles.container}>
            <Header header={t("Privacy Policy")} />
            <ScrollView style={privacyPolicyPageStyles.textContainer}>
                <Text style={privacyPolicyPageStyles.headerText}>
                    {t("Privacy Policy")}
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    {t(
                        "We collect personal information from our customers in the regular course of doing business. This page lets you know exactly how we’re protecting the information you entrust to us.",
                    )}
                    {"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    {t("What personal information do you collect about me?")}{" "}
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    {t("We collect the following information about you:")}{" "}
                    {"\n"}
                    {"\n"}
                    {"\u2022"} {t("Name")}
                    {"\n"}
                    {"\u2022"} {t("Address")}
                    {"\n"}
                    {"\u2022"} {t("Postal Code")}
                    {"\n"}
                    {"\u2022"} {t("Phone Number")}
                    {"\n"}
                    {"\u2022"} {t("Email Address")}
                    {"\n"}
                    {"\u2022"} {t("Purchase history")}
                    {"\n"}
                    {"\u2022"} {t("Customer satisfaction info")}
                    {"\n"}
                    {"\u2022"} {t("Opinions about products and services")}
                    {"\n"}
                    {"\n"}
                    {t("When you visit our web site, we also collect:")}
                    {"\n"}
                    {"\n"}
                    {"\u2022"}{" "}
                    {t(
                        "information about your computer, including your IP address, the type of operating system and browser you use, and your computer’s location",
                    )}
                    {"\n"}
                    {"\u2022"}{" "}
                    {t(
                        "what pages you visit on our site and what links you click on",
                    )}
                    {"\n"}
                    {"\u2022"} {t("what other sites you’ve visited recently")}(
                    {t("basically, how you got to our website!")}){"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    {t("How do you use this information?:")}
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    {t(
                        "The main reasons we collect personal information from you are:",
                    )}
                    {"\n"}
                    {"\n"}
                    {"\u2022"} {t("Complaints")}
                    {"\n"}
                    {"\u2022"} {t("Contests/Surveys")}
                    {"\n"}
                    {"\u2022"} {t("Customer relationship management")}
                    {"\n"}
                    {"\u2022"} {t("Customer service")}
                    {"\n"}
                    {"\u2022"} {t("Delivery services")}
                    {"\n"}
                    {"\u2022"} {t("Marketing")}
                    {"\n"}
                    {"\u2022"} {t("Orders")}
                    {"\n"}
                    {"\u2022"} {t("Returns")}
                    {"\n"}
                    {"\u2022"} {t("To complete a sale/transaction")}
                    {"\n"}
                    {"\n"}
                    {t(
                        "If it’s a necessary part of any of these transactions, we may disclose your information to another company. For example, we pass on your name and address to a courier company to complete a delivery.",
                    )}
                    {"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    {t("Use of Personal Information for Secondary Reasons")}
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    {t(
                        "We also may use your personal information for other, secondary reasons, including:",
                    )}
                    {"\n"}
                    {"\n"}
                    {"\u2022"} {t("To complete a sale/transaction")}
                    {"\n"}
                    {"\u2022"} {t("Marketing")}
                    {"\n"}
                    {"\u2022"} {t("Customer service")}
                    {"\n"}
                    {"\u2022"} {t("Contests/Surveys")}
                    {"\n"}
                    {"\u2022"} {t("Delivery services")}
                    {"\n"}
                    {"\u2022"} {t("Returns")}
                    {"\n"}
                    {"\u2022"} {t("Orders")}
                    {"\n"}
                    {"\u2022"} {t("Complaints")}
                    {"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    {t("Sharing of Personal Information with Third Parties")}
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    {t(
                        "Sometimes, we also share your personal information with other companies, including:",
                    )}
                    {"\n"}
                    {"\n"}
                    {"\u2022"} {t("Partners")}
                    {"\n"}
                    {"\u2022"}{" "}
                    {t("Third party contractors (such as a courier company)")}
                    {"\n"}
                    {"\n"}
                    {t(
                        "We use Hotjar on this website to improve user experience. Check out their privacy policy",
                    )}{" "}
                    <Text
                        style={privacyPolicyPageStyles.linkText}
                        onPress={() =>
                            WebBrowser.openBrowserAsync(
                                "https://www.hotjar.com/privacy/",
                            )
                        }
                    >
                        {t("here")}.
                    </Text>
                    {"\n"}
                    {"\n"}
                    {t(
                        "We will also disclose your personal information if we are required by law to do so.",
                    )}
                    {"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    {t("How do you get my consent?")}
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    {t(
                        "When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we assume you consent to our collecting it and using it for that specific reason only.",
                    )}
                    {"\n"}
                    {"\n"}
                    {t(
                        "If we ask you for personal information for a secondary reason, like marketing, we will ask you directly for your consent.",
                    )}
                    {"\n"}
                    {"\n"}
                </Text>
                <Text style={privacyPolicyPageStyles.headerText}>
                    {t("How do I get more information?")}
                </Text>
                <Text style={privacyPolicyPageStyles.bodyText}>
                    {"\n"}
                    {t(
                        "We are happy to answer any questions you may have about your personal information. If you would like more information about our policies, or you would like to see exactly what personal information we have about you in our records, or you wish to register a complaint, please",
                    )}{" "}
                    <Text
                        style={privacyPolicyPageStyles.linkText}
                        onPress={() =>
                            WebBrowser.openBrowserAsync(
                                "https://yycwax.com/contact-us/",
                            )
                        }
                    >
                        {t("contact us")}
                    </Text>
                    <Text style={privacyPolicyPageStyles.bodyText}>
                        .{"\n"}
                        {"\n"}
                        {t("You can also contact the")}{" "}
                    </Text>
                    <Text
                        style={privacyPolicyPageStyles.linkText}
                        onPress={() =>
                            WebBrowser.openBrowserAsync(
                                "https://www.priv.gc.ca/",
                            )
                        }
                    >
                        {t("Privacy Commissioner of Canada")}
                    </Text>
                    <Text style={privacyPolicyPageStyles.bodyText}>
                        {t("or the")}
                    </Text>
                    <Text
                        style={privacyPolicyPageStyles.linkText}
                        onPress={() =>
                            WebBrowser.openBrowserAsync("https://oipc.ab.ca/")
                        }
                    >
                        {t(
                            "Office of the Information and Privacy Commissioner of Alberta",
                        )}
                    </Text>
                    <Text style={privacyPolicyPageStyles.bodyText}>
                        {" "}
                        {t("for assistance.")}
                        {"\n"}
                        {"\n"}
                    </Text>
                </Text>
            </ScrollView>
        </View>
    );
}
