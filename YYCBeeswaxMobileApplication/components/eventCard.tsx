import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
                    router.push("/dashboard/EventDetailsPage");
                }}
            >
                <View style={eventCardStyles.cardContainer}>
                    <Image
                        resizeMode="contain"
                        source={{ uri: props.image }}
                        style={eventCardStyles.image}
                    />
                    <View style={eventCardStyles.textContainer}>
                        <Text style={eventCardStyles.dateText}>{date}</Text>
                        <Text style={eventCardStyles.nameText}>
                            {props.name}
                        </Text>
                        <View style={eventCardStyles.locationContainer}>
                            <Icon
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
