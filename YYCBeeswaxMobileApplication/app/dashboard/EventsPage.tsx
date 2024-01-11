import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import EventCard from "@/components/eventCard";
import Header from "@/components/header";
import { mainStyles } from "@/styles/mainStyles";

export default function EventsPage() {
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

    return (
        <View style={mainStyles.container}>
            <Header header="Upcoming Events" />
            <ScrollView>
                {mockEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        image={event.image}
                        date={event.date}
                        name={event.name}
                        location={event.location}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
