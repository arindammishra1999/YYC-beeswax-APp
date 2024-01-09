import React, { useState } from "react";
import { View, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { viewportWidth } from "@/consts/viewport";
import Icon from "react-native-vector-icons/MaterialIcons";
import { landingCarouselStyles } from "@/styles/components/landingCarouselStyles";

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
            <View style={landingCarouselStyles.option}>
                <Icon name={item.iconName} size={200} />
                <Text style={landingCarouselStyles.caption}>{item.text}</Text>
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
                autoplay
                autoplayInterval={3000}
                loop
            />
            <Pagination
                dotsLength={props.items.length}
                activeDotIndex={activeSlide}
                containerStyle={landingCarouselStyles.pagination}
                dotStyle={landingCarouselStyles.dotStyle}
                inactiveDotStyle={landingCarouselStyles.inactiveDotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
}
