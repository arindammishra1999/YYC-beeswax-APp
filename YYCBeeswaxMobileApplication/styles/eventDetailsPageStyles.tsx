import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportHeight } from "@/consts/viewport";

export const eventDetailsPageStyles = StyleSheet.create({
    image: {
        width: "100%",
        height: viewportHeight / 3,
    },
    title: {
        fontSize: 34,
        width: "90%",
        paddingVertical: 10,
        alignSelf: "center",
        marginTop: 10,
    },
    eventInfoContainer: {
        flexDirection: "row",
        alignSelf: "center",
        width: "90%",
        marginVertical: 10,
        height: 60,
    },
    iconContainer: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        height: "80%",
        width: "14%",
        borderRadius: 10,
        backgroundColor: colors.lightGrey,
    },
    icon: {
        fontSize: 34,
        alignSelf: "center",
        color: colors.yellow,
    },
    innerDetailsContainer: {
        height: "80%",
        width: "80%",
        alignSelf: "center",
        justifyContent: "space-between",
        marginLeft: 15,
        flexWrap: "wrap",
    },
    infoHeaderText: {
        fontSize: 18,
        flexShrink: 1,
        width: "100%",
    },
    infoSubheaderText: {
        flexShrink: 1,
        width: "100%",
    },
    eventTextHeader: {
        marginLeft: 20,
        fontSize: 20,
        marginTop: 10,
    },
    eventText: {
        marginHorizontal: 20,
        marginTop: 15,
        fontSize: 16,
        marginBottom: 25,
    },
    bottomBar: {
        backgroundColor: colors.white,
        height: "8%",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    button: {
        backgroundColor: colors.yellow,
        alignSelf: "center",
        width: "65%",
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        position: "absolute",
        bottom: "5%",
    },
    buttonText: {
        fontSize: 21,
        fontWeight: "bold",
        alignSelf: "center",
    },
});
