import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "../../pages/home/Home";
import AppStyle from "./AppStyle";
import { BackHandler, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Calc from "../../pages/calc/Calc";

// /product?id=100500
interface IRouteInformation {
    slug: string,          // product
    parameters?: object     // { "id": 100500 }
};

export default function App() {
    const [history, setHistory] = useState<Array<IRouteInformation>>([]);
    const [page, setPage] = useState<IRouteInformation>({slug: "home"});

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

    return <SafeAreaProvider>
        <SafeAreaView edges={['top', 'bottom']} style={AppStyle.container}>
            
            <View style={AppStyle.appBar}>
                <Text style={AppStyle.appBarTitle}>React Native PV-421</Text>
            </View>

            <View style={AppStyle.main}>
                { page.slug == 'home' ? <Home />
                : page.slug == 'calc' ? <Calc />
                : <Text>404</Text>
                }                
            </View>

            <View style={AppStyle.navBar}>
                <Pressable onPress={() => navigate({slug: "home"})}>
                    <Text>Home</Text>
                </Pressable>

                <Pressable onPress={() => navigate({slug: "calc"})}>
                    <Text>Calc</Text>
                </Pressable>
            </View>
        
        </SafeAreaView>
    </SafeAreaProvider>;
}
