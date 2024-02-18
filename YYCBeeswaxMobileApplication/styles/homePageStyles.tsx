import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const homePageStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25,
        paddingBottom: 25,
    },
    logo: {
        width: "40%",
        height: "10%",
        alignSelf: "flex-start",
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.lightGrey,
    },
    searchBar: {
        flex: 1,
        paddingVertical: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical: 25,
    },
    categoriesContainer: {
        height: 130,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    horizontalScrollContainer: {
        height: 240,
        flexDirection: "row",
    },
    lastHorizontalScrollContainer: {
        height: 240,
        flexDirection: "row",
        marginBottom: "50%",
    },
});
