import { StyleSheet } from "react-native";
import { colors } from "@/consts/styles";

export const homePageStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25,
    },
    logo: {
        width: "40%",
        height: "10%",
        alignSelf: "flex-start",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "lightgray",
        height: 55,
        fontSize: 14,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical: 25,
    },
    categoriesContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    horizontalScrollContainer: {
        height: 170,
        flexDirection: "row",
    },
});
