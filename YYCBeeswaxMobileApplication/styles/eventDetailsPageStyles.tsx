import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportHeight, viewportWidth } from "@/consts/viewport";

export const eventDetailsPageStyles = StyleSheet.create({
    image: {
        width: "100%",
        height: viewportHeight / 2.5,
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
        marginVertical: 5,
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
        marginLeft: 15,
        flexWrap: "wrap",
        justifyContent: "center",
    },
    infoHeaderText: {
        fontSize: 15,
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
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: viewportHeight / 10,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "rgba(0, 0, 0, .2)",
        borderStyle: "solid",
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: viewportWidth / 2,
        marginLeft: "25%",
        marginRight: "25%",
    },
    buttonText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: "bold",
    },
});
