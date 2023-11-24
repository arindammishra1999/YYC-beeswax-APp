import { Platform } from "react-native";

export default {
    colors: {
        primary: "#ffc531",
        secondary: "#4ecdc4",
        black: "#000",
        white: "#fff",
        medium: "#6e6969",
        light: "#f8f4f4",
        danger: "#ff5252",
        dark: "#0c0c0c",
    },
    text: {
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        color: "#0c0c0c",
    },
};
