import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { selectedEventID } from "@/components/eventCard";
import Header from "@/components/header";
import { eventDetailsPageStyles } from "@/styles/eventDetailsPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function EventDetailsPage() {
    const [eventImage, setEventImage] = useState(null);
    const [eventName, setEventName] = useState(String);
    const [eventStartTime, setEventStartTime] = useState(String);
    const [eventPlace, setEventPlace] = useState(String);
    const [eventDescription, setEventDescription] = useState(String);
    const [eventTicketUrl, setEventTicketUrl] = useState(String);

    const [mockEvents] = useState([
        {
            id: 1,
            coverImage: require("../../assets/tempImages/chakra.jpg"),
            name: "Lip Balm Making Workshop",
            startTime: "Wed, Apr 28 - 5:30 PM",
            endTime: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            place: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
            ticketUrl: "https://yycwax.com/",
        },
        {
            id: 2,
            coverImage: require("../../assets/tempImages/chakra.jpg"),
            name: "Another Event",
            startTime: "Wed, Apr 28 - 8:30 PM",
            endTime: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            place: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
            ticketUrl: "https://yycwax.com/",
        },
        {
            id: 3,
            coverImage: require("../../assets/tempImages/chakra.jpg"),
            name: "New Year Wellness Workshop",
            startTime: "Wed, Apr 28 - 10:30 PM",
            endTime: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            place: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
            ticketUrl: "https://yycwax.com/",
        },
        {
            id: 4,
            coverImage: require("../../assets/tempImages/chakra.jpg"),
            name: "Beeswax Luminary Workshop",
            startTime: "Wed, Apr 28 - 5:30 AM",
            endTime: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            place: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
            ticketUrl: "https://yycwax.com/",
        },
        {
            id: 5,
            coverImage: require("../../assets/tempImages/chakra.jpg"),
            name: "Massage Candle Making Workshop",
            startTime: "Wed, Apr 28 - 1:30 PM",
            endTime: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            place: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
            ticketUrl: "https://yycwax.com/",
        },
        {
            id: 6,
            coverImage: require("../../assets/tempImages/chakra.jpg"),
            name: "Random Event 6",
            startTime: "Wed, Apr 28 - 12:30 PM",
            endTime: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            place: "3130 114 Avenue SE, Calgary, T2Z 3V6, CA",
            ticketUrl: "https://yycwax.com/",
        },
    ]);

    useEffect(() => {
        const selectedEvent = mockEvents.find(
            (event) => event.id === selectedEventID,
        );

        if (selectedEvent) {
            setEventImage(selectedEvent.coverImage);
            setEventName(selectedEvent.name);
            setEventStartTime(selectedEvent.startTime);
            setEventPlace(selectedEvent.place);
            setEventDescription(selectedEvent.description);
            setEventTicketUrl(selectedEvent.ticketUrl);
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
                <Text style={eventDetailsPageStyles.title}>{eventName}</Text>
                <View style={eventDetailsPageStyles.eventInfoContainer}>
                    <View style={eventDetailsPageStyles.iconContainer}>
                        <Icon
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
                        <Icon
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
                    onPress={() => Linking.openURL(eventTicketUrl)}
                >
                    <Text style={eventDetailsPageStyles.buttonText}>
                        Buy Tickets
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
