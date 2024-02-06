import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";

type Props = {
    circle?: boolean;
    width?: ViewStyle["width"];
    height?: ViewStyle["height"];
    style?: StyleProp<ViewStyle>;
};

function Skeleton(props: Props) {
    const [layoutWidth, setLayoutWidth] = useState(1000);
    const [translation] = useState(new Animated.Value(0));

    const interpolated = translation.interpolate({
        inputRange: [0, 1],
        outputRange: [-layoutWidth * 2, layoutWidth * 2],
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(translation, {
                toValue: 1,
                // delay: 400,
                duration: 1500,
                useNativeDriver: true,
            }),
        ).start();
    }, []);

    return (
        <View
            onLayout={({ nativeEvent }) => {
                setLayoutWidth(nativeEvent.layout.width);
            }}
            style={[
                {
                    width: props.width ?? "100%",
                    height: props.height ?? 12,
                    backgroundColor: "#c0c0c0",
                    overflow: "hidden",
                    borderRadius: 4,
                },
                props.circle && {
                    borderRadius: 50,
                    height: props.height ?? props.width,
                },
                props.style,
            ]}
        >
            <Animated.View
                style={{
                    // backgroundColor: "black",
                    height: "100%",
                    transform: [
                        {
                            translateX: interpolated,
                        },
                    ],
                }}
            >
                <LinearGradient
                    colors={["transparent", "#e5e5e5", "transparent"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={{ width: "100%", height: "100%" }}
                />
            </Animated.View>
        </View>
    );
}

export default Skeleton;
