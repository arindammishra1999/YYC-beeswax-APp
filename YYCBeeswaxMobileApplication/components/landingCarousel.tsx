import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { View, Text } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { viewportWidth } from "@/consts/viewport";
import { landingCarouselStyles } from "@/styles/components/landingCarouselStyles";

export type Item = {
    text: string;
    iconName: keyof typeof MaterialIcons.glyphMap;
};

type Props = {
    items: Item[];
};

export default function LandingCarousel(props: Props) {
    const [activeSlide, setActiveSlide] = useState(0);
    const isCarousel = React.useRef(null);

    const _renderItem = ({ item }: { item: Item }) => {
        return (
            <View style={landingCarouselStyles.option}>
                <MaterialIcons name={item.iconName} size={200} />
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
                vertical={false}
                layout="stack"
                layoutCardOffset={9}
                ref={isCarousel}
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
                carouselRef={isCarousel}
                containerStyle={landingCarouselStyles.pagination}
                dotStyle={landingCarouselStyles.dotStyle}
                inactiveDotStyle={landingCarouselStyles.inactiveDotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
}
