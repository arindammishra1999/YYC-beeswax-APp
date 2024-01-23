import { router } from "expo-router";
import { View } from "react-native";

import NavbarOption from "@/components/navbarOption";
import { colors } from "@/consts/styles";
import { navbarStyles } from "@/styles/components/navbarStyles";

type Props = {
    currentPage: string;
};

export default function Navbar(props: Props) {
    return (
        <View style={navbarStyles.container}>
            <View style={navbarStyles.optionContainer}>
                <NavbarOption
                    iconName="home"
                    onPress={() =>
                        props.currentPage !== "Home" &&
                        router.push("/dashboard/HomePage")
                    }
                    color={
                        props.currentPage === "Home"
                            ? colors.yellow
                            : colors.black
                    }
                />
                <NavbarOption
                    iconName="shopping-cart"
                    onPress={() =>
                        props.currentPage !== "Cart" &&
                        router.push("/dashboard/CartPage")
                    }
                    color={
                        props.currentPage === "Cart"
                            ? colors.yellow
                            : colors.black
                    }
                />
                <NavbarOption
                    iconName="layers"
                    onPress={() =>
                        props.currentPage !== "More" &&
                        router.push("/dashboard/MorePage")
                    }
                    color={
                        props.currentPage === "More"
                            ? colors.yellow
                            : colors.black
                    }
                />
                <NavbarOption
                    iconName="account-circle"
                    onPress={() =>
                        props.currentPage !== "Profile" &&
                        router.push("/dashboard/ProfilePage")
                    }
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
