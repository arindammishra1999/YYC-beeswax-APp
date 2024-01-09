import { View } from "react-native";
import NavbarOption from "./navbarOption";
import { router } from "expo-router";
import { navbarStyles } from "@/styles/components/navbarStyles";
import { colors } from "@/consts/styles";

type Props = {
    currentPage: string;
};

export default function Navbar(props: Props) {
    return (
        <View style={navbarStyles.container}>
            <View style={navbarStyles.optionContainer}>
                <NavbarOption
                    iconName="home"
                    onPress={() => router.push("/dashboard/HomePage")}
                    color={
                        props.currentPage === "Home"
                            ? colors.yellow
                            : colors.black
                    }
                />
                <NavbarOption
                    iconName="shopping-cart"
                    onPress={() => router.push("/dashboard/CartPage")}
                    color={
                        props.currentPage === "Cart"
                            ? colors.yellow
                            : colors.black
                    }
                />
                <NavbarOption
                    iconName="layers"
                    onPress={() => router.push("/dashboard/MorePage")}
                    color={
                        props.currentPage === "More"
                            ? colors.yellow
                            : colors.black
                    }
                />
                <NavbarOption
                    iconName="account-circle"
                    onPress={() => router.push("/dashboard/ProfilePage")}
                    color={
                        props.currentPage === "Profile"
                            ? colors.yellow
                            : colors.black
                    }
                />
            </View>
        </View>
    );
}
