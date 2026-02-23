import IHomePage from "../orm/IHomePage";

export default class BookingApi {
    static homePage() {
        return new Promise<IHomePage>( (resolve, reject) => {
            setTimeout(   // замінимо на fetch коли буде бекенд
                () => resolve({
                    locale: "en",
                    locations: [
                        {
                            id: "hotel1",
                            name: "Hotel Name",
                            city: "City",
                            country: "Country",
                            imgHref: "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232",
                            cityCenterDistance: 100,
                            ratingStars: 4.5,
                            priceDaily: 130,
                            isFavorite: false,
                        }
                    ],
                    reviews: [
                        {
                            id:  "",
                            userAvatarHref: "",
                            userName: "",
                            hotelName: "",
                            dateTime: "",
                            text: ""
                        }
                    ]
                }),
                700
            )
        });
    }
}