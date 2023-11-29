import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, SafeAreaView } from "react-native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { accountStyles } from "../styles/accountStyles";
import SubmitButton from "../components/submitButton";
import EmailInput from "../components/emailInput";
import { PROFILE_ROUTE } from '../consts/constants';
import { useState } from "react";
import PasswordInput from "../components/passwordInput";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function Login(navigation: any ) {
        try{
            // await signInWithEmailAndPassword(auth, email, password);
            await signOut(auth);
            navigation.navigate(PROFILE_ROUTE);
        } catch (err: any){
            if (err?.code === "auth/invalid-email") {
                setError('Login Failed - Enter a valid email.');
            } else if (err?.code === "auth/missing-password") {
                setError('Login Failed - Must input a password.');
            } else if (err?.code === "auth/invalid-login-credentials") {
                setError('Login Failed - Username or password did not match.');
            }
        };
    }

    return (
        <SafeAreaView style={accountStyles.container}>
            <Text style={accountStyles.header}>Log In</Text>
            <EmailInput emailInput={setEmail}/>
            <PasswordInput passwordInput={setPassword}/>
            {error && <Text style={accountStyles.error}>{error}</Text>}
            <SubmitButton title="Log In" handleClick={Login} />
        </SafeAreaView>
    );
}
