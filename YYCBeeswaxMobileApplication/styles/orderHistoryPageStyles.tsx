import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const orderHistoryPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    orderCard: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 15,
        marginRight: 10,
    },
    detailsContainer: {
        marginLeft: 5,
        justifyContent: "center",
        flexShrink: 1,
    },
    orderName: {
        marginRight: 20,
        marginBottom: 7,
        fontSize: 17,
        fontFamily: fonts.main,
    },
    orderDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    orderDetailsShipped: {
        color: colors.blue,
        fontSize: 15,
        fontFamily: fonts.main,
    },
    orderDetailsDelivered: {
        color: colors.grey,
        fontSize: 15,
        fontFamily: fonts.main,
    },
    orderDetailsCancelled: {
        color: colors.red,
        fontSize: 15,
        fontFamily: fonts.main,
    },
    orderDetailsPlaced: {
        color: colors.darkGrey,
        fontSize: 15,
        fontFamily: fonts.main,
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: "15%",
        marginLeft: "25%",
        marginRight: "25%",
    },
    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.mainBold,
    },
    messageText: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 21,
        marginTop: "40%",
        marginLeft: "10%",
        marginRight: "10%",
        fontFamily: fonts.mainBold,
    },
    gif: {
        alignSelf: "center",
        marginTop: 10,
        height: 240,
        width: 320,
    },
});
