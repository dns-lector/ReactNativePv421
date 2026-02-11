import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import RatesStyle from "./css/RatesStyle";
import INbuRate from "./orm/INbuRate";
import { useEffect, useState } from "react";
import NbuApi from "./api/NbuApi";
import DatePicker from "react-native-date-picker";

export default function Rates() {
    const [rates, setRates] = useState<Array<INbuRate>>([]);
    const [shownRates, setShownRates] = useState<Array<INbuRate>>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date())
    const [isOpen, setOpen] = useState<boolean>(false);

    useEffect(() => {
        NbuApi.getCurrentRates().then(setRates).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if(filter.length == 0) {
            setShownRates([...rates]);
        }
        else {
            setShownRates(rates.filter(r => 
                r.cc.includes(filter.toUpperCase()) ||
                r.txt.toLowerCase().includes(filter.toLowerCase())
            ));
        }
        // TODO: взяти дату з будь-якого rates (якщо масив не порожній), переформатувати, задати в стан
    }, [filter, rates]);

    useEffect(() => {
        if(rates.length > 0) { 
            setLoading(true);
            NbuApi.getRatesForDate(date).then(setRates).finally(() => setLoading(false));
        }
    }, [date]);

    const showDatePicker = () => {
        setOpen(true);
    };

    return <View style={RatesStyle.container}>

        <View style={RatesStyle.titleBar}>
            <View style={RatesStyle.titleSearch}>
                <Image style={RatesStyle.titleSearchImg} source={require('../../features/assets/img/search.png')} />
                <TextInput value={filter} onChangeText={setFilter} style={RatesStyle.titleSearchInput} />
            </View>
            <View style={RatesStyle.pageTitle}>
                <Text style={RatesStyle.pageTitleText}>Курси валют НБУ</Text>
            </View>
            
            <View style={RatesStyle.titleDate}>
                <TouchableOpacity onPress={showDatePicker}>
                    <Text style={RatesStyle.titleDateText}>{date.toDotted()}</Text>
                </TouchableOpacity>
            </View>
        </View>
        

        {isLoading
        ? <Text>Завантажується...</Text>
        : <ScrollView>
            {shownRates.map(r => <View key={r.r030} style={RatesStyle.rateView}>
                <Text style={RatesStyle.rateText}>{`${r.txt}: 1 ${r.cc} = ${r.rate} грн`}</Text>
            </View>)}
        </ScrollView>}

        <DatePicker
            modal
            open={isOpen}
            date={date}
            mode="date"
            onConfirm={(date) => {
                setOpen(false);
                setDate(date);
            }}
            onCancel={() => {
                setOpen(false);
            }}
        />
    </View>;
}
/*
Д.З. При оновленні даних про курси валют взяти дату з будь-якого rates 
(якщо масив не порожній), переформатувати, задати в стан для відображення. 
Перенести коди формування дати для запиту (yyyymmdd) до прототипу Date,
в АРІ використати прототипний метод.
*/