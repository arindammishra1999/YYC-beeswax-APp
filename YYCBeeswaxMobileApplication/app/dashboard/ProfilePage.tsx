import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {mainStyles} from '@/styles/mainStyles';
import {default as Header} from '../../components/header'
import {profilePageStyles} from '@/styles/profilePageStyles';
import {router} from 'expo-router';
import useAuth from '@/firebase/hooks/useAuth';
import { logoutPopupStyles } from '@/styles/components/logoutPopupStyles';

export default function ProfilePage() {
    const {user} = useAuth();
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);

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
            <View style={mainStyles.container}>
                <TouchableOpacity onPress={() => setLogoutPopupVisible(true)}>
                    <Text>Click here to open popup</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    visible={logoutPopupVisible}
                    transparent={true}
                    onRequestClose={() => {
                    setLogoutPopupVisible(!logoutPopupVisible);
                    }}>
                    <View style={logoutPopupStyles.viewContainer}>
                        <View style={logoutPopupStyles.popupView}>
                            <Text style={logoutPopupStyles.popupText}>Are you sure you want to logout?
                            This will take you back to the login screen.</Text>
                            <View style={logoutPopupStyles.buttonContainer}>
                                <TouchableOpacity
                                style={logoutPopupStyles.button}
                                onPress={() => setLogoutPopupVisible(!logoutPopupVisible)}>
                                <Text style={logoutPopupStyles.buttonTextStyle}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={logoutPopupStyles.button}
                                onPress={() => router.replace('/')}>
                                <Text style={logoutPopupStyles.buttonTextStyle}>Yes</Text>
                                </TouchableOpacity>   
                            </View>                         
                        </View>
                    </View>
                </Modal>                
            </View>
        )
    }
}