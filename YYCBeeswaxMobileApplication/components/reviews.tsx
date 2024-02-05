import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useReviewsByProductId } from "@/firebase/hooks/useReviewsByProductId";
import { FlashList } from "@shopify/flash-list";

type Props = {
    id: string;
};

export default function Reviews(props: Props) {
    const { reviews, getMoreReviews } = useReviewsByProductId(props.id);

    return (
        <View>
            <FlashList
                data={reviews}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={{height:100}}>
                            <Text>{item.title}</Text>
                        </View>
                    );
                }}
                onEndReached={getMoreReviews}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
