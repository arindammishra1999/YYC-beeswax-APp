import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

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
            <FlashList
                data={allEvents}
                renderItem={({ item }: any) => (
                    <EventCard
                        key={item.id}
                        id={item.id}
                        image={item.data.photo}
                        startTime={item.data.time}
                        name={item.data.name}
                        place={item.data.place}
                    />
                )}
            />
        </View>
    );
}
