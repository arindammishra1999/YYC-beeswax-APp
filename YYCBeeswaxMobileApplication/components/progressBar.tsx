import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/consts/styles";

export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.progress,
                    {
                        width: `${progress}%`,
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 10,
        backgroundColor: "lightgray",
        borderRadius: 99,
        overflow: "hidden",
    },
    progress: {
        backgroundColor: colors.yellow,
        height: "100%",
    },
});
