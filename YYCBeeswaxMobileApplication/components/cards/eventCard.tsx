import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import Skeleton from "@/components/skeleton";
import {
    convertTimestampToDateTime,
    secondsToDate,
} from "@/functions/TimeConversions";
import { eventCardStyles } from "@/styles/components/eventCardStyles";
import { mainStyles } from "@/styles/mainStyles";

type Props = {
    id: any;
    image: any;
    startTime: Timestamp;
    name: string;
    place: string;
};

export let selectedEventID: number;

export default function EventCard(props: Props) {
    const { t } = useTranslation();
    const date = convertTimestampToDateTime(props.startTime.seconds);
    const eventDate = secondsToDate(props.startTime.seconds);
    const today = new Date();

    if (eventDate < today) {
        return;
    }

    return (
        <View style={mainStyles.container}>
            <TouchableOpacity
                onPress={() => {
                    selectedEventID = props.id;
                    router.push("/events/EventDetailsPage");
                }}
            >
                <View style={eventCardStyles.cardContainer}>
                    <Image
                        contentFit="cover"
                        source={{ uri: props.image }}
                        style={eventCardStyles.image}
                    />
                    <View style={eventCardStyles.textContainer}>
                        <Text style={eventCardStyles.dateText}>{t(date)}</Text>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={eventCardStyles.nameText}
                        >
                            {t(props.name)}
                        </Text>
                        <View style={eventCardStyles.locationContainer}>
                            <MaterialIcons
                                name="location-pin"
                                style={eventCardStyles.icon}
                            />
                            <Text style={eventCardStyles.locationText}>
                                {props.place}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export function LoadingEventCard() {
    return (
        <View style={mainStyles.container}>
            <View style={eventCardStyles.cardContainer}>
                <Skeleton style={eventCardStyles.image} />
                <View style={eventCardStyles.textContainer}>
                    <Skeleton height={24} />
                    <Skeleton
                        height={16}
                        width="80%"
                        style={eventCardStyles.description}
                    />
                    <View style={eventCardStyles.locationContainer}>
                        <Skeleton height={20} width="40%" />
                    </View>
                </View>
            </View>
        </View>
    );
}
