import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { View, Text } from "react-native";

import Header from "@/components/header";
import MoreOption from "@/components/moreOptions";
import { mainStyles } from "@/styles/mainStyles";

export default function MorePage() {
    return (
        <View style={mainStyles.container}>
            <Header header="More" noBackArrow />
            <MoreOption
                label="Events"
                iconName="calendar"
                onPress={() => router.push("/events/EventsPage")}
            />
            <MoreOption
                label="Quizzes"
                iconName="comment-question"
                onPress={() => router.push("/quizzes/")}
            />
            <MoreOption
                label="Facebook"
                iconName="facebook"
                onPress={() =>
                    WebBrowser.openBrowserAsync(
                        "https://www.facebook.com/YYCBeeswax/",
                    )
                }
            />
            <MoreOption
                label="Twitter"
                iconName="twitter"
                onPress={() =>
                    WebBrowser.openBrowserAsync("https://twitter.com/yycwax")
                }
            />
            <MoreOption
                label="Instagram"
                iconName="instagram"
                onPress={() =>
                    WebBrowser.openBrowserAsync(
                        "https://www.instagram.com/yycwax/",
                    )
                }
            />
            <MoreOption
                label="Pinterest"
                iconName="pinterest"
                onPress={() =>
                    WebBrowser.openBrowserAsync(
                        "https://www.pinterest.ca/yycbeeswax/",
                    )
                }
            />
            <MoreOption
                label="Youtube"
                iconName="youtube"
                onPress={() =>
                    WebBrowser.openBrowserAsync(
                        "https://www.youtube.com/channel/UCimhrXjrRQf1a7dgiZtFzLw",
                    )
                }
            />
            <Navbar currentPage="More" />
        </View>
    );
}
