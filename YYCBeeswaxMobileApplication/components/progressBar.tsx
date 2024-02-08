import React from "react";
import { View } from "react-native";

import { progressBarStyles } from "@/styles/components/progressBarStyles";

export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <View style={progressBarStyles.container}>
            <View
                style={[
                    progressBarStyles.progress,
                    {
                        width: `${progress}%`,
                    },
                ]}
            />
        </View>
    );
}
