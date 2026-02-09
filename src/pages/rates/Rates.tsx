import { ScrollView, Text, View } from "react-native";
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
        <Text style={RatesStyle.pageTitle}>Курси валют НБУ</Text>
        {isLoading
        ? <Text>Завантажується...</Text>
        : <ScrollView>
            {rates.map(r => <View key={r.r030} style={RatesStyle.rateView}>
                <Text style={RatesStyle.rateText}>{`${r.txt}: 1 ${r.cc} = ${r.rate} грн`}</Text>
            </View>)}
        </ScrollView>}
        
    </View>;
}
