import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const adminDashboardPageStyles = StyleSheet.create({
    page: {
        backgroundColor: colors.lightGrey,
    },
    header: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 100,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "500",
        paddingBottom: 3.5,
    },
    button: {
        width: "35%",
        padding: 8,
    },
    cardContainer: {
        flex: 1,
        width: "90%",
        marginHorizontal: "5%",
        alignItems: "center",
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 15,
        marginVertical: 20,
        display: "flex",
        flexDirection: "row",
    },
    overviewSection: {
        width: "40%",
        margin: "5%",
    },
    overviewText: {
        color: colors.mediumGrey,
        fontWeight: "bold",
        fontSize: 12,
    },
    figureText: {
        fontWeight: "900",
        fontSize: 35,
    },
    change: {
        alignSelf: "flex-start",
        borderRadius: 4,
        paddingHorizontal: 5,
        backgroundColor: colors.red,
    },
    arrow: {
        fontSize: 20,
        fontWeight: "bold",
    },
    changePositive: {
        borderRadius: 4,
        flex: 1,
        width: "auto",
    },
    changeNegative: {
        width: "40%",
    },
});
