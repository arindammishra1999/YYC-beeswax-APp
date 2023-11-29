import {View} from 'react-native';
import HideableInput from "@/components/hideableInput";
import Button from '@/components/button'
import {accountStyles} from "@/styles/accountStyles";
import Header from "@/components/header";

export default function App() {
    return (
        <View style={accountStyles.container}>
            <Header header={'Forget Password'}/>
            <View style={{flex: 1, paddingTop: 10}}>
                <HideableInput label='Old Password' placeholder='Enter old password'/>
                <HideableInput label='New Password' placeholder='Enter new password'/>
                <HideableInput label='Confirm New Password' placeholder='Re-enter new password'/>
            </View>
            <Button title={'Confirm'}/>
        </View>
    )
}

