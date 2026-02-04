import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import HomeStyle from "./css/HomeStyle";
import { useContext } from "react";
import AppContext from "../../features/context/AppContext";

export default function Home() {

    return <View style={HomeStyle.homeContainer}>        
        <MenuItem title="Калькулятор"   slug="calc"   imgSrc={require("../../features/assets/img/calc.png" )} />
        <MenuItem title="Жести: свайпи" slug="swipe"  imgSrc={require("../../features/assets/img/swipe.png")} />
        <MenuItem title="Анімації"      slug="anim"   imgSrc={require("../../features/assets/img/anim.png" )} />
    </View>;
}

function MenuItem({title, imgSrc, slug}:{title:string, imgSrc:ImageSourcePropType, slug:string}) {
    const {navigate} = useContext(AppContext);

    return <TouchableOpacity 
        onPress={() => navigate({slug})} 
        style={HomeStyle.menuItem}>

        <Image 
            source={imgSrc} 
            style={HomeStyle.homeImage} />

        <Text style={HomeStyle.homeLabel}>{title}</Text>

    </TouchableOpacity>;
}