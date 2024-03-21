import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Alert,
    Linking,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { selectedEventID } from "@/components/cards/eventCard";
import Header from "@/components/header";
import { getEventDataById } from "@/firebase/getCollections/getEventById";
import { convertTimestampToDateTime } from "@/functions/TimeConversions";
import { eventDetailsPageStyles } from "@/styles/eventDetailsPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function EventDetailsPage() {
    const { t } = useTranslation();
    const [eventImage, setEventImage] = useState(null);
    const [eventName, setEventName] = useState(String);
    const [eventStartTime, setEventStartTime] = useState(String);
    const [eventPlace, setEventPlace] = useState(String);
    const [eventDescription, setEventDescription] = useState(String);
    const [eventTicketUrl, setEventTicketUrl] = useState(String);

    useEffect(() => {
        getEventDataById(selectedEventID).then((myEvent) => {
            if (myEvent) {
                setEventImage(myEvent.photo);
                setEventName(myEvent.name);
                const date = convertTimestampToDateTime(myEvent.time.seconds);
                setEventStartTime(date);
                setEventPlace(myEvent.place);
                setEventDescription(myEvent.description);
                setEventTicketUrl(myEvent.tickets);
            } else {
                console.log("Issue getting event");
            }
        });
    }, [selectedEventID]);

    const openInMaps = (address: string) => {
        Alert.alert(
            t("Open in Maps?"),
            t("Do you want to open this address in Maps?"),
            [
                {
                    text: t("No"),
                    onPress: () => {},
                },
                {
                    text: t("Yes"),
                    onPress: () => {
                        const url = Platform.select({
                            ios: `https://maps.apple.com/maps?q=${encodeURIComponent(
                                address,
                            )}`,
                            android: `geo:0,0?q=${encodeURIComponent(address)}`,
                        });
                        if (url) {
                            Linking.openURL(url).catch((error) => {
                                console.error(
                                    `Error opening maps URL: ${error}`,
                                );
                            });
                        } else {
                            console.log("Invalid maps URL");
                        }
                    },
                },
            ],
        );
    };

    return (
        <View style={mainStyles.container}>
            <Header header={t("Event Details")} />
            <ScrollView>
                {eventImage && (
                    <Image
                        style={eventDetailsPageStyles.image}
                        source={{ uri: eventImage }}
                    />
                )}
                <Text style={eventDetailsPageStyles.title}>{t(eventName)}</Text>
                <View style={eventDetailsPageStyles.eventInfoContainer}>
                    <View style={eventDetailsPageStyles.iconContainer}>
                        <MaterialIcons
                            name="calendar-today"
                            style={eventDetailsPageStyles.icon}
                        />
                    </View>
                    <View style={eventDetailsPageStyles.innerDetailsContainer}>
                        <Text style={eventDetailsPageStyles.infoHeaderText}>
                            {t(eventStartTime)}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => openInMaps(eventPlace)}>
                    <View style={eventDetailsPageStyles.eventInfoContainer}>
                        <View style={eventDetailsPageStyles.iconContainer}>
                            <MaterialIcons
                                name="location-pin"
                                style={eventDetailsPageStyles.icon}
                            />
                        </View>

                        <View
                            style={eventDetailsPageStyles.innerDetailsContainer}
                        >
                            <Text style={eventDetailsPageStyles.infoHeaderText}>
                                {eventPlace}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={eventDetailsPageStyles.eventTextHeader}>
                    {t("About this Event:")}
                </Text>
                <Text style={eventDetailsPageStyles.eventText}>
                    {t(eventDescription)}
                </Text>
            </ScrollView>
            <View style={eventDetailsPageStyles.bottomBar}>
                <TouchableOpacity
                    style={eventDetailsPageStyles.button}
                    onPress={() => WebBrowser.openBrowserAsync(eventTicketUrl)}
                >
                    <Text style={eventDetailsPageStyles.buttonText}>
                        {t("Buy Tickets")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
