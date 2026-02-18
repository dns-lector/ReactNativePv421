import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "../../pages/home/Home";
import AppStyle from "./AppStyle";
import { BackHandler, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
import Calc from "../../pages/calc/Calc";
import Swipe from "../../pages/swipe/Swipe";
import IRouteInformation from "../../features/interfaces/IRouteInformation";
import AppContext from "../../features/context/AppContext";
import Anim from "../../pages/anim/Anim";
import IUser from "../../features/interfaces/IUser";
import Auth from "../../pages/auth/Auth";
import Rates from "../../pages/rates/Rates";
import '../../shared/extensions/DateExtensions';
import '../../shared/extensions/NumberExtensions';
import ModalView from "./ModalView";
import IModalData from "../../features/interfaces/modal/IModalData";
import Alerts from "../../pages/alerts/Alerts";
import Chat from "../../pages/chat/Chat";


export default function App() {
    const {width, height} = useWindowDimensions();
    const [history, setHistory] = useState<Array<IRouteInformation>>([]);
    const [page, setPage] = useState<IRouteInformation>({slug: "home"});
    const [user, setUser] = useState<IUser|null>(null);
    const [modalData, setModalData] = useState<IModalData|null>(null);

    const navigate = (route:IRouteInformation) => {
        console.log(history);
        if(route.slug != page.slug || route.parameters != page.parameters) {
            history.push(page);
            setPage(route);
            setHistory(history);
        }
    };

    const popRoute = () => {   // back
        console.log(history);
        if(history.length > 0) {
            const prevRoute = history.pop()!;
            setPage(prevRoute);
            setHistory(history);
        }
        else {
            BackHandler.exitApp();
        }
    };

    useEffect(() => {
        const listener = BackHandler.addEventListener("hardwareBackPress", () => {
            popRoute();
            return true;   // stop propagation
        });

        return () => { listener.remove(); };
    }, []);

    const showModal = (data:IModalData) => {
        setModalData(data);
    };

    return <SafeAreaProvider>
        <SafeAreaView edges={['top', 'bottom']} style={AppStyle.container}>

            {width < height &&
                <View style={AppStyle.appBar}>
                    <TouchableOpacity                         
                        onPress={() => popRoute()} >
                            <Text style={AppStyle.appBackIcon}>&lt;</Text>
                    </TouchableOpacity>
                    <Text style={AppStyle.appBarTitle}>React Native PV-421</Text>
                    <View />
                </View>
            }            

            <AppContext.Provider value={{navigate, user, setUser, showModal,}}>
                <View style={AppStyle.main}>
                    { user == null || page.slug == 'auth' ? <Auth />
                    : page.slug == 'alerts' ? <Alerts />
                    : page.slug == 'anim'   ? <Anim   />
                    : page.slug == 'calc'   ? <Calc   />
                    : page.slug == 'chat'   ? <Chat   />
                    : page.slug == 'home'   ? <Home   />
                    : page.slug == 'rates'  ? <Rates  />
                    : page.slug == 'swipe'  ? <Swipe  />
                    : <Text>404</Text>
                    }                
                </View>
            </AppContext.Provider>

            {width < height &&
                <View style={AppStyle.navBar}>
                    <TouchableOpacity 
                        style={{width: 48, height: 48}}
                        onPress={() => navigate({slug: "home"})}>
                        <Image 
                            source={require("../../features/assets/img/home.png")}
                            style={{width: 24, height: 28, tintColor: "#ddd", marginTop: 16}} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{width: 48, height: 48}}
                        onPress={() => navigate({slug: "calc"})}>
                        <Image 
                            source={require("../../features/assets/img/calc.png")}
                            style={{width: 28, height: 28, tintColor: "#ddd", marginTop: 16}} />
                    </TouchableOpacity>

                     <TouchableOpacity 
                        style={{width: 48, height: 48}}
                        onPress={() => navigate({slug: "chat"})}>
                        <Image 
                            source={require("../../features/assets/img/chat.png")}
                            style={{width: 28, height: 28, tintColor: "#ddd", marginTop: 16}} />
                    </TouchableOpacity>

                     <TouchableOpacity 
                        style={{width: 48, height: 48}}
                        onPress={() => navigate({slug: "rates"})}>
                        <Image 
                            source={require("../../features/assets/img/rate.png")}
                            style={{width: 28, height: 28, tintColor: "#ddd", marginTop: 16}} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{width: 48, height: 48}}
                        onPress={() => navigate({slug: "auth"})}>
                        <Image 
                            source={require("../../features/assets/img/auth.png")}
                            style={{width: 28, height: 28, tintColor: "#ddd", marginTop: 16}} />
                    </TouchableOpacity>
                </View>
            }

            <ModalView modalData={modalData} setModalData={setModalData} />

        </SafeAreaView>
    </SafeAreaProvider>;
}
