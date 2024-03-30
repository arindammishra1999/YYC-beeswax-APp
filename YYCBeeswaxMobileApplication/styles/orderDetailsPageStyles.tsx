import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const orderDetailsPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    productCard: {
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
    billingCard: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
    },
    billingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    billingCardText: {
        fontFamily: fonts.main,
        maxWidth: "80%",
    },
    billingCardPrices: {
        fontFamily: fonts.main,
    },
    dateText: {
        marginTop: "2%",
        marginLeft: "5%",
        marginBottom: "5%",
        fontFamily: fonts.main,
        fontSize: 16,
    },
    productName: {
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
    orderDetailsText: {
        color: "grey",
        fontFamily: fonts.main,
    },
    horizontalLine: {
        marginTop: "2%",
        marginBottom: "5%",
        alignSelf: "center",
        width: "90%",
        borderBottomWidth: 1,
        borderColor: colors.lightGrey,
    },
    dottedLine: {
        marginTop: "5%",
        marginBottom: "5%",
        alignSelf: "center",
        width: "90%",
        height: 1,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: colors.lightGrey,
    },
    messageText: {
        alignSelf: "flex-start",
        textAlign: "left",
        fontSize: 21,
        marginLeft: "5%",
        marginRight: "10%",
        fontFamily: fonts.main,
    },
    orderDateText: {
        alignSelf: "flex-start",
        textAlign: "left",
        fontSize: 17,
        marginLeft: "5%",
        color: colors.mediumGrey,
        fontFamily: fonts.main,
    },
    shippingInfoTitle: {
        alignSelf: "flex-start",
        textAlign: "left",
        fontSize: 17,
        marginTop: "5%",
        marginLeft: "5%",
        color: colors.mediumGrey,
        fontFamily: fonts.main,
    },
    shippingInfoText: {
        alignSelf: "flex-start",
        textAlign: "left",
        fontSize: 17,
        marginTop: "2%",
        marginLeft: "5%",
        fontFamily: fonts.main,
    },
    shippingInfoName: {
        alignSelf: "flex-start",
        textAlign: "left",
        fontSize: 17,
        marginTop: "2%",
        marginLeft: "5%",
        marginBottom: "15%",
        fontFamily: fonts.main,
    },
    scrollViewContainer: {
        paddingBottom: 10,
    },
});
