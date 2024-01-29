import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import EventCard from "@/components/cards/eventCard";
import Header from "@/components/header";
import { getEventData } from "@/firebase/getCollections/getEvents";
import { mainStyles } from "@/styles/mainStyles";

export default function EventsPage() {
    const [allEvents, setAllEvents] = useState([] as any);

    useEffect(() => {
        getEventData().then((events) => {
            if (events) {
                events.sort(
                    (one, two) => one.data.time.seconds - two.data.time.seconds,
                );
                setAllEvents(events);
            } else {
                console.log("Issue getting events");
            }
        });
    }, []);

    return (
        <View style={mainStyles.container}>
            <Header header="Upcoming Events" />
            <ScrollView>
                {allEvents.map((event: any) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        image={event.data.photo}
                        startTime={event.data.time}
                        name={event.data.name}
                        place={event.data.place}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
