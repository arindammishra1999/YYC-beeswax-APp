import { StyleSheet } from "react-native";

export const orderHistoryPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    orderCard: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "white",
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
        color: "blue",
        fontSize: 15,
    },
    orderDetailsDelivered: {
        color: "grey",
        fontSize: 15,
    },
});
