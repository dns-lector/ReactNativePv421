import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "../../pages/home/Home";
import AppStyle from "./AppStyle";
import { Text, View } from "react-native";

export default function App() {
    return <SafeAreaProvider>
        <SafeAreaView edges={['top', 'bottom']} style={AppStyle.container}>
            
            <View style={AppStyle.appBar}>
                <Text style={AppStyle.appBarTitle}>React Native PV-421</Text>
            </View>

            <View style={AppStyle.main}>
                <Home />
            </View>

            <View style={AppStyle.navBar}>
                <Text>Home</Text>
            </View>
        
        </SafeAreaView>
    </SafeAreaProvider>;
}
