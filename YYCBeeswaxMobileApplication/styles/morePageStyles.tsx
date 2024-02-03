import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportHeight, viewportWidth } from "@/consts/viewport";

export const morePageStyles = StyleSheet.create({
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: viewportHeight / 5,
        marginVertical: 20,
    },
    extrasContainer: {
        alignItems: "center",
        marginHorizontal: 15,
        width: viewportWidth / 2.4,
        height: "100%",
        borderRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
    },

    extrasImage: {
        height: "65%",
        width: "80%",
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 10,
        marginTop: 15,
    },

    extrasContainerText: {
        fontSize: 16,
    },

    socialsContainer: {
        height: viewportHeight / 7,
        marginHorizontal: 15,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
        alignItems: "center",
    },

    socialsText: {
        fontSize: 18,
        marginVertical: 15,
    },

    socialsIconsContainer: {
        flexDirection: "row",
    },

    socialOptionIcon: {
        fontSize: 45,
        marginHorizontal: 15,
    },

    factsContainer: {
        marginTop: 20,
        height: viewportHeight / 2.8,
        marginHorizontal: 15,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
        alignItems: "center",
        justifyContent: "flex-start",
    },

    factsImage: {
        width: "85%",
        height: "30%",
        marginVertical: 10,
    },

    threeFactsContainer: {
        height: "65%",
    },

    factContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginBottom: 10,
    },

    factIcon: {
        fontSize: 30,
        marginRight: 10,
    },

    factText: {
        fontSize: 13,
        flexShrink: 1,
        flexWrap: "wrap",
    },
});
