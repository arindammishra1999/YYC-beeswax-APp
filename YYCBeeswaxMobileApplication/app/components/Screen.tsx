import React, { ReactNode } from "react";

import { SafeAreaView } from "react-native";
import { styles } from "../styles/screenStyles";

interface Props {
    children?: ReactNode;
    style?: any[];
}

export default function Screen({ children, style }: Props) {
    return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}
