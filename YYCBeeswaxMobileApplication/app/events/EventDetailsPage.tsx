import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { selectedEventID } from "@/components/cards/eventCard";
import Header from "@/components/header";
import { getEventDataById } from "@/firebase/getCollections/getEventById";
import { convertTimestampToDateTime } from "@/functions/TimeConversions";
import { eventDetailsPageStyles } from "@/styles/eventDetailsPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function EventDetailsPage() {
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

    return (
        <View style={mainStyles.container}>
            <Header header="Event Details" />
            <ScrollView>
                {eventImage && (
                    <Image
                        style={eventDetailsPageStyles.image}
                        source={{ uri: eventImage }}
                    />
                )}
                <Text style={eventDetailsPageStyles.title}>{eventName}</Text>
                <View style={eventDetailsPageStyles.eventInfoContainer}>
                    <View style={eventDetailsPageStyles.iconContainer}>
                        <MaterialIcons
                            name="calendar-today"
                            style={eventDetailsPageStyles.icon}
                        />
                    </View>
                    <View style={eventDetailsPageStyles.innerDetailsContainer}>
                        <Text style={eventDetailsPageStyles.infoHeaderText}>
                            {eventStartTime}
                        </Text>
                    </View>
                </View>
                <View style={eventDetailsPageStyles.eventInfoContainer}>
                    <View style={eventDetailsPageStyles.iconContainer}>
                        <MaterialIcons
                            name="location-pin"
                            style={eventDetailsPageStyles.icon}
                        />
                    </View>
                    <View style={eventDetailsPageStyles.innerDetailsContainer}>
                        <Text style={eventDetailsPageStyles.infoHeaderText}>
                            {eventPlace}
                        </Text>
                    </View>
                </View>
                <Text style={eventDetailsPageStyles.eventTextHeader}>
                    About this Event:
                </Text>
                <Text style={eventDetailsPageStyles.eventText}>
                    {eventDescription}
                </Text>
            </ScrollView>
            <View style={eventDetailsPageStyles.bottomBar}>
                <TouchableOpacity
                    style={eventDetailsPageStyles.button}
                    onPress={() => WebBrowser.openBrowserAsync(eventTicketUrl)}
                >
                    <Text style={eventDetailsPageStyles.buttonText}>
                        Buy Tickets
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
