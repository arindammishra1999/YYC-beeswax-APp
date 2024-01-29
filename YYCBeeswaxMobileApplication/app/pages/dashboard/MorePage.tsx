import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

import Header from "@/components/header";
import MoreOption from "@/components/moreOptions";
import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";

export default function MorePage() {
    return (
        <View style={mainStyles.container}>
            <Header header="More" noBackArrow />
            <MoreOption
                label="Events"
                iconName="calendar"
                onPress={() => router.push("/pages/events/EventsPage")}
            />
            <MoreOption
                label="Quizzes"
                iconName="comment-question"
                onPress={() => router.push("/pages/quizzes/")}
            />
            <Navbar currentPage="More" />
        </View>
    );
}
