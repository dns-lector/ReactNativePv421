import { useEffect, useState } from "react";
import IHomePage from "./orm/IHomePage";
import BookingApi from "./api/BookingApi";
import { Image, Text, View } from "react-native";

export default function Booking() {
    const [pageData, setPageData] = useState<IHomePage>({locale: "en", locations: [], reviews: []});

    useEffect(() => {
        BookingApi.homePage().then(setPageData);
    }, []);

    return <>
        {pageData.locations.map(loc => <View key={loc.id}>
            <Image style={{width:100, height:100}} source={{ uri: loc.imgHref }} />

            <Text>{loc.name}</Text>
            <Text>{loc.city}</Text>
            <Text>{loc.country}</Text>
            <Text>{loc.cityCenterDistance}</Text>
        </View>)}
    </>;
}