import React from "react";
import Svg, { Circle } from "react-native-svg";

import { colors } from "@/consts/styles";

export default function ProgressCircle({ progress }: { progress: number }) {
    return (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
                cx="50"
                cy="50"
                r="45"
                stroke={colors.yellow}
                strokeWidth="5"
                fill="transparent"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                strokeDasharray={Math.PI * 2 * 45}
                strokeDashoffset={progress * Math.PI * 2 * 45}
            />
        </Svg>
    );
}
