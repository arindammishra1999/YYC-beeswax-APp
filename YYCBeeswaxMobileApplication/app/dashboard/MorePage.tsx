import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Header from "@/components/header";
import { colors } from "@/consts/styles";
import { getAllFunFacts } from "@/firebase/getCollections/getAllFunFacts";
import { shuffleArray } from "@/lib/utility";
import { mainStyles } from "@/styles/mainStyles";
import { morePageStyles } from "@/styles/morePageStyles";

export default function MorePage() {
    const { t } = useTranslation();
    const [allFunFacts, setAllFunFacts] = useState([] as any);
    const [threeFacts, setThreeFacts] = useState([] as any);

    useEffect(() => {
        getAllFunFacts().then((funFacts) => {
            if (funFacts) {
                shuffleArray(funFacts);
                setAllFunFacts(funFacts);
            } else {
                console.log("Issue getting fun facts");
            }
        });
    }, []);

    useEffect(() => {
        selectThreeFacts();
    }, [allFunFacts]);

    const selectThreeFacts = () => {
        const threeFacts = [];
        for (let i = 0; i < 3 && i < allFunFacts.length; i++) {
            threeFacts.push(allFunFacts[i].data);
        }
        setThreeFacts(threeFacts);
    };

    return (
        <View style={mainStyles.container}>
            <Header header={t("Explore")} noBackArrow />
            <ScrollView>
                <View style={morePageStyles.topContainer}>
                    <TouchableOpacity onPress={() => router.push("/quizzes/")}>
                        <View style={morePageStyles.extrasContainer}>
                            <Image
                                contentFit="cover"
                                source={require("@/assets/quizImage.jpg")}
                                style={morePageStyles.extrasImage}
                            />
                            <Text style={morePageStyles.extrasContainerText}>
                                {t("Quizzes & Trivia")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/events/EventsPage")}
                    >
                        <View style={morePageStyles.extrasContainer}>
                            <Image
                                contentFit="cover"
                                source={require("@/assets/eventImage.jpg")}
                                style={morePageStyles.extrasImage}
                            />
                            <Text style={morePageStyles.extrasContainerText}>
                                {t("Upcoming Events")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={morePageStyles.socialsContainer}>
                    <Text style={morePageStyles.socialsText}>
                        {t("Connect with us on social media!")}
                    </Text>
                    <View style={morePageStyles.socialsIconsContainer}>
                        <TouchableOpacity
                            onPress={() =>
                                WebBrowser.openBrowserAsync(
                                    "https://www.facebook.com/YYCBeeswax/",
                                )
                            }
                        >
                            <MaterialCommunityIcons
                                style={morePageStyles.socialOptionIcon}
                                color="#316FF6"
                                name="facebook"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                WebBrowser.openBrowserAsync(
                                    "https://twitter.com/yycwax",
                                )
                            }
                        >
                            <MaterialCommunityIcons
                                style={morePageStyles.socialOptionIcon}
                                color="#1DA1F2"
                                name="twitter"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                WebBrowser.openBrowserAsync(
                                    "https://www.instagram.com/yycwax/",
                                )
                            }
                        >
                            <MaterialCommunityIcons
                                style={morePageStyles.socialOptionIcon}
                                color="#962fbf"
                                name="instagram"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                WebBrowser.openBrowserAsync(
                                    "https://www.pinterest.com/yycbeeswax/",
                                )
                            }
                        >
                            <MaterialCommunityIcons
                                style={morePageStyles.socialOptionIcon}
                                color="#BD081C"
                                name="pinterest"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                WebBrowser.openBrowserAsync(
                                    "https://www.youtube.com/channel/UCimhrXjrRQf1a7dgiZtFzLw",
                                )
                            }
                        >
                            <MaterialCommunityIcons
                                style={morePageStyles.socialOptionIcon}
                                color="#FF0000"
                                name="youtube"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={morePageStyles.factsContainer}>
                    <Image
                        contentFit="contain"
                        source={require("@/assets/funFactHeader.png")}
                        style={morePageStyles.factsImage}
                    />
                    <View style={morePageStyles.threeFactsContainer}>
                        {threeFacts.map((item: any) => (
                            <View
                                key={item.fact}
                                style={morePageStyles.factContainer}
                            >
                                <MaterialCommunityIcons
                                    style={morePageStyles.factIcon}
                                    color={colors.black}
                                    name={item.icon}
                                />
                                <Text style={morePageStyles.factText}>
                                    {t(item.fact)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
