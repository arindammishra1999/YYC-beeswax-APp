import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { viewportWidth } from "@/consts/viewport";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "@/consts/styles";

type item = {
    text: string;
    iconName: string;
};

type Props = {
    items: item[];
};

export default function LandingCarousel(props: Props) {
    const [activeSlide, setActiveSlide] = useState(0);

    const _renderItem = ({ item, index }: { item: item; index: number }) => {
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 300,
                    backgroundColor: colors.white,
                }}
            >
                <Icon name={item.iconName} size={200} />
                <Text>{item.text}</Text>
            </View>
        );
    };

    const onSnapToItem = (index: number) => {
        setActiveSlide(index);
    };

    return (
        <View>
            <Carousel
                layout="stack"
                layoutCardOffset={9}
                data={props.items}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                renderItem={_renderItem}
                onSnapToItem={onSnapToItem}
            />

            <Pagination
                dotsLength={props.items.length}
                activeDotIndex={activeSlide}
                containerStyle={{ paddingTop: 5 }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: colors.yellow,
                }}
                inactiveDotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: colors.lightGrey,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
}
