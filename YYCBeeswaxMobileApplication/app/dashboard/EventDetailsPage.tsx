import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { selectedEventID } from "@/components/eventCard";
import Header from "@/components/header";
import { eventDetailsPageStyles } from "@/styles/eventDetailsPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function EventDetailsPage() {
    const [eventImage, setEventImage] = useState(null);
    const [eventTitle, setEventTitle] = useState(String);
    const [eventDate, setEventDate] = useState(String);
    const [eventTime, setEventTime] = useState(String);
    const [eventLocation, setEventLocation] = useState(String);
    const [eventAddress, setEventAddress] = useState(String);
    const [eventText, setEventText] = useState(String);

    const [mockEvents] = useState([
        {
            id: 1,
            image: require("../../assets/tempImages/chakra.jpg"),
            date: "Wed, Apr 28 - 5:30 PM",
            name: "Lip Balm Making Workshop",
            location: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
        },
        {
            id: 2,
            image: require("../../assets/tempImages/chakra.jpg"),
            date: "Wed, Apr 28 - 5:30 PM",
            name: "Event #2",
            location: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
        },
        {
            id: 3,
            image: require("../../assets/tempImages/chakra.jpg"),
            date: "Wed, Apr 28 - 5:30 PM",
            name: "Event #3",
            location: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
        },
        {
            id: 4,
            image: require("../../assets/tempImages/chakra.jpg"),
            date: "Wed, Apr 28 - 5:30 PM",
            name: "Event #4",
            location: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
        },
        {
            id: 5,
            image: require("../../assets/tempImages/chakra.jpg"),
            date: "Wed, Apr 28 - 5:30 PM",
            name: "Event #5",
            location: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
        },
        {
            id: 6,
            image: require("../../assets/tempImages/chakra.jpg"),
            date: "Wed, Apr 28 - 5:30 PM",
            name: "Event #6",
            location: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
        },
    ]);

    useEffect(() => {
        const selectedEvent = mockEvents.find(
            (event) => event.id === selectedEventID,
        );

        if (selectedEvent) {
            setEventImage(selectedEvent.image);
            setEventTitle(selectedEvent.name);
            setEventDate(selectedEvent.date);
            setEventTime(selectedEvent.date);
            setEventLocation(selectedEvent.location);
            setEventAddress(selectedEvent.location);
            setEventText("Sample text");
        } else {
            console.log(`Event with id ${selectedEventID} not found.`);
        }
    }, [selectedEventID]);

    return (
        <View style={mainStyles.container}>
            <Header header="Event Details" />
            <ScrollView>
                {eventImage && (
                    <Image
                        style={eventDetailsPageStyles.image}
                        source={eventImage}
                    />
                )}
                <Text style={eventDetailsPageStyles.title}>{eventTitle}</Text>
                <View style={eventDetailsPageStyles.eventInfoContainer}>
                    <View style={eventDetailsPageStyles.iconContainer}>
                        <Icon
                            name="calendar-today"
                            style={eventDetailsPageStyles.icon}
                        />
                    </View>
                    <View style={eventDetailsPageStyles.innerDetailsContainer}>
                        <Text style={eventDetailsPageStyles.infoHeaderText}>
                            {eventDate}
                        </Text>
                        <Text style={eventDetailsPageStyles.infoSubheaderText}>
                            {eventDate}
                        </Text>
                    </View>
                </View>
                <View style={eventDetailsPageStyles.eventInfoContainer}>
                    <View style={eventDetailsPageStyles.iconContainer}>
                        <Icon
                            name="location-pin"
                            style={eventDetailsPageStyles.icon}
                        />
                    </View>
                    <View style={eventDetailsPageStyles.innerDetailsContainer}>
                        <Text style={eventDetailsPageStyles.infoHeaderText}>
                            {eventLocation}
                        </Text>
                        <Text style={eventDetailsPageStyles.infoSubheaderText}>
                            {eventLocation}
                        </Text>
                    </View>
                </View>
                <Text style={eventDetailsPageStyles.eventTextHeader}>
                    About this Event:
                </Text>
                <Text style={eventDetailsPageStyles.eventText}>
                    {eventText}
                </Text>
            </ScrollView>
            <View style={eventDetailsPageStyles.bottomBar}>
                <TouchableOpacity style={eventDetailsPageStyles.button}>
                    <Text style={eventDetailsPageStyles.buttonText}>
                        Buy Tickets
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
