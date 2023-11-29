import React, {useState} from "react";
import {Text, View} from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/config";
import {accountStyles} from "@/styles/accountStyles";
import Button from "@/components/button";
import {useLoginWithGoogle} from "@/firebase/loginWithGoogle";
import Header from "@/components/header";
import Input from "@/components/input";
import HideableInput from "@/components/hideableInput";
import {Link, router} from "expo-router";
import {Divider} from "@rneui/themed";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {handleLoginGoogle} = useLoginWithGoogle()

    async function login() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('./home')
        } catch (err: any) {
            if (err?.code === "auth/invalid-email") {
                setError('Login Failed - Enter a valid email.');
            } else if (err?.code === "auth/missing-password") {
                setError('Login Failed - Must input a password.');
            } else if (err?.code === "auth/invalid-login-credentials") {
                setError('Login Failed - Username or password did not match.');
            }
        }
    }

    return (
        <View style={accountStyles.container}>
            <Header header={'Login'}/>
            <View style={{flex: 1, paddingTop: 10}}>
                <Input label={'Email'} placeholder='Enter Email' value={email} onChangeText={setEmail}/>
                <HideableInput label={'Password'} placeholder='Enter Email' value={email} onChangeText={setEmail}/>
                <Link href='/auth/forgotPassword' asChild>
                    <Text style={{paddingLeft: 10}}>Forgot password?</Text>
                </Link>
                {error && <Text style={accountStyles.error}>{error}</Text>}
            </View>
            <Button title="Log In" onPress={login}/>
            <Divider style={{paddingTop: 10, marginBottom: 10}}/>
            <Button title='Login in with google' onPress={handleLoginGoogle}/>
        </View>
    );
}
