import { StyleSheet } from "react-native";
import { colors } from "@/consts/styles";

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
        flexShrink: 1
    },
    orderName: {
        marginRight: 20,
        marginBottom: 7,
        fontSize: 17,
    },
    orderDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    orderDetailsShipped: {
        color: colors.blue,
        fontSize: 15,
    },
    orderDetailsDelivered: {
        color: colors.grey,
        fontSize: 15,
    },
    orderDetailsCancelled: {
        color: colors.red,
        fontSize: 15,
    },
    orderDetailsPlaced: {
        color: colors.darkGrey,
        fontSize: 15,
    },
});
