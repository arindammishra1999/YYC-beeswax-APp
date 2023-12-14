import { Fontisto } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import {
    Keyboard,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import { auth } from "@/firebase/config";
import { forgotPageStyles } from "@/styles/forgotPageStyles";
import { router } from "expo-router";
import { loginPopupStyles } from "@/styles/components/loginPopupStyles";

export default function App() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loginPopupVisible, setLoginPopupVisible] = useState(false);

    async function confirm() {
        try {
            await sendPasswordResetEmail(auth, email);
            setLoginPopupVisible(true);
        } catch (err: any) {
            if (err?.code == "auth/missing-email") {
                setError("Password Reset Failed - Enter your email.");
            } else if (err?.code == "auth/invalid-email") {
                setError("Password Reset Failed - Enter a valid email.");
            } else {
                setError("Password Reset Failed");
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={forgotPageStyles.container}>
                <Header header="Forgot Password" />
                <View style={forgotPageStyles.form}>
                    <Fontisto
                        name="locked"
                        size={80}
                        color="black"
                        style={forgotPageStyles.logo}
                    />
                    <Text style={forgotPageStyles.text}>
                        Please enter your email address to receive a link to
                        reset your password. You will then be prompted to login.
                    </Text>
                    <Input
                        label="Email"
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize={false}
                    />
                    {error && (
                        <Text style={forgotPageStyles.error}>{error}</Text>
                    )}
                </View>
                <Button title="Confirm" onPress={confirm} />
                <Modal
                    animationType="slide"
                    visible={loginPopupVisible}
                    transparent={true}
                    onRequestClose={() => {
                        setLoginPopupVisible(!loginPopupVisible);
                    }}
                >
                    <View style={loginPopupStyles.viewContainer}>
                        <View style={loginPopupStyles.popupView}>
                            <Text style={loginPopupStyles.popupText}>
                                An email has been sent to the associated account
                                with a link to reset your password.
                            </Text>
                            <View style={loginPopupStyles.buttonContainer}>
                                <TouchableOpacity
                                    style={loginPopupStyles.button}
                                    onPress={() => router.push("./login")}
                                >
                                    <Text
                                        style={loginPopupStyles.buttonTextStyle}
                                    >
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
}
