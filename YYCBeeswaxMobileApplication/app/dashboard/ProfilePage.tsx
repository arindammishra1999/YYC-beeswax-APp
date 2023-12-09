import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {mainStyles} from '@/styles/mainStyles';
import {profilePageStyles} from '@/styles/profilePageStyles';
import {Ionicons} from "@expo/vector-icons";
import {router} from 'expo-router';
import useAuth from '@/firebase/hooks/useAuth';
import Header from '@/components/header';
import ProfileOption from '@/components/profileOption';

export default function ProfilePage() {
    const {user} = useAuth();

    if (!user) {
        return (
            <View style={mainStyles.container}>
                <Header header='Your Profile'/>
                <Text style={profilePageStyles.messageText}>
                    You are currently browsing as a guest! Login or 
                    create an account to view your profile and save your settings.
                </Text>
                <TouchableOpacity style={profilePageStyles.button} onPress={() => router.replace('/auth/login')}>
                    <Text style={profilePageStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={profilePageStyles.signUpContainer}>
                    <Text style={profilePageStyles.signUpText}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={profilePageStyles.signUpLink} onPress={() => router.replace('/auth/signup')}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    else {
        return (
            <View>
                <Header header="Your Profile"/>
                <Ionicons 
                    name="person-outline" 
                    style={profilePageStyles.largeIcon}
                />
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption onPress={() => router.push('/auth/login')} label="Order History" iconName='history'/>
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption onPress={() => router.push('/auth/login')} label="Edit Profile" iconName='edit'/>
                    <ProfileOption onPress={() => router.push('/auth/login')} label="Notifications" iconName='notifications'/>
                    <ProfileOption onPress={() => router.push('/auth/login')} label="Language" iconName='language'/>
                </View>
                <View style={profilePageStyles.optionContainer} >
                    <ProfileOption onPress={() => router.push('/auth/login')} label="Help & Support" iconName='help-outline'/>
                    <ProfileOption onPress={() => router.push('/auth/login')} label="Contact Us" iconName='message'/>
                    <ProfileOption onPress={() => router.push('/auth/login')} label="Privacy Policy" iconName='lock-outline'/>
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption onPress={() => router.push('/auth/login')} label="Logout" iconName='logout'/>
                </View>
            </View>
        )
    }
}