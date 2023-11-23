import {StyleSheet, View} from 'react-native';
import {Input} from "@rneui/themed";
import {Button, Header} from "@rneui/base";
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {useState} from "react";

export default function App() {
    const [hide, setHide] = useState({
        old: true,
        new: true,
        confirm: true
    })

    return (
        <View style={styles.container}>
            <Header backgroundColor='white'
                    leftComponent={<Ionicons name='arrow-back' size={32} style={{marginLeft: 10}}/>}
                    centerComponent={{text: 'Change Password', style:{fontSize:22, fontWeight:'bold' }}}/>
            <Input label='Old Password' placeholder="Old Password"
                   rightIcon={<FontAwesome name={'eye-slash'} size={20}
                                           onPress={() => setHide(prev => ({...prev, old: !prev.old}))}/>}
                   secureTextEntry={hide.old}
            />
            <Input label='New Password' placeholder="New Password"
                   rightIcon={<FontAwesome name={'eye-slash'} size={20}
                                           onPress={() => setHide(prev => ({...prev, new: !prev.new}))}/>}
                   secureTextEntry={hide.new}/>
            <Input label='Confirm New Password' placeholder="Confirm New Password"
                   rightIcon={<FontAwesome name={'eye-slash'} size={20}
                                           onPress={() => setHide(prev => ({...prev, confirm: !prev.confirm}))}/>}
                   secureTextEntry={hide.confirm}/>
            <Button
                title="Basic Button"
                buttonStyle={{
                    backgroundColor: 'rgba(78, 116, 289, 1)',
                    borderRadius: 3,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
});
