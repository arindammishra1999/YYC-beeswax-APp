import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { eventCardStyles } from "@/styles/components/eventCardStyles";
import { mainStyles } from "@/styles/mainStyles";

type Props = {
    image: any;
    date: string;
    name: string;
    location: string;
};

export default function EventCard(props: Props) {
    return (
        <View style={mainStyles.container}>
            <TouchableOpacity onPress={() => {}}>
                <View style={eventCardStyles.cardContainer}>
                    <Image
                        resizeMode="contain"
                        source={props.image}
                        style={eventCardStyles.image}
                    />
                    <View style={eventCardStyles.textContainer}>
                        <Text style={eventCardStyles.dateText}>
                            {props.date}
                        </Text>
                        <Text style={eventCardStyles.nameText}>
                            {props.name}
                        </Text>
                        <View style={eventCardStyles.locationContainer}>
                            <Icon
                                name="location-pin"
                                style={eventCardStyles.icon}
                            />
                            <Text style={eventCardStyles.locationText}>
                                {props.location}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
