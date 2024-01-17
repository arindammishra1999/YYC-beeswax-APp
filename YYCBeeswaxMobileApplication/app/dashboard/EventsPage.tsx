import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import EventCard from "@/components/eventCard";
import Header from "@/components/header";
import { mainStyles } from "@/styles/mainStyles";

export default function EventsPage() {
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

    return (
        <View style={mainStyles.container}>
            <Header header="Upcoming Events" />
            <ScrollView>
                {mockEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        image={event.coverImage}
                        startTime={event.startTime}
                        name={event.name}
                        place={event.place}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
