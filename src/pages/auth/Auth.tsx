import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthStyle from './css/AuthStyle';


export default function Auth() {
    return <View style={AuthStyle.authContainer}>

        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Логін</Text>
            <TextInput style={AuthStyle.authRowInput} />
        </View>

        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Пароль</Text>
            <TextInput style={AuthStyle.authRowInput} />
        </View>

        <TouchableOpacity style={AuthStyle.authButton}>
            <Text style={AuthStyle.authButtonText}>Вхід</Text>
        </TouchableOpacity>

    </View>;
}