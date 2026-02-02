import { Image, Text, TouchableOpacity, View } from "react-native";
import HomeStyle from "./css/HomeStyle";
import { useContext } from "react";
import AppContext from "../../features/context/AppContext";

export default function Home() {
    const {navigate} = useContext(AppContext);

    return <View style={HomeStyle.homeContainer}>
        <TouchableOpacity 
            onPress={() => navigate({slug:"calc"})} 
            style={HomeStyle.menuItem}>

            <Image 
                source={require("../../features/assets/img/calc.png")} 
                style={HomeStyle.homeImage} />

            <Text style={HomeStyle.homeLabel}>Калькулятор</Text>

        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => navigate({slug:"swipe"})} 
            style={HomeStyle.menuItem}>

            <Image 
                source={require("../../features/assets/img/swipe.png")} 
                style={HomeStyle.homeImage} />

            <Text style={HomeStyle.homeLabel}>Жести: свайпи</Text>

        </TouchableOpacity>

    </View>;
}