import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import RatesStyle from "./css/RatesStyle";
import INbuRate from "./orm/INbuRate";
import { useEffect, useState } from "react";
import NbuApi from "./api/NbuApi";

export default function Rates() {
    const [rates, setRates] = useState<Array<INbuRate>>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        NbuApi.getCurrentRates().then(setRates).finally(() => setLoading(false));
    }, []);

    return <View style={RatesStyle.container}>

        <View style={RatesStyle.titleBar}>
            <View style={RatesStyle.titleSearch}>
                <Image style={RatesStyle.titleSearchImg} source={require('../../features/assets/img/search.png')} />
                <TextInput style={RatesStyle.titleSearchInput} />
            </View>
            <Text style={RatesStyle.pageTitle}>Курси валют НБУ</Text>
            <View style={RatesStyle.titleDate}>
                <TouchableOpacity>
                    <Text style={RatesStyle.titleDateText}>11.02.2026</Text>
                </TouchableOpacity>
            </View>
        </View>
        

        {isLoading
        ? <Text>Завантажується...</Text>
        : <ScrollView>
            {rates.map(r => <View key={r.r030} style={RatesStyle.rateView}>
                <Text style={RatesStyle.rateText}>{`${r.txt}: 1 ${r.cc} = ${r.rate} грн`}</Text>
            </View>)}
        </ScrollView>}
        
    </View>;
}
