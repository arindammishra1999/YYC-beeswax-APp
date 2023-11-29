import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {mainStyles} from '@/styles/mainStyles';
import {default as Header} from '../../components/header'
import {profilePageStyles} from '@/styles/profilePageStyles';
import {router} from 'expo-router';
import useAuth from '@/firebase/hooks/useAuth';

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
                <Text>{user?.uid}</Text>
            </View>
        )
    }
}